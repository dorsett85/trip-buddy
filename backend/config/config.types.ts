export interface ConfigType {
  env: string,
  db: {
    client: string,
    connection: string,
    pool: {
      min: number,
      max: number
    }
    migrations: {
      tableName: string
    }
  }
}
