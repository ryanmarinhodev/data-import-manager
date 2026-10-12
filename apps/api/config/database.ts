import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import type { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION', 'sqlite'),
  connections: {
    sqlite: {
      client: 'sqlite3',
      connection: {
        filename: Application.makePath(Env.get('SQLITE_DB_PATH', 'tmp/db.sqlite3')),
      },
      useNullAsDefault: true,
      healthCheck: false,
      debug: false,
      migrations: { naturalSort: true },
    },
  },
}

export default databaseConfig
