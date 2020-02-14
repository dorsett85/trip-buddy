import { Pool, QueryConfig, QueryResult } from 'pg';
import { ComparisonOperator, LogicalOperator, prefixTableName } from './dbHelpers';
import { KeyValue } from '../types';

interface Clauses {
  insert?: string;
  select?: string;
  update?: string;
  delete?: string;
  where?: string[];
  returning?: string;
}

export default class QueryBuilder<T = any> {
  // Make it thenable to return an async QueryResult
  public readonly then: (
    onfulfilled?: (value: QueryResult<T>) => QueryResult<T>
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
  private values: (string | number)[] = [];

  constructor(pool: Pool, table: string) {
    this.then = <T = any>(resolve: any): Promise<QueryResult<T>> => {
      return this.run().then(resolve);
    };
    this.table = table;
    this.pool = pool;
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
    this.clauses.delete = `DELETE FROM ${this.table}`;
    return this;
  }

  public where(
    items: KeyValue<string | number>,
    logicalOperator: LogicalOperator = 'AND',
    comparisonOperator: ComparisonOperator = '='
  ): this {
    // Set the initial where array in the clauses map.  We'll keep adding
    // to this with items and additional where methods (e.g., orWhere, andWhere)
    this.clauses.where = this.clauses.where || [];
    let text = '';
    Object.entries(items).forEach(([key, value], idx, arr) => {
      text += `${key} ${comparisonOperator} $${this.paramVal}`;
      text += arr.length > 1 && idx !== arr.length - 1 ? ` ${logicalOperator} ` : '';
      this.paramVal += 1;
      this.values.push(value);
    });

    this.clauses.where.push(text);
    return this;
  }

  public whereRaw(text: string, values: (string | number)[]): this {
    this.clauses.where = this.clauses.where || [];
    const paramText = text.replace()

    return this;
  }

  public returning(columns: string[] = []): this {
    const columnsWithTableName = prefixTableName(this.table, columns);
    const columnText = columns.length ? columnsWithTableName.join(', ') : '*';
    this.clauses.returning = `RETURNING ${columnText}`;
    return this;
  }
  
  public static replaceArrayParams(text: string, values: (string | number)[]): string {
    let newText;
    let reg = /
    values.forEach((value) => {
      newText = 
    })
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
    return this.clauses.where ? `WHERE ${this.clauses.where.join(' ')}` : '';
  }

  public toQueryText(): string {
    const { clauses } = this;
    let sqlQuery = '';

    // Check for truthy CRUD properties in the clauses object and add clause text accordingly
    if (clauses.insert) {
      sqlQuery += clauses.insert;
    } else if (clauses.select) {
      sqlQuery += `${clauses.select}\n${this.fromString()}`;
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

  public run() {
    return this.pool.query(this.toQueryText(), this.values);
  }
}

export const QB = (pool: Pool) => <T = any>(table: string) => {
  return new QueryBuilder<T>(pool, table);
};
