import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  LOG_LEVEL: Env.schema.string.optional(),
  CORS_ORIGIN: Env.schema.string.optional(),
  DB_CONNECTION: Env.schema.enum(['oracle'] as const),
  ORACLE_HOST: Env.schema.string(),
  ORACLE_PORT: Env.schema.number(),
  ORACLE_USER: Env.schema.string(),
  ORACLE_PASSWORD: Env.schema.string.optional(),
  ORACLE_DB_NAME: Env.schema.string(),
  SQLITE_DB_PATH: Env.schema.string.optional(),
})
