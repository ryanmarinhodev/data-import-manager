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

      return ctx.response.status(201).json({
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

  public async update(ctx: HttpContextContract) {
    try {
      const id = ctx.request.param('id')

      const findOrders = await Order.findBy('id', id)

      if (!findOrders) {
        return ctx.response.status(404).json({ message: 'Pedido não encontrado' })
      }

      const statusSchema = schema.create({
        status: schema.enum(['confirmado', 'cancelado', 'pendente']),
      })

      const validateStatus = await ctx.request.validate({
        schema: statusSchema,
      })

      if (findOrders.status === 'cancelado' && validateStatus.status !== 'cancelado') {
        return ctx.response
          .status(409)
          .json({ message: 'Não é possível alterar o status de um pedido cancelado.' })
      }

      if (findOrders.status === 'cancelado' && validateStatus.status === 'cancelado') {
        return ctx.response.status(200).json({ message: 'Status se encontra cancelado' })
      }

      const data = await Order.updateOrCreate({ id: id }, validateStatus)

      const statusUpdated = data

      return ctx.response.status(200).json({
        message: 'Status alterado com sucesso!',
        data: { id: findOrders.id, status: statusUpdated.status },
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
