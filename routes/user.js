const express = require('express');
const userroutes = express.Router();
const authtoken = require('../middleware/authtoken');

const {
    InsertUser,
    UpdateUser,
    GetAllUser,
    GetSingleUser,
    DeleteUser,
    ChangePasswordOfUserById,
    ChangePasswordOfUserByToken,
    RegisterUser,
    LoginUser,
    GetUserProfileBYAuthrozation,
    SearchUsers } = require('../controllar/user');

userroutes.post('/', InsertUser)
userroutes.patch('/:id', UpdateUser)
userroutes.get('/', GetAllUser)
userroutes.get('/:id', GetSingleUser)
userroutes.delete('/:id', DeleteUser)
userroutes.patch('/change/password/:id', ChangePasswordOfUserById)
userroutes.patch('/token/password', authtoken, ChangePasswordOfUserByToken)
userroutes.post('/register', RegisterUser)
userroutes.post('/login', LoginUser)
userroutes.get('/by/Authrozation', authtoken, GetUserProfileBYAuthrozation)
userroutes.get('/search/users', SearchUsers)

module.exports = userroutes;