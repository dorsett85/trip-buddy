import QueryBuilder, { QB } from './QueryBuilder';
import db from '../db/db';

const qb = QB(db);

describe('test QueryBuilder class', () => {
  it('should create new QueryBuilder instance', async () => {
    const instance = qb('users');
    expect(instance).toBeInstanceOf(QueryBuilder);
  });

  it('should contain a select and from clause', () => {
    const instance = qb('users').select();
    expect(instance.clausesMap.get('select')).toBe('SELECT users.*');
    expect(instance.clausesMap.get('from')).toBe('FROM users');
  });

  it('should have columns in select clause', () => {
    const instance = qb('users').select(['id', 'name']);
    expect(instance.clausesMap.get('select')).toBe('SELECT users.id, users.name');
  });

  it('should contain an insert clause', () => {
    const items = {
      id: 1,
      username: 'clayton'
    };
    const instance = qb('users').insert(items);
    expect(instance.clausesMap.get('insert')).toBe(`
      INSERT INTO users (id, username)
      VALUES ($1, $2)
    `);
    expect(instance.parameterizedValues).toStrictEqual({
      paramVal: 3,
      values: [1, 'clayton']
    });
  });

  it('should contain a returning clause', () => {
    const instance = qb('users').returning();
    expect(instance.clausesMap.get('returning')).toBe('RETURNING *');
  });

  it('should contain an update clause', () => {
    const items = {
      id: 1,
      username: 'clayton'
    };
    const instance = qb('users').update(items);
    const sql = `UPDATE users SET id = $1, username = $2`;
    expect(instance.clausesMap.get('update')).toBe(sql);
    expect(instance.parameterizedValues).toStrictEqual({
      paramVal: 3,
      values: [1, 'clayton']
    });
  });

  it('should contain a delete clause', () => {
    const instance = qb('users').delete();
    expect(instance.clausesMap.get('delete')).toBe(`DELETE FROM users`);
  });
  
  it('should contain a where clause', () => {
    const items = {
      id: 1,
      username: 'clayton'
    };
    const instance = qb('users').where(items);
    expect(instance.clausesMap.get('where')).toStrictEqual(['WHERE', '(id = $1 AND username = $2)']);
    expect(instance.parameterizedValues).toStrictEqual({
      paramVal: 3,
      values: [1, 'clayton']
    });
  })
});
