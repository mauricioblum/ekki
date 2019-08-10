'use strict'

const User = use('App/Models/User')
const Account = use('App/Models/Account')

class UserController {
  async index ({ params }) {
    const users = User.query()
      .with('contacts')
      .fetch()

    return users
  }

  async store ({ request }) {
    const data = request.only(['name', 'cpf', 'phone'])

    const user = await User.create(data)
    const account = new Account()
    account.user_id = user.id
    account.number = user.id * 2019
    account.limit = 500

    await account.save()

    return user
  }
}

module.exports = UserController
