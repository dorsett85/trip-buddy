import { addInsert, addWhere, addSelect, addUpdate, prefixTableName } from './dbHelpers';

describe('dbHelpers module', () => {
  describe('addSelect function', () => {
    const table = 'users';

    it('should have select text', () => {
      const columns: string[] = [];
      let select = addSelect(table);

      expect(select.text).toBe(`SELECT ${table}.* FROM ${table}`);

      columns.push('id');
      select = addSelect(table, columns);

      expect(select.text).toBe(`SELECT ${table}.id FROM ${table}`);
    });

    it('should have select text with multiple columns', () => {
      const columns: string[] = ['id', 'username'];
      const { text } = addSelect(table, columns);

      expect(text).toBe(`SELECT ${table}.id, ${table}.username FROM ${table}`);
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

  describe('addUpdate function', () => {
    const table = 'users';

    it('should have update text and values', () => {
      const username = 'bill';
      const { text, values } = addUpdate(table, { username });
      expect(text).toBe(`UPDATE ${table} SET username = $1`);
      expect(values).toStrictEqual([username]);
    });

    it('should have multiple update text and values', () => {
      const username = 'bill';
      const email = 'bill@gmail.com';
      const { text, values } = addUpdate(table, { username, email });
      expect(text).toBe(`UPDATE ${table} SET username = $1, email = $2`);
      expect(values).toStrictEqual([username, email]);
    });

    it('should have correct text and values with where clause', () => {
      const id = 1;
      const username = 'bill';
      const email = 'bill@gmail.com';
      const update = addUpdate(table, { username, email });

      const whereArgs = {
        andWhereArgs: { id },
        orWhereArgs: {}
      };
      const where = addWhere(whereArgs, update.values!.length + 1);
      const text = `${update.text} ${where.text};`;
      const values = [...update.values!, ...where.values!];

      expect(text).toBe(`UPDATE ${table} SET username = $1, email = $2 WHERE id = $3;`);
      expect(values).toStrictEqual([username, email, id]);
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

  describe('prefixTableName function', () => {
    it('should prefix the table name to each key', () => {
      const tableName = 'trips';
      const args = {
        id: 1,
        name: 'Cali trip'
      };
      const argsWithTableNamePrefix = prefixTableName(tableName, args);
      expect(argsWithTableNamePrefix).toStrictEqual({
        'trips.id': 1,
        'trips.name': 'Cali trip'
      });
    });
  });
});
