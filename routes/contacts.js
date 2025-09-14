// routes/contacts.js
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);
/* 
  #swagger.tags = ['Contacts']
  #swagger.summary = 'Get all contacts'
*/

router.get('/:id', contactsController.getSingle);
/* 
  #swagger.tags = ['Contacts']
  #swagger.summary = 'Get a single contact by ID'
*/

router.post('/', contactsController.createContact);
/* 
  #swagger.tags = ['Contacts']
  #swagger.summary = 'Create a new contact'
  #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada@example.com',
        favoriteColor: 'Teal',
        birthday: '1815-12-10'
      }
  }
*/

router.put('/:id', contactsController.updateContact);
/* 
  #swagger.tags = ['Contacts']
  #swagger.summary = 'Update an existing contact'
*/

router.delete('/:id', contactsController.deleteContact);
/* 
  #swagger.tags = ['Contacts']
  #swagger.summary = 'Delete a contact'
*/

module.exports = router;
