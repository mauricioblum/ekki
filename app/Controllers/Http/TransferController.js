'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Transfer = use('App/Models/Transfer')
const Account = use('App/Models/Account')
const moment = require('moment')

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
  async index ({ request, response, params }) {
    const transfers = await Transfer.query().with('user').where('user_id', params.userId).fetch()

    return transfers
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
      const userAccount = await Account.findByOrFail('user_id', params.userId)
      const destinationAccount = await Account.findByOrFail('user_id', params.beneficiaryId)

      const lastTransfer = await Transfer.query().where('user_id', params.userId).last()

      const transfer = new Transfer()
      transfer.fill({ amount,
        status: 'IN_PROGRESS',
        user_id: params.userId,
        beneficiary_id: params.beneficiaryId })

      if (lastTransfer &&
        parseFloat(lastTransfer.amount) === amount &&
        moment().subtract('2', 'minutes').isBefore(lastTransfer.created_at)) {
        console.log('Use this transfer and cancel the previous one')
        lastTransfer.status = 'CANCELLED'
        await lastTransfer.save()
        userAccount.balance = parseFloat(userAccount.balance) + amount
        await userAccount.save()
        destinationAccount.balance = parseFloat(destinationAccount.balance) - amount
        await destinationAccount.save()
      } else {
        console.log('New transfer')
      }

      if (parseFloat(userAccount.balance) >= amount) {
        userAccount.balance -= amount
        await userAccount.save()
      } else if (parseFloat(userAccount.limit) >= amount) {
        userAccount.limit -= amount
        await userAccount.save()
      } else {
        transfer.merge({ status: 'REJECTED' })
        await transfer.save()
        return response.status(401).send({ error: { message: 'Saldo insuficiente!' } })
      }

      destinationAccount.balance = parseFloat(destinationAccount.balance) + amount
      await destinationAccount.save()
      transfer.merge({ status: 'COMPLETED' })
      await transfer.save()

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
