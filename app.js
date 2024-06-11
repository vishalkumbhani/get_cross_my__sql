require('dotenv').config();
const express = require('express');
const app = express();

const connection = require('./config/connection');
const noticeboardroutes = require('./routes/noticeboards');
const helpdeskroutes = require('./routes/helpdesk');
const eventroutes = require('./routes/event');
const userroutes = require('./routes/user');
const contactroutes = require('./routes/contact');

//app settings
app.use(express.json());

//routes
app.use('/notice', noticeboardroutes);
app.use('/category', helpdeskroutes);
app.use('/event', eventroutes);
app.use('/user', userroutes);
app.use('/contact', contactroutes);

connection.connect((err, result) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("database connected");
    }
})
app.listen(process.env.PORT, () => { console.log("Port connected") });
