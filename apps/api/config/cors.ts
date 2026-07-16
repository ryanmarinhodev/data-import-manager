import Env from '@ioc:Adonis/Core/Env'

const corsConfig = {
  enabled: true,
  origin: Env.get('CORS_ORIGIN', 'http://localhost:5173').split(','),
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
}

export default corsConfig
