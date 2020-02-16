import { Pool, QueryResult } from 'pg';
import { LngLatArray } from 'common/lib/types/utils';
import { ComparisonOperator, LogicalOperator, prefixTableName } from './dbHelpers';
import { KeyValue } from '../types';

type WhereArgValue = string | number | boolean | LngLatArray;

type WhereArgValueArray = WhereArgValue[];

type WhereArgComparisonValue = [ComparisonOperator, WhereArgValue];

export interface WhereArgGroup<T = any> {
  items: {
    [K in keyof T]: WhereArgValue | WhereArgComparisonValue;
  };
  wrap?: boolean;
  prefixTableName?: string | false;
  prefixOperator?: LogicalOperator;
  logicalOperator?: LogicalOperator;
}

export type WhereArgs<T = any> = WhereArgGroup<T> | WhereArgGroup<T>[];

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
    onfulfilled?: (value: QueryResult<T>) => QueryResult<T>,
    onrejected?: (reason: any) => Promise<any>
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
  private values: WhereArgValue[] = [];

  /**
   * String that represents a SQL query
   */
  private rawText = '';

  constructor(pool: Pool, table: string) {
    this.then = (resolve: any, reject: any): Promise<QueryResult<T>> => {
      return this.run().then(resolve).catch(reject);
    };
    // this.catch = (reject: any): Promise<any> => Promise.reject(reject);
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

  public insert(items: KeyValue<string | number>): this {
    let insertText = `INSERT INTO ${this.table} `;
    let valuesText = 'VALUES ';

    // Loop through the insertArg entries to build the query and update variables
    Object.entries(items).forEach(([key, value], idx, arr) => {
      const addOpenParan = idx === 0 ? '(' : '';
      const addCloseParan = idx === arr.length - 1 ? ')' : '';
      const addCommaAndSpace = idx === arr.length - 1 ? '' : ', ';
      insertText += `${addOpenParan}${key}${addCommaAndSpace}${addCloseParan}`;
      valuesText += `${addOpenParan}$${this.paramVal}${addCommaAndSpace}${addCloseParan}`;
      this.paramVal += 1;
      this.values.push(value);
    });

    this.clauses.insert = `${insertText}\n${valuesText}`;
    return this;
  }

  public select(columns: string[] = []): this {
    const columnsWithTableName = prefixTableName(this.table, columns);
    const columnText = columns.length
      ? columnsWithTableName.join(', ')
      : `${this.table}.*`;

    this.clauses.select = `SELECT ${columnText}`;
    return this;
  }

  public update(items: KeyValue<string | number>): this {
    let updateText = `UPDATE ${this.table} SET `;
    Object.entries(items).forEach(([key, value], idx, arr) => {
      const addCommaAndSpace = idx === arr.length - 1 ? '' : ', ';
      updateText += `${key} = $${this.paramVal}${addCommaAndSpace}`;
      this.paramVal += 1;
      this.values.push(value);
    });

    this.clauses.update = updateText;
    return this;
  }

  public delete(): this {
    this.clauses.delete = `DELETE`;
    return this;
  }

  public where(text: string, values?: WhereArgValueArray): this;

  // eslint-disable-next-line no-dupe-class-members
  public where(whereArgs: WhereArgs): this;

  // eslint-disable-next-line no-dupe-class-members
  public where(args: string | WhereArgs, values?: WhereArgValueArray): this {
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
      // Function to add to where class array and update the paramVal and values properties
      const processWhereArgs = (whereArgs: WhereArgGroup) => {
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

  public raw(text: string, values?: WhereArgValueArray): this {
    this.rawText = !values ? text : this.updateTextParamsAndValues(text, values);
    return this;
  }

  public joinRaw(text: string, values?: WhereArgValueArray): this {
    this.clauses.join = !values ? text : this.updateTextParamsAndValues(text, values);
    return this;
  }

  private updateTextParamsAndValues(text: string, values: WhereArgValueArray): string {
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
    values: WhereArgValueArray
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
      sqlQuery += `${clauses.select}\n${this.fromString()}`;
      if (clauses.join) {
        sqlQuery += `\n  ${clauses.join}`;
      }
    } else if (clauses.update) {
      sqlQuery += clauses.update;
    } else if (clauses.delete) {
      sqlQuery += `${clauses.delete}\n${this.fromString()}`;
    }

    // Next up, add the where clause to the text
    if (clauses.where) {
      sqlQuery += `\n${this.whereString()}`;
    }

    // Last, for certain sql commands we'll want return rows (e.g., for update clauses)
    if (clauses.insert || clauses.update || clauses.delete) {
      sqlQuery += `\n${clauses.returning || 'RETURNING *'}`;
    }
    return `${sqlQuery};`;
  }

  public run(): Promise<QueryResult<T>> {
    return this.pool.query(this.toQueryText(), this.values);
  }
}

export const QB = (pool: Pool) => <T = any>(table: string) => {
  return new QueryBuilder<T>(pool, table);
};
