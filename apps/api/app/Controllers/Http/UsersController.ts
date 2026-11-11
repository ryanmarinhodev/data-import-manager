import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import bcrypt from 'bcrypt'

export default class UsersController {
  public async store(ctx: HttpContextContract) {
    try {
      const dataUsers = schema.create({
        name: schema.string({ trim: true }),
        email: schema.string({ trim: true }, [
          rules.email(),
          rules.normalizeEmail({ allLowercase: true }),
        ]),
        password: schema.string([rules.maxLength(100)]),
      })

      const payload = await ctx.request.validate({
        schema: dataUsers,
      })

      const hashPassword = await bcrypt.hash(payload.password, 10)

      await User.create({ ...payload, password: hashPassword })

      ctx.response.status(201).json({
        message: 'Usuário criado com sucesso!',
        data: { name: payload.name, email: payload.email },
      })
    } catch (error) {
      console.error(error)
      if (error.message.includes('SQLITE_CONSTRAINT: UNIQUE constraint failed')) {
        return ctx.response
          .status(409)
          .json({ message: 'Já existe um registro com os dados informados.' })
      }

      throw error
    }
  }

  public async index(ctx: HttpContextContract) {
    const customer = await User.query()

    return ctx.response.status(200).json(customer)
  }
}
