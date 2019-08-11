'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/users', 'UserController.store')
Route.get('/users', 'UserController.index')
Route.get('/users/:id', 'UserController.show')

Route.get('/users/:userId/contacts', 'ContactController.index')
Route.put('/users/:userId/contacts/:contactId', 'ContactController.update')
Route.put('/users/:userId/contacts/add/:contactId', 'ContactController.store')
Route.delete('/users/:userId/contacts/:contactId', 'ContactController.destroy')

Route.post('/users/:userId/transfer/:beneficiaryId', 'TransferController.store')
