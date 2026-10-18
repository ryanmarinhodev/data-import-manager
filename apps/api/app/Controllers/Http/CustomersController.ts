import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'

export default class CustomersController {
  public async show(ctx: HttpContextContract) {
    const customer = await Customer.query().from('customers')

    return ctx.response.status(201).json(customer)
  }

  public async showById(ctx: HttpContextContract) {
    const id = ctx.request.param('id')
    const customer = await Customer.findBy('id', id)
    if (!customer) {
      return ctx.response.status(404).json({ message: 'Cliente não encontrado' })
    }

    return ctx.response.status(201).json(customer)
  }

  public async store(ctx: HttpContextContract) {
    const data = schema.create({
      name: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [rules.email()]),
    })

    const payload = await ctx.request.validate({
      schema: data,
    })

    try {
      const createCustomer = await Customer.create(payload)
      return ctx.response
        .status(201)
        .json({ message: 'Cliente criado com sucesso!', createCustomer })
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        return ctx.response.status(409).json({ message: 'E-mail não disponível' })
      }
      console.error(error)
    }
  }

  public async update(ctx: HttpContextContract) {
    const id = ctx.request.param('id')

    const customerData = schema.create({
      name: schema.string({ trim: true }, []),
    })

    const payload = await ctx.request.validate({
      schema: customerData,
    })

    const findCustomer = await Customer.findBy('id', id)

    if (!findCustomer) {
      return ctx.response.status(404).json({ message: 'Cliente não encontrado' })
    }

    findCustomer.name = payload.name
    await findCustomer.save()

    ctx.response.status(200).json({ message: 'Cliente atualizado com sucesso!' })
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
