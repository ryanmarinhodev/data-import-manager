import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['customer_id'])

      table.foreign('customer_id').references('id').inTable('customers').onDelete('RESTRICT')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['customer_id'])
      table.foreign('customer_id').references('id').inTable('customers').onDelete('CASCADE')
    })
  }
}
