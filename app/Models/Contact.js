'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const User = use('App/Models/User')

class Contact extends User {
  static boot () {
    super.boot()
  }
}

module.exports = Contact
