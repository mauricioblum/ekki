'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Account = use('App/Models/Account')

class User extends Model {
  static boot () {
    super.boot()
  }

  account () {
    return this.hasOne('App/Models/Account')
  }

  contacts () {
    return this.hasMany('App/Models/Contact')
  }
}

module.exports = User
