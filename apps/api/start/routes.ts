import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => ({ hello: 'world' }))

Route.group(() => {
  Route.post('/imports/preview', 'ClientPreviewsController.store')
  Route.get('/customers', 'CustomersController.show')
  Route.get('/customers/:id', 'CustomersController.showById')
  Route.post('/customers', 'CustomersController.store')
  Route.put('/customers/:id', 'CustomersController.update')
  Route.delete('/customers/:id', 'CustomersController.destroy')
  Route.post('/customers/:customerId/orders', 'OrdersController.store')
})
