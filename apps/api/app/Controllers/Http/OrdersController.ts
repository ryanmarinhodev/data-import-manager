import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'

export default class OrdersController {
  public async store(ctx: HttpContextContract) {
    try {
      const ordersSchema = schema.create({
        description: schema.string({}, [rules.maxLength(250)]),
        price: schema.number(),
      })

      const payload = await ctx.request.validate({
        schema: ordersSchema,
      })

      const id = ctx.request.params().customerId
      const customer = await Customer.findBy('id', id)

      if (!customer) {
        return ctx.response.status(404).json({ message: 'Cliente não encontrado' })
      }

      return ctx.response.status(200).json({ message: 'Validado', payload })
    } catch (error) {
      // if (error.messages.errors[0].rule === 'maxLength') {
      //   return ctx.response.status(422).json({ message: 'A descrinção ultrapassou 250 caracteres' })
      // }
      throw error
    }
  }
}
