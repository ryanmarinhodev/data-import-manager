import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public customerId: number
  @belongsTo(() => Customer)
  public customer: BelongsTo<typeof Customer>

  @column()
  public description: string

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
