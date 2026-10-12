import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'

test('responds to the initial route', async ({ client }) => {
  const response = await client.get('/')
  response.assertStatus(200)
  response.assertBody({ hello: 'world' })
})

test('connects to SQLite', async ({ assert }) => {
  const rows = await Database.rawQuery('select 1 as connected')
  assert.equal(rows[0].connected, 1)
})
