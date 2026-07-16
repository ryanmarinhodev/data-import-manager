import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION', 'sqlite'),
  connections: {
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: Env.get('SQLITE_DB_PATH', 'tmp/db.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },
  },
}

export default databaseConfig
