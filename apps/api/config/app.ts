import Env from '@ioc:Adonis/Core/Env'

export const appKey = Env.get('APP_KEY')

export const http = {
  cookie: {
    domain: '',
    path: '/',
    maxAge: '2h',
    httpOnly: true,
    secure: false,
    sameSite: false,
  },
  trustProxy: () => true,
}

export const logger = {
  enabled: true,
  name: Env.get('APP_NAME'),
  level: Env.get('LOG_LEVEL', 'info'),
  prettyPrint: Env.get('NODE_ENV') === 'development',
}

export const profiler = {
  enabled: true,
  whitelist: [],
  blacklist: [],
}

export const validator = {
  messages: {},
}
