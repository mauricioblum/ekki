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

  transfers () {
    return this.hasMany('App/Models/Transfer')
  }
}

module.exports = User
