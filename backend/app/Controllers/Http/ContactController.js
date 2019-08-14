'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contacts
 */

const Contact = use('App/Models/Contact')
const User = use('App/Models/User')

class ContactController {
  /**
   * Show a list of all contacts.
   * GET contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, params }) {
    const contacts = await Contact.query()
      .where('user_id', params.userId).fetch()

    return contacts
  }

  /**
   * Create/save a new contact.
   * POST contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, params }) {
    const { cpf, name } = request.get()
    if (cpf || name) {
      let owner
      if (name !== undefined) {
        owner = await User.query().whereRaw(`name ILIKE '${name}%'`).first()
      } else {
        owner = await User.query().whereRaw(`cpf = ${cpf}`).first()
      }

      if (!owner) {
        return response.status(400).send({ error: { message: 'Contato não encontrado!' } })
      }

      const contact = new Contact()

      const user = await User.findOrFail(params.userId)

      contact.fill({
        owner_id: owner.id,
        user_id: user.id,
        name: owner.name,
        cpf: owner.cpf,
        phone: owner.phone
      })

      if (user.id === owner.id) {
        return response.status(401).send({ error: { message: 'Você não pode adicionar você mesmo!' } })
      }

      await contact.save()

      return contact
    } else {
      const owner = await User.findOrFail(params.ownerId)
      const user = await User.findOrFail(params.userId)
      const data = {
        name: owner.name,
        cpf: owner.cpf,
        phone: owner.phone
      }

      const contact = Contact.create({ ...data, owner_id: owner.id, user_id: user.id })

      return contact
    }
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
