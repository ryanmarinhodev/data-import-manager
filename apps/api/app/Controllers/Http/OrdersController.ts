import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import Order from 'App/Models/Order'

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

      const saveData = {
        customerId: id,
        ...payload,
        status: 'pendente',
      }

      const price = Number(saveData.price)

      if (!Number.isInteger(price) || price <= 0) {
        return ctx.response.status(422).json({
          message: 'O preço deve ser um número inteiro maior que zero.',
        })
      }

      const data = await Order.create(saveData)

      return ctx.response
        .status(201)
        .json({
          message: 'Dados criado com sucesso!',
          data: {
            id: data.id,
            customerId: data.customerId,
            description: data.description,
            price: data.price,
            status: data.status,
          },
        })
    } catch (error) {
      // if (error.messages.errors[0].rule === 'maxLength') {
      //   return ctx.response.status(422).json({ message: 'A descrinção ultrapassou 250 caracteres' })
      // }

      throw error
    }
  }
}
