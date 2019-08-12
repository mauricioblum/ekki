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

  transfers () {
    return this.hasMany('App/Models/Transfer')
  }

  contacts () {
    return this.hasMany('App/Models/Contact')
  }
}

module.exports = User
