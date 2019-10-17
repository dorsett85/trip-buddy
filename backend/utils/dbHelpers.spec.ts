import { columnEqualsParam, addWhere } from './dbHelpers';

describe('dbHelpers module', () => {
  describe('columnEqualsParam function', () => {
    it('should be empty', () => {
      const string = columnEqualsParam([], 'OR');
      expect(string).toBe('');
    });

    it('should have id', () => {
      const string = columnEqualsParam(['id']);
      expect(string).toBe('id = $1');
    });

    it('should have id and username with AND', () => {
      const string = columnEqualsParam(['id', 'username'], 'AND');
      expect(string).toBe('id = $1 AND username = $2');
    });

    it('should have id and username with OR', () => {
      const string = columnEqualsParam(['id', 'username'], 'OR');
      expect(string).toBe('id = $1 OR username = $2');
    });
  });

  describe('addWhere function', () => {
    const whereArgs = {
      andWhereArgs: {},
      orWhereArgs: {}
    };

    it('should be empty', () => {
      const { text, values } = addWhere(whereArgs, []);
      expect(text).toBe('');
      expect(values).toStrictEqual([]);
    });

    it('should have text and values', () => {
      const id = 1;
      whereArgs.andWhereArgs = { id };
      whereArgs.orWhereArgs = {};

      const { text, values } = addWhere(whereArgs, []);
      expect(text).toBe('WHERE id = $1');
      expect(values).toStrictEqual([id]);
    });

    it('should have text and values with AND', () => {
      const id = 1;
      const username = 'clayton';
      whereArgs.andWhereArgs = { id, username };
      whereArgs.orWhereArgs = {};

      const { text, values } = addWhere(whereArgs, []);
      expect(text).toBe('WHERE id = $1 AND username = $2');
      expect(values).toStrictEqual([id, username]);
    });

    it('should have text and values with OR', () => {
      const id = 1;
      const username = 'clayton';
      whereArgs.andWhereArgs = {};
      whereArgs.orWhereArgs = { id, username };

      const { text, values } = addWhere(whereArgs, []);
      expect(text).toBe('WHERE id = $1 OR username = $2');
      expect(values).toStrictEqual([id, username]);
    });

    it('should have text and values with AND and OR', () => {
      const id = 1;
      const username = 'clayton';
      const email = 'claytonphillipsdorsett@gmail.com';
      whereArgs.andWhereArgs = { id, username };
      whereArgs.orWhereArgs = { email };

      const { text, values } = addWhere(whereArgs, []);
      expect(text).toBe('WHERE id = $1 AND username = $2 OR email = $3');
      expect(values).toStrictEqual([id, username, email]);
    });
  });
});
