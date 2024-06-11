const express = require('express');
const noticeboardroutes = express.Router();
const { InsertNoticeBoards,
    UpadateNoticeBoards,
    GetAlltNoticeBoards,
    GetSingletNoticeBoards,
    DeletetNoticeBoards } = require('../controllar/noticeboards');

noticeboardroutes.post('/', InsertNoticeBoards)
noticeboardroutes.patch('/:id', UpadateNoticeBoards)
noticeboardroutes.get('/', GetAlltNoticeBoards)
noticeboardroutes.get('/:id', GetSingletNoticeBoards)
noticeboardroutes.delete('/:id', DeletetNoticeBoards)

module.exports = noticeboardroutes