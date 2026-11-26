import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class LoginController {
  public async index(ctx: HttpContextContract) {
    const dataUsers = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.normalizeEmail({ allLowercase: true }),
      ]),
      password: schema.string([rules.maxLength(100)]),
    })

    const data = await ctx.request.validate({
      schema: dataUsers,
    })

    const user = await User.findBy('email', data.email)

    if (!user) {
      return ctx.response.status(401).json({ message: 'Usuário não encontrado' })
    }

    if (!user || !user.password) {
      return ctx.response.status(401).json({
        message: 'Usuário não encontrado',
      })
    }

    const matchUser = await bcrypt.compare(data.password, user.password)

    if (!matchUser) {
      return ctx.response.status(401).json({ message: 'Usuário não encontrado' })
    }

    const token = jwt.sign({ sub: String(user.id) }, Env.get('JWT_SECRET'), { expiresIn: '1h' })

    return ctx.response.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: { type: 'Bearer', value: token, expiresIn: '1h' },
    })
  }

  public async me(ctx: HttpContextContract) {
    const authorization = ctx.request.header('authorization')

    if (!authorization) {
      return ctx.response.status(401).json({ message: 'Informe o token' })
    }

    const bearer = authorization?.split(' ')[0]
    const token = authorization?.split(' ')[1]

    if (bearer !== 'Bearer' || !token) {
      return ctx.response.status(401).json({ message: 'O token espera Bearer e um token válido' })
    }

    let decode

    try {
      decode = jwt.verify(token, Env.get('JWT_SECRET'))
    } catch (error) {
      console.error('error', error)
      return ctx.response.status(401).json({ message: 'Deu erro' })
    }

    if (typeof decode !== 'object' || typeof decode.sub !== 'string') {
      return ctx.response.status(401).json({ message: 'Dados do token ou id do usuário inválido' })
    }

    const user = await User.findBy('id', decode.sub)

    if (!user) {
      return ctx.response.status(401).json({ message: 'Usuário não encontrado' })
    }

    return ctx.response.json({ id: user.id, name: user.name, email: user.email })
  }
}
