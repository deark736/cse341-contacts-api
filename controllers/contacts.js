// controllers/contacts.js
const mongodb = require('../data/db');
const { ObjectId } = require('mongodb');

const REQUIRED = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];
const hasAllFields = (body) => REQUIRED.every((k) => body?.[k]);

// Get all contacts from the database
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();
    const contacts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving contacts' });
  }
};

// Get a single contact by its ID
const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId });
    const contact = await result.toArray();

    if (!contact.length) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid ID format' });
  }
};

// POST /contacts  -> create
const createContact = async (req, res) => {
  try {
    if (!hasAllFields(req.body)) {
      return res.status(400).json({ message: 'All fields are required', required: REQUIRED });
    }

    const doc = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday, // keep as string unless you want Date
    };

    const result = await mongodb.getDb().db().collection('contacts').insertOne(doc);

    return res
      .status(201)
      .location(`/contacts/${result.insertedId}`)
      .json({ id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating contact' });
  }
};

// PUT /contacts/:id  -> update
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID format' });

    if (!hasAllFields(req.body)) {
      return res.status(400).json({ message: 'All fields are required', required: REQUIRED });
    }

    const updateDoc = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
      },
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .updateOne({ _id: new ObjectId(id) }, updateDoc);

    if (result.matchedCount === 0) return res.status(404).json({ message: 'Contact not found' });

    return res.sendStatus(204); // success, no body
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating contact' });
  }
};

// DELETE /contacts/:id  -> delete
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID format' });

    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) return res.status(404).json({ message: 'Contact not found' });

    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting contact' });
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
