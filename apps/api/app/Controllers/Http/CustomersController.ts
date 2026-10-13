import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'

export default class CustomersController {
  public async store(ctx: HttpContextContract) {
    const data = schema.create({
      name: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [rules.email()]),
    })

    const payload = await ctx.request.validate({
      schema: data,
    })

    const createCustomer = await Customer.create(payload)

    return ctx.response.status(201).json({ message: 'Usuário criado com sucesso!', createCustomer })
  }

  public async destroy(ctx: HttpContextContract) {
    const id = ctx.request.param('id')

    const findCustomer = await Customer.findBy('id', id)

    if (!findCustomer) {
      return ctx.response.status(404).json({ message: 'Cliente não encontrado' })
    }

    await findCustomer.delete()

    return ctx.response.status(200).json({ message: 'Cliente deletado com sucesso!' })
  }
}
