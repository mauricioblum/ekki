'use strict'

const User = use('App/Models/User')
const Account = use('App/Models/Account')

class UserController {
  async index ({ params, request }) {
    const { cpf } = request.get()
    if (cpf) {
      const user = await User.query().with('account').with('contacts').where('cpf', cpf).fetch()
      return user
    } else {
      const users = User.query()
        .with('account')
        .with('contacts')
        .fetch()

      return users
    }
  }

  async store ({ request }) {
    const data = request.only(['name', 'cpf', 'phone'])

    const user = await User.create({ ...data })
    const account = new Account()
    account.user_id = user.id
    const currentAccountNumber = await Account.query().count('* as total')
    account.number = parseInt(currentAccountNumber[0].total, 10) + 1
    account.balance = 1000
    account.limit = 500

    await account.save()

    return user
  }

  async show ({ params }) {
    const user = await User.query().with('account').with('contacts').where('id', params.id).fetch()
    return user
  }
}

module.exports = UserController
