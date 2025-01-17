const express = require('express'); 
const { createContact, getAllContacts, getSingleContact } = require('../controllers/contactController.js');
const { verifyAdmin } = require('../utils/verifyToken.js');


const contactRoute = express.Router();

contactRoute.route('/')
    .post(createContact)
    .get(verifyAdmin, getAllContacts);

contactRoute.get('/:id', verifyAdmin, getSingleContact);

module.exports = contactRoute;
