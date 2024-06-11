const express = require('express');
const eventroutes = express.Router();
const eventimage = require('../middleware/eventimage');
const {
    InsertEvent,
    UpdateEvent,
    GetAllEvent,
    GetSingleEvent,
    DeleteEvent,
    ChangeEventStatus } = require('../controllar/event');

eventroutes.post('/', eventimage.single('eventimage'), InsertEvent)
eventroutes.patch('/:id', eventimage.single('eventimage'), UpdateEvent)
eventroutes.get('/', GetAllEvent)
eventroutes.get('/:id', GetSingleEvent)
eventroutes.delete('/:id', DeleteEvent)
eventroutes.patch('/change/:id', ChangeEventStatus)

module.exports = eventroutes;