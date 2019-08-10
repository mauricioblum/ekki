'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Contact = use('App/Models/Contact')
const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with contacts
 */
class ContactController {
  async index ({ params, response, view }) {
    const contacts = await Contact.query()
      .where('user_id', params.userId).fetch()

    return contacts
  }

  async store ({ request, response, params }) {
    const data = request.only(['user_id', 'name', 'cpf', 'phone'])

    const contact = await Contact.create({ ...data, user_id: params.userId })

    return contact
  }

  /**
   * Display a single contact.
   * GET contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

  }

  /**
   * Update contact details.
   * PUT or PATCH contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only(['name', 'cpf', 'phone'])

    const contact = await Contact.query()
      .where('user_id', params.userId)
      .where('id', params.contactId).first()

    contact.merge(data)

    await contact.save()

    return contact
  }

  /**
   * Delete a contact with id.
   * DELETE contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const contact = await Contact.query()
      .where('user_id', params.userId)
      .where('id', params.contactId).first()

    await contact.delete()
  }
}

module.exports = ContactController
