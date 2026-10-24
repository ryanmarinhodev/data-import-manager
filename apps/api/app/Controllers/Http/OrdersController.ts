import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrdersController {
  public async store(ctx: HttpContextContract) {
    const ordersSchema = schema.create({
      description: schema.string({}, [rules.maxLength(250)]),
      price: schema.number(),
    })

    const payload = await ctx.request.validate({
      schema: ordersSchema,
    })

    return ctx.response.status(200).json({ message: 'Validado', payload })
  }
}
