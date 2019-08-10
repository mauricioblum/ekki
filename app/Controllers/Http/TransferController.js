'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')
const Transfer = use('App/Models/Transfer')
const Account = use('App/Models/Account')

/**
 * Resourceful controller for interacting with transfers
 */
class TransferController {
  /**
   * Show a list of all transfers.
   * GET transfers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Create/save a new transfer.
   * POST transfers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, params }) {
    try {
      const amount = parseFloat(request.input('amount'))
      const transfer = Transfer.create({ amount, user_id: params.userId })
      const userAccount = await Account.findByOrFail('user_id', params.userId)
      const destinationAccount = await Account.findByOrFail('user_id', params.contactId)

      if (parseFloat(userAccount.balance) >= amount) {
        userAccount.balance -= amount
        await userAccount.save()
      } else if (parseFloat(userAccount.limit) >= amount) {
        userAccount.limit -= amount
        await userAccount.save()
      } else {
        return response.status(401).send({ error: { message: 'Saldo insuficiente!' } })
      }

      destinationAccount.balance = parseFloat(destinationAccount.balance) + amount
      await destinationAccount.save()

      return transfer
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Algo deu errado.' } })
    }
  }

  /**
   * Display a single transfer.
   * GET transfers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing transfer.
   * GET transfers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update transfer details.
   * PUT or PATCH transfers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a transfer with id.
   * DELETE transfers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = TransferController
