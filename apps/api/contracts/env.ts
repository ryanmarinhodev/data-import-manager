declare module '@ioc:Adonis/Core/Env' {
  interface EnvTypes {
    HOST: string
    PORT: number
    APP_KEY: string
    APP_NAME: string
    NODE_ENV: 'development' | 'production' | 'test'
    LOG_LEVEL?: string
    CORS_ORIGIN?: string
    DB_CONNECTION: 'sqlite'
    ORACLE_HOST: string
    ORACLE_PORT: number
    ORACLE_USER: string
    ORACLE_PASSWORD?: string
    ORACLE_DB_NAME: string
    SQLITE_DB_PATH?: string
  }
}
