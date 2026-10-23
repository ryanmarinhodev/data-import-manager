import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Order)
  public order: HasMany<typeof Order>

  @column()
  public name: string

  @column()
  public email: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
