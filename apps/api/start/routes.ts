import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => ({ hello: 'world' }))

Route.group(() => {
  Route.post('/imports/preview', 'ClientPreviewsController.store')
})
