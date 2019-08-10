'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransferSchema extends Schema {
  up () {
    this.create('transfers', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('contact_id')
        .unsigned()
        .references('id')
        .inTable('contacts')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.decimal('amount').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('transfers')
  }
}

module.exports = TransferSchema
