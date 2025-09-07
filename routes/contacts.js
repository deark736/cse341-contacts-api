// routes/contacts.js

const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts'); // Controller with DB logic

// GET all contacts
router.get('/', contactsController.getAll);

// GET a single contact by ID
router.get('/:id', contactsController.getSingle);

module.exports = router;
