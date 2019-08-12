'use strict'

const Factory = use('Factory')
const Database = use('Database')

class UserSeeder {
  async run () {
    for (let i = 0; i <= 3; i++) {
      const user = await Factory
        .model('App/Models/User')
        .create()

      const account = await Factory.model('App/Models/Account').make()
      await user.account().save(account)
    }
  }
}

module.exports = UserSeeder
