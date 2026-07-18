import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => {
  return {
    name: 'data-import-manager-api',
    status: 'ok',
  }
})

Route.get('/health', async () => {
  const date = new Date().toISOString()
  const upTime = Math.floor(process.uptime())

  return {
    status: 'ok',
    appName: process.env.APP_NAME,
    environment: process.env.NODE_ENV ?? 'development',
    date: date,
    upTime: upTime,

  }
})
