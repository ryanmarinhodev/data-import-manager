import { test } from '@japa/runner'

test.group('Health check', () => {
  test('returns API status', async ({ client }) => {
    const response = await client.get('/health')

    response.assertStatus(200)
    response.assertBodyContains({
      status: 'ok',
      environment: 'test',
    })
  })
})
