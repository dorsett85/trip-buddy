import { Pool, QueryResult } from 'pg';
import { ComparisonOperator, LogicalOperator, prefixTableName } from './dbHelpers';
import { KeyValue } from '../types';

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
   * Map of SQL clauses that will be converted to a SQL query
   */
  private clauses = new Map<string, any>();

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

  public get clausesMap(): Map<string, any> {
    return this.clauses;
  }

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

    const text = `
      ${insertText}
      ${valuesText}
    `;

    this.clauses.set('insert', text);
    return this;
  }

  public returning(columns: string[] = []): this {
    const columnsWithTableName = prefixTableName(this.table, columns);
    const columnText = columns.length ? columnsWithTableName.join(', ') : '*';
    this.clauses.set('returning', `RETURNING ${columnText}`);
    return this;
  }

  public select(columns: string[] = []): this {
    const columnsWithTableName = prefixTableName(this.table, columns);
    const columnText = columns.length
      ? columnsWithTableName.join(', ')
      : `${this.table}.*`;
    const text = `SELECT ${columnText}`;

    this.clauses.set('select', text);
    this.clauses.set('from', `FROM ${this.table}`);
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

    this.clauses.set('update', updateText);
    return this;
  }

  public delete(): this {
    const deleteText = `DELETE FROM ${this.table}`;
    this.clauses.set('delete', deleteText);
    return this;
  }

  public where(
    items: KeyValue<string | number>,
    logicalOperator: LogicalOperator = 'AND',
    comparisonOperator: ComparisonOperator = '='
  ): this {
    // Set the initial where array in the clauses map.  We'll keep adding
    // to this with items and additional where methods (e.g., orWhere, andWhere)
    this.clauses.set('where', ['WHERE']);
    let text = '';
    Object.entries(items).forEach(([key, value], idx, arr) => {
      text += `${key} ${comparisonOperator} $${this.paramVal}`;
      text += arr.length > 1 && idx !== arr.length - 1 ? ` ${logicalOperator} ` : '';
      this.paramVal += 1;
      this.values.push(value);
    });
    
    // Add the text chunk to the where clause array, but wrap it in parentheses
    // so later where methods will be separated from this logic chunk
    this.clauses.get('where').push(`(${text})`);
    return this;
  }

  public run() {
    let query = '';
    let idx = 0;
    this.clauses.forEach(clause => {
      query += `${clause}`;
      idx += 1;
      if (idx !== this.clauses.size) {
        query += '\n';
      }
    });

    return this.pool.query(query);
  }
}

export const QB = (pool: Pool) => <T = any>(table: string) => {
  return new QueryBuilder<T>(pool, table);
};
