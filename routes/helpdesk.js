const express = require('express');
const helpdeskroutes = express.Router();
const helpdeskimage = require('../middleware/helpdeskimage');
const {
    InsertCategory,
    UpdateCategory,
    GetAllCategory,
    GetSingleCategory,
    DeleteCategory } = require('../controllar/helpdesk')


helpdeskroutes.post('/', helpdeskimage.single('categoryimage'), InsertCategory);
helpdeskroutes.patch('/:id', helpdeskimage.single('categoryimage'), UpdateCategory);
helpdeskroutes.get('/', GetAllCategory);
helpdeskroutes.get('/:id', GetSingleCategory);
helpdeskroutes.delete('/:id', DeleteCategory);

module.exports = helpdeskroutes;
