import QueryBuilder, { QB, WhereArgs } from './QueryBuilder';
import db from '../db/db';

const qb = QB(db);

describe('test QueryBuilder class', () => {
  it('should create new QueryBuilder instance', async () => {
    const instance = qb('users');
    expect(instance).toBeInstanceOf(QueryBuilder);
  });

  it('should contain a select clause', () => {
    const instance = qb('users').select();
    expect(instance.clausesMap.select).toBe('SELECT users.*\nFROM users');
  });

  it('should have columns in select clause', () => {
    const instance = qb('users').select(['id', 'name']);
    expect(instance.clausesMap.select).toBe('SELECT users.id, users.name\nFROM users');
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
    const sql = `UPDATE users\nSET id = $1, username = $2`;
    expect(instance.clausesMap.update).toBe(sql);
    expect(instance.parameterizedValues).toStrictEqual({
      paramVal: 3,
      values: [1, 'clayton']
    });
  });

  it('should contain an update clause with from clause', () => {
    const items = {
      id: 1,
      username: 'clayton'
    };
    const instance = qb('users').update(items, 'users_trips ut');
    const sql = `UPDATE users\nSET id = $1, username = $2\nFROM users_trips ut`;
    expect(instance.clausesMap.update).toBe(sql);
  });

  it('should contain a delete clause', () => {
    const instance = qb('users').delete();
    expect(instance.clausesMap.delete).toBe('DELETE\nFROM users');
  });

  it('should contain a delete clause with using', () => {
    const instance = qb('users').delete('users_trips');
    expect(instance.clausesMap.delete).toBe('DELETE\nFROM users\nUSING users_trips');
  });

  it('should contain a where clause', () => {
    const items = {
      id: 1,
      username: 'clayton'
    };
    const instance = qb('users').where({ items });
    expect(instance.clausesMap.where).toStrictEqual([
      'WHERE',
      'users.id = $1 AND users.username = $2'
    ]);
    expect(instance.parameterizedValues).toStrictEqual({
      paramVal: 3,
      values: [1, 'clayton']
    });
  });

  it('should contain a where clause with different operators', () => {
    const whereArgs: WhereArgs = {
      items: {
        id: ['>', 1],
        username: ['>=', 'clayton']
      },
      wrap: true,
      prefixOperator: 'AND',
      logicalOperator: 'OR'
    };
    const instance = qb('users').where(whereArgs);
    expect(instance.clausesMap.where).toStrictEqual([
      'WHERE',
      '(users.id > $1 OR users.username >= $2)'
    ]);
  });

  it('should contain a where clause with an array as input', () => {
    const whereArgs: WhereArgs = [
      { items: { id: 1, username: 'clayton' } },
      {
        items: { email: 'clayton@gmail.com', email_verified: true },
        wrap: true,
        prefixOperator: 'OR'
      }
    ];
    const instance = qb('users').where(whereArgs);
    expect(instance.clausesMap.where).toStrictEqual([
      'WHERE',
      'users.id = $1 AND users.username = $2',
      'OR (users.email = $3 AND users.email_verified = $4)'
    ]);
    expect(instance.parameterizedValues).toStrictEqual({
      paramVal: 5,
      values: [1, 'clayton', 'clayton@gmail.com', true]
    });
  });

  it('should contain where clause with raw input', () => {
    const text = `id = (
      id = 1 and username = 'clayton'
    )`;
    const instance = qb('users').where(text);
    expect(instance.clausesMap.where).toStrictEqual(['WHERE', text]);
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

  it('should not replace escaped params', () => {
    const text = `
      SELECT * FROM USERS
      WHERE id = '\\?' and username = ?
    `;
    const values = ['clayton'];
    const instance = qb('users').raw(text, values);
    expect(instance.rawQuery).toBe(`
      SELECT * FROM USERS
      WHERE id = '?' and username = $1
    `);
    expect(instance.parameterizedValues).toStrictEqual({
      paramVal: 2,
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

  it('should contain a join clause', () => {
    const text = 'INNER JOIN trips t on trip.user_id = users.id';
    const instance = qb('users').joinRaw(text);
    expect(instance.clausesMap.join).toBe(text);
  });
});
