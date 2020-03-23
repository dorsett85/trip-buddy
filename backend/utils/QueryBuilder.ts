import { Pool, QueryResult } from 'pg';
import { prefixTableName } from './dbHelpers';
import {
  ParamQuery,
  RecordValueArray,
  WhereArgGroup,
  WhereArgs
} from '../types/dbQueryUtils';
import { KeyValue } from '../types';

const isParamQuery = (obj: ParamQuery | WhereArgGroup): obj is ParamQuery =>
  Object.keys(obj).some(key => key !== 'items' && key === 'text');

interface Clauses {
  insert?: string;
  select?: string;
  update?: string;
  delete?: string;
  join?: string;
  where?: string[];
  returning?: string;
}

export default class QueryBuilder<T = any> {
  // Make it thenable to return an async QueryResult
  public readonly then: (
    onfulfilled?: (value: QueryResult<T>) => any,
    onrejected?: (reason: any) => any
  ) => Promise<QueryResult<T>>;

  /**
   * DB table that the QB instance will use for FROM/UPDATE/DELETE/etc.
   * statements on.
   */
  private readonly table: string;

  /**
   * Connection pool to PG library
   */
  private readonly pool: Pool;

  /**
   * Obj of SQL clauses that will be converted to a SQL query
   */
  private clauses: Clauses = {};

  /**
   * Parameterized query running value.  Every time a parameterized
   * value is used in a statement, this number should increase by one,
   * which would allow a text string to look something like:
   *
   * 'INSERT INTO users (id, username) VALUES ($1, $2)'
   *
   * The parameterized numbers correspond to a value in the values property
   * that the pg library will inject into the query.  For instance, the
   * '$1' and '$2' would be replaced with '1' and 'clayton'.
   */
  private paramVal = 1;

  /**
   * Array of values that correspond to parameterized values in a query.
   * if a query is 'INSERT INTO users (id, username) VALUES($1, $2)' and this
   * values array is [1, 'clayton'], then the final sql query will be:
   *
   * "INSERT INTO users (id, username) VALUES(1, 'clayton')"
   */
  private values: RecordValueArray = [];

  /**
   * String that represents a SQL query
   */
  private rawText = '';

  constructor(pool: Pool, table: string) {
    this.then = (resolve: any, reject: any): Promise<QueryResult<T>> => {
      return this.run()
        .then(resolve)
        .catch(reject);
    };
    this.table = table;
    this.pool = pool;
  }

  /**
   * Getter for the rawQuery property
   */
  public get rawQuery(): string {
    return this.rawText;
  }

  /**
   * Getter for the clauses property
   */
  public get clausesMap(): Readonly<Clauses> {
    return this.clauses;
  }

  /**
   * Get the current paramVal and values properties in a single object
   */
  public get parameterizedValues() {
    return {
      paramVal: this.paramVal,
      values: this.values
    };
  }

  public insert(insertObj: KeyValue | KeyValue[]): this {
    let columnText = '';
    let columnTextInserted = false;
    let valuesText = '';

    // Loop through the insertArg entries to build the query and update variables
    const processInsertObj = (insertItem: typeof insertObj) =>
      Object.entries(insertItem).forEach(([key, value], idx, arr) => {
        const addOpenParan = idx === 0 ? '(' : '';
        const addCloseParan = idx === arr.length - 1 ? ')' : '';
        const addCommaAndSpace = idx === arr.length - 1 ? '' : ', ';

        if (!columnTextInserted) {
          columnText += `${addOpenParan}${key}${addCommaAndSpace}${addCloseParan}`;
        }
        valuesText += `${addOpenParan}$${this.paramVal}${addCommaAndSpace}${addCloseParan}`;
        this.paramVal += 1;
        this.values.push(value);
      });

    if (Array.isArray(insertObj)) {
      insertObj.forEach((item, idx, arr) => {
        processInsertObj(item);
        // After the first item has been processed we already have the insert column text
        columnTextInserted = true;

        // If there's more than one item to insert we also have to separate the value text
        valuesText = idx === arr.length - 1 ? valuesText : `${valuesText}, `;
      });
    } else {
      processInsertObj(insertObj);
    }

    this.clauses.insert = `INSERT INTO ${this.table} ${columnText}\nVALUES ${valuesText}`;
    return this;
  }

