const express = require('express');
const contactroutes = express.Router();

const {
    InsertContacts,
    UpdateContacts,
    GetAllContacts,
    GetSingleContacts,
    DeleteContacts,
    GetAllContactsByCategory,
    SearchContacts } = require('../controllar/contact');

contactroutes.post('/', InsertContacts);
contactroutes.patch('/:id', UpdateContacts);
contactroutes.get('/', GetAllContacts);
contactroutes.get('/:id', GetSingleContacts);
contactroutes.delete('/:id', DeleteContacts);
contactroutes.get('/contact/category', GetAllContactsByCategory);
contactroutes.get('/search/contact', SearchContacts);

module.exports = contactroutes;