import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HealthController {
  public async index(ctx: HttpContextContract) {
    const date = new Date().toISOString()
    const upTime = Math.floor(process.uptime())

    const result = {
      status: 'ok',
      appName: process.env.APP_NAME,
      environment: process.env.NODE_ENV ?? 'development',
      date: date,
      upTime: upTime,
    }

    return result
  }
}
