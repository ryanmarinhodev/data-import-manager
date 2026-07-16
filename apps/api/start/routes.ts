import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return {
    name: 'data-import-manager-api',
    status: 'ok',
  }
})

Route.get('/health', async () => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV ?? 'development',
  }
})
