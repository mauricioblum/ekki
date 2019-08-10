'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()
  }

  account () {
    return this.hasOne('App/Models/Account')
  }
}

module.exports = User
