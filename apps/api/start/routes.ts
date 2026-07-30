import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return {
    name: 'data-import-manager-api',
    status: 'ok',
  }
})

Route.get('/health', 'HealthController.index')
Route.get('/healthh', 'HealthController.index')
Route.get('/posts', 'PostsController.index')
Route.get('/summary', 'SummaryController.index')
