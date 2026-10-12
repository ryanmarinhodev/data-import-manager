import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class ClientPreviewsController {
  public async store(ctx: HttpContextContract) {

    const clientSchema = schema.create({
      customers: schema.array().members(schema.object().members({ name: schema.string({ trim: true }), email: schema.string({ trim: true }, [rules.email()]) }))
    })

    const payload = await ctx.request.validate({
      schema: clientSchema
    })

    const data = payload.customers.map((item) => {
      return { name: item.name, email: item.email.toLowerCase() }
    })

    const total = data.length

    ctx.response.json({ mensagem: 'Dados formatados', data, total })
  }
}
