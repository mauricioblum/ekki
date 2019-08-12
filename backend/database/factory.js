'use strict'

const Factory = use('Factory')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    name: faker.name({ nationality: 'it' }),
    cpf: faker.string({ length: 11, pool: '0123456789' }),
    phone: faker.phone({ formatted: false })
  }
})

Factory.blueprint('App/Models/Account', async (faker) => {
  return {
    number: faker.natural({ min: 1, max: 200 }),
    balance: 1000,
    limit: 500
  }
})
