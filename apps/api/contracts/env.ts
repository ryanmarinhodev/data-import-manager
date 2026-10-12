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
    SQLITE_DB_PATH?: string
  }
}