  public select(columns: string[] = []): this {
    const columnsWithTableName = prefixTableName(this.table, columns);
    const columnText = columns.length
      ? columnsWithTableName.join(', ')
      : `${this.table}.*`;

    this.clauses.select = `SELECT ${columnText}\n${this.fromString()}`;
    return this;
  }

  /**
   * Add UPDATE clause with optional from argument.  If defined, the using arg
   * will add a FROM clause below the UPDATE clause with the text from the
   * from argument.
   *
   * The from argument is helpful when we need to add where statements from
   * another table.
   */
  public update(items: KeyValue, from?: string): this {
    let updateText = `UPDATE ${this.table}\nSET `;
    Object.entries(items).forEach(([key, value], idx, arr) => {
      const addCommaAndSpace = idx === arr.length - 1 ? '' : ', ';
      updateText += `${key} = $${this.paramVal}${addCommaAndSpace}`;
      this.paramVal += 1;
      this.values.push(value);
    });

    // Final check if there if an update join from clause
    if (from) {
      updateText += `\nFROM ${from}`;
    }

    this.clauses.update = updateText;
    return this;
  }

  /**
   * Add DELETE clause with optional using arg.  If defined, the using arg
   * will add a USING clause below the DELETE clause with the text from the
   * using argument.
   *
   * The using argument is helpful when we need to add where statements from
   * another table.
   */
  public delete(using?: string): this {
    this.clauses.delete = `DELETE\n${this.fromString()}${
      using ? `\nUSING ${using}` : ''
    }`;
    return this;
  }

  public where(text: string, values?: RecordValueArray): this;

  // eslint-disable-next-line no-dupe-class-members
  public where(whereArgs?: WhereArgs): this;

  // eslint-disable-next-line no-dupe-class-members
  public where(args?: string | WhereArgs, values?: RecordValueArray): this {
    // Check all empty cases so we don't add a where clause without any items
    if (!args) {
      return this;
    }
    // Set the initial where array in the clauses map.  We'll keep adding
    // to this with items and additional where methods (e.g., orWhere, andWhere)
    this.clauses.where = this.clauses.where || ['WHERE'];

    if (typeof args === 'string') {
      if (!values) {
        this.clauses.where.push(args);
      } else {
        const replacedText = this.updateTextParamsAndValues(args, values);
        this.clauses.where.push(replacedText);
      }
    } else {
      // Function to add to where clause array and update the paramVal and values properties
      const processWhereArgs = (whereArgs: WhereArgGroup<T> | ParamQuery) => {
        // Early check and exit if the whereArgs is a ParamQuery
        if (isParamQuery(whereArgs)) {
          if (!whereArgs.values) {
            this.clauses.where!.push(whereArgs.text);
          } else {
            const replacedText = this.updateTextParamsAndValues(
              whereArgs.text,
              whereArgs.values
            );
            this.clauses.where!.push(replacedText);
          }
          return;
        }

        // Otherwise process as a WhereArgGroup
        const { items, wrap, prefixOperator, logicalOperator } = whereArgs;

        let text = '';
        Object.entries(items).forEach(([key, value], idx, arr) => {
          const comparisonOperator = Array.isArray(value) ? value[0] : '=';
          const itemValue = Array.isArray(value) ? value[1] : value;
          const column =
            whereArgs.prefixTableName === false
              ? key
              : prefixTableName(whereArgs.prefixTableName || this.table, key);
          text += `${column} ${comparisonOperator} $${this.paramVal}`;
          text +=
            arr.length > 1 && idx !== arr.length - 1
              ? ` ${logicalOperator || 'AND'} `
              : '';

          this.paramVal += 1;
          this.values.push(itemValue);
        });

        // Last check to wrap the text in parentheses and add a prefix operator
        text = wrap ? `(${text})` : text;
        if (this.clauses.where![1]) {
          text = `${prefixOperator || 'AND'} ${text}`;
        }

        this.clauses.where!.push(text);
      };

      // Finally, run the processing function on the WhereArgs based on its type
      if (Array.isArray(args)) {
        args.forEach(processWhereArgs);
      } else {
        processWhereArgs(args);
      }
    }

    return this;
  }

