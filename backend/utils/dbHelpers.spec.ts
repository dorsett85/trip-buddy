import { prefixTableName } from './dbHelpers';

describe('dbHelpers module', () => {
  describe('prefixTableName function', () => {
    it('should prefix the table name to the string', () => {
      const argsWithTableNamePrefix = prefixTableName('trips', 'id');
      expect(argsWithTableNamePrefix).toBe('trips.id');
    });

    it('should prefix the table name to the string array', () => {
      const argsWithTableNamePrefix = prefixTableName('trips', ['id', 'name']);
      expect(argsWithTableNamePrefix).toStrictEqual(['trips.id', 'trips.name']);
    });
    
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
