const express = require('express');
const router = express.Router();
const validator = require('../validation-middleware');

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', validator.cleanContact, contactsController.createContact);

router.put('/:id', validator.cleanContact, contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;
