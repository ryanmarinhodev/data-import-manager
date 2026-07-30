import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SummaryController {
  public async index(ctx: HttpContextContract) {
    return [
      {
        totalImports: 12,
        pendingImports: 3,
        failedImports: 1,
        lastImportsAt: '2026-07-28'
      }
    ]
  }
}
