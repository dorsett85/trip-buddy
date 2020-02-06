import { Pool, QueryResult } from 'pg';
import { prefixTableName } from './dbHelpers';

export default class QueryBuilder<T = any> {
  // Make it thenable
  public readonly then: (
    onfulfilled?: (value: QueryResult<T>) => QueryResult<T>
  ) => Promise<QueryResult<T>>;

  private readonly table: string;

  private readonly pool: Pool;

  public statements: Map<string, any>;

  constructor(pool: Pool, table: string) {
    this.then = <T = any>(resolve: any): Promise<QueryResult<T>> => {
      return this.run().then(resolve);
    };
    this.table = table;
    this.pool = pool;
    this.statements = new Map();
  }

  public select(columns: string[] = []): this {
    const columnWithTableName = prefixTableName(this.table, columns);
    const columnText = columns.length
      ? columnWithTableName.join(', ')
      : `${this.table}.*`;
    const text = `SELECT ${columnText}`;

    this.statements = this.statements.set('select', text);
    this.statements = this.statements.set('from', `FROM ${this.table}`);
    return this;
  }

  public run() {
    let query = '';
    let idx = 0;
    this.statements.forEach(statement => {
      query += `${statement}`;
      idx += 1;
      if (idx !== this.statements.size) {
        query += '\n';
      }
    });

    return this.pool.query(query);
  }
}

export const QB = (pool: Pool) => <T = any>(table: string) => {
  return new QueryBuilder<T>(pool, table);
};
