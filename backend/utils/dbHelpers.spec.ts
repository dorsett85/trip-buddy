import { addInsert, addWhere, addSelect } from './dbHelpers';

describe('dbHelpers module', () => {
  describe('addSelect function', () => {
    const table = 'users';

    it('should have select text', () => {
      const columns: string[] = [];
      let select = addSelect(table);

      expect(select.text).toBe(`SELECT * FROM ${table}`);

      columns.push('id');
      select = addSelect(table, columns);

      expect(select.text).toBe(`SELECT id FROM ${table}`);
    });

    it('should have select text with multiple columns', () => {
      const columns: string[] = ['id', 'username'];
      const { text } = addSelect(table, columns);

      expect(text).toBe(`SELECT id, username FROM ${table}`);
    });
  });

  describe('addInsert function', () => {
    const table = 'users';

    it('should have insert text and values', () => {
      const username = 'clayton';
      const { text, values } = addInsert(table, { username });
      expect(text).toBe(`INSERT INTO ${table} (username) VALUES ($1) RETURNING *;`);
      expect(values).toStrictEqual([username]);
    });

    it('should have insert text and multiple values', () => {
      const username = 'clayton';
      const password = 'password123';
      const { text, values } = addInsert(table, { username, password });
      expect(text).toBe(
        `INSERT INTO ${table} (username, password) VALUES ($1, $2) RETURNING *;`
      );
      expect(values).toStrictEqual([username, password]);
    });

    it('should have insert text and multiple values and different starting values', () => {
      const username = 'clayton';
      const password = 'password123';
      const { text, values } = addInsert(table, { username, password }, 5);
      expect(text).toBe(
        `INSERT INTO ${table} (username, password) VALUES ($5, $6) RETURNING *;`
      );
      expect(values).toStrictEqual([username, password]);
    });
  });

  describe('addWhere function', () => {
    const whereArgs = {
      andWhereArgs: {},
      orWhereArgs: {}
    };

    it('should return an error when both properties are empty objects', () => {
      const err = () => addWhere(whereArgs);
      expect(err).toThrow();
    });

    it('should have where text and values', () => {
      const id = 1;
      whereArgs.andWhereArgs = { id };
      whereArgs.orWhereArgs = {};

      const { text, values } = addWhere(whereArgs);
      expect(text).toBe('WHERE id = $1');
      expect(values).toStrictEqual([id]);
    });

    it('should have where text and values with different starting value', () => {
      const id = 1;
      whereArgs.andWhereArgs = { id };
      whereArgs.orWhereArgs = {};

      const { text, values } = addWhere(whereArgs, 5);
      expect(text).toBe('WHERE id = $5');
      expect(values).toStrictEqual([id]);
    });

    it('should have where text and values with AND', () => {
      const id = 1;
      const username = 'clayton';
      whereArgs.andWhereArgs = { id, username };
      whereArgs.orWhereArgs = {};

      const { text, values } = addWhere(whereArgs);
      expect(text).toBe('WHERE id = $1 AND username = $2');
      expect(values).toStrictEqual([id, username]);
    });

    it('should have where text and values with OR', () => {
      const id = 1;
      const username = 'clayton';
      whereArgs.andWhereArgs = {};
      whereArgs.orWhereArgs = { id, username };

      const { text, values } = addWhere(whereArgs);
      expect(text).toBe('WHERE id = $1 OR username = $2');
      expect(values).toStrictEqual([id, username]);
    });

    it('should have where text and values with AND and OR', () => {
      const id = 1;
      const username = 'clayton';
      const email = 'claytonphillipsdorsett@gmail.com';
      whereArgs.andWhereArgs = { id, username };
      whereArgs.orWhereArgs = { email };

      const { text, values } = addWhere(whereArgs);
      expect(text).toBe('WHERE id = $1 AND username = $2 OR email = $3');
      expect(values).toStrictEqual([id, username, email]);
    });
  });
});
