import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name',100).notNullable()
      table.string('surname',100).notNullable()
      table.string('mothers_surname')
      table.integer('age',3).notNullable()
      table.date('birthdate').notNullable()
      
      table.timestamps(true, true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
