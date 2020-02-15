import QueryBuilder, { QB } from './QueryBuilder';
import db from '../db/db';

const qb = QB(db);

describe('test QueryBuilder class', () => {
  it('should create new QueryBuilder instance', async () => {
    const instance = qb('users');
    expect(instance).toBeInstanceOf(QueryBuilder);
  });

  it('should contain a select clause', () => {
    const instance = qb('users').select();
    expect(instance.clausesMap.select).toBe('SELECT users.*');
  });

  it('should have columns in select clause', () => {
    const instance = qb('users').select(['id', 'name']);
    expect(instance.clausesMap.select).toBe('SELECT users.id, users.name');
  });

  it('should contain an insert clause', () => {
    const items = {
      id: 1,
      username: 'clayton'
    };
    const instance = qb('users').insert(items);
    const sql = `INSERT INTO users (id, username)\nVALUES ($1, $2)`;
    expect(instance.clausesMap.insert).toBe(sql);
    expect(instance.parameterizedValues).toStrictEqual({
      paramVal: 3,
      values: [1, 'clayton']
    });
  });

  it('should contain an update clause', () => {
    const items = {
      id: 1,
      username: 'clayton'
    };
    const instance = qb('users').update(items);
    const sql = `UPDATE users SET id = $1, username = $2`;
    expect(instance.clausesMap.update).toBe(sql);
    expect(instance.parameterizedValues).toStrictEqual({
      paramVal: 3,
      values: [1, 'clayton']
    });
  });

  it('should contain a delete clause', () => {
    const instance = qb('users').delete();
    expect(instance.clausesMap.delete).toBe(`DELETE FROM users`);
  });

  it('should contain a where clause', () => {
    const items = {
      id: 1,
      username: 'clayton'
    };
    const instance = qb('users').where(items);
    expect(instance.clausesMap.where).toStrictEqual([
      'WHERE',
      'id = $1 AND username = $2'
    ]);
    expect(instance.parameterizedValues).toStrictEqual({
      paramVal: 3,
      values: [1, 'clayton']
    });
  });

  it('should contain where clause from whereRaw string', () => {
    const text = `id = 1 and username = 'clayton'`;
    const instance = qb('user').whereRaw(text);
    expect(instance.clausesMap.where).toStrictEqual([
      'WHERE',
      `id = 1 and username = 'clayton'`
    ]);
  });

  it('should contain a returning clause', () => {
    const instance = qb('users').returning();
    expect(instance.clausesMap.returning).toBe('RETURNING *');
  });

  it('should contain rawQuery', () => {
    const text = 'SELECT * FROM USERS';
    const instance = qb('users').raw(text);
    expect(instance.rawQuery).toBe(text);
  });

  it('should contain rawQuery with replaced params', () => {
    const text = `
      SELECT * FROM USERS
      WHERE id = ? and username = ?
    `;
    const values = [1, 'clayton'];
    const instance = qb('users').raw(text, values);
    expect(instance.rawQuery).toBe(`
      SELECT * FROM USERS
      WHERE id = $1 and username = $2
    `);
    expect(instance.parameterizedValues).toStrictEqual({
      paramVal: 3,
      values
    });
  });

  it('should error with unequal raw params and values', () => {
    expect.assertions(1);
    const text = `id = ?`;
    const values = [1, 'clayton'];
    try {
      qb('users').raw(text, values);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('should contain where clause from whereRaw method', () => {
    const text = `id = (
      id = 1 and username = 'clayton'
    )`;
    const instance = qb('users').whereRaw(text);
    expect(instance.clausesMap.where).toStrictEqual(['WHERE', text]);
  });

  it('should contain where clause with replaced params', () => {
    const text = 'id = ? AND username = ?';
    const values = [1, 'clayton'];
    const instance = qb('users').whereRaw(text, values);
    expect(instance.clausesMap.where).toStrictEqual([
      'WHERE',
      'id = $1 AND username = $2'
    ]);
    expect(instance.parameterizedValues).toStrictEqual({
      paramVal: 3,
      values
    });
  });
});
