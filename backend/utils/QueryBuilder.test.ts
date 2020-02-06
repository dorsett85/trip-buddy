import QueryBuilder, { QB } from './QueryBuilder';
import db from '../db/db';

const qb = QB(db);

describe('test QueryBuilder class', () => {
  it('should create new QueryBuilder instance', async () => {
    const instance = qb('users');
    expect(instance).toBeInstanceOf(QueryBuilder);
  });
});
