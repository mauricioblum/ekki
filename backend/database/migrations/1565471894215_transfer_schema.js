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
        .integer('beneficiary_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.decimal('amount').notNullable()
      table.string('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('transfers')
  }
}

module.exports = TransferSchema