  public returning(columns: string[] = []): this {
    const columnsWithTableName = prefixTableName(this.table, columns);
    const columnText = columns.length ? columnsWithTableName.join(', ') : '*';
    this.clauses.returning = `RETURNING ${columnText}`;
    return this;
  }

  public raw(text: string, values?: RecordValueArray): this {
    this.rawText = !values ? text : this.updateTextParamsAndValues(text, values);
    return this;
  }

  public joinRaw(text?: string, values?: RecordValueArray): this {
    if (!text) {
      return this;
    }
    this.clauses.join = !values ? text : this.updateTextParamsAndValues(text, values);
    return this;
  }

  private updateTextParamsAndValues(text: string, values: RecordValueArray): string {
    const { replacedText, replacements } = this.replaceTextParams(text);
    QueryBuilder.checkParamValuesEquality(text, replacements, values);
    this.values.push(...values);
    return replacedText;
  }

  private replaceTextParams(
    text: string
  ): { replacedText: string; replacements: number } {
    let replacements = 0;
    const replacedText = text.replace(/\?|\\\?/g, match => {
      // Replace escaped param (e.g., '\?') with an actual '?' character
      if (match !== '?') {
        return '?';
      }

      // Otherwise replace the param with its value replacement
      const param = `$${this.paramVal}`;
      this.paramVal += 1;
      replacements += 1;
      return param;
    });
    return {
      replacedText,
      replacements
    };
  }

  /**
   * Check that the number of params to replace matches the length of the values array
   * (contains the replacement values).
   */
  private static checkParamValuesEquality(
    text: string,
    params: number,
    values: RecordValueArray
  ) {
    if (params !== values.length) {
      throw Error(`
        Expected ${params} parameters, got ${values.length} [${values}].
        Query: ${text}
      `);
    }
  }

  /**
   * Create from clause string
   */
  private fromString(): string {
    return `FROM ${this.table}`;
  }

  /**
   * Create where clause string
   */
  private whereString(): string {
    return this.clauses.where ? this.clauses.where.join(' ') : '';
  }

  public toQueryText(): string {
    // Initial check for raw query
    if (this.rawText) {
      return this.rawText;
    }

    const { clauses } = this;
    let sqlQuery = '';

    // Check for truthy CRUD properties in the clauses object and add clause text accordingly
    if (clauses.insert) {
      sqlQuery += clauses.insert;
    } else if (clauses.select) {
      sqlQuery += clauses.select;
      if (clauses.join) {
        sqlQuery += `\n  ${clauses.join}`;
      }
    } else if (clauses.update) {
      sqlQuery += clauses.update;
    } else if (clauses.delete) {
      sqlQuery += clauses.delete;
    }

    // Next up, add the where clause to the text
    if (clauses.where) {
      sqlQuery += `\n${this.whereString()}`;
    }

    // Last, for certain sql commands we'll want a RETURNING clause (e.g., for update clauses)
    if (clauses.insert || clauses.update || clauses.delete) {
      sqlQuery += clauses.returning
        ? `\n${clauses.returning}`
        : clauses.insert
        ? 'RETURNING *'
        : '';
    }
    return `${sqlQuery};`;
  }

  public run(): Promise<QueryResult<T>> {
    return this.pool.query(this.toQueryText(), this.values);
  }
}

/**
 * QB is a curried function that will accept a pool argument that will return a QueryBuilder
 * instantiation function.  This instantiation function will return a new QueryBuilder object.
 *
 * Alternatively you can call the raw property which is the same as calling the raw method on
 * a new QueryBuilder object with a blank "table" argument.
 */
export const connectQueryBuilder = (pool: Pool) => {
  const fn = <T = any>(table: string) => {
    return new QueryBuilder<T>(pool, table);
  };

  // Add the QueryBuilder raw method as an option for writing raw sql statements
  fn.raw = <T = any>(text: string, values?: RecordValueArray) =>
    fn<T>('').raw(text, values);
  return fn;
};

export type GenerateQueryBuilder = ReturnType<typeof connectQueryBuilder>;
