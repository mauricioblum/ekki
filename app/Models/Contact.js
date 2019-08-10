'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contact extends Model {
  static boot () {
    super.boot()
  }

  user () {
    this.belongsTo('App/Models/User')
  }
}

module.exports = Contact
