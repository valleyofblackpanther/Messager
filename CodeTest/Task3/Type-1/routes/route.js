const express = require('express');
const router = express.Router()

const { getMessages, postMessages, postClientMessages, getUsers } = require('../controllers/chat')

router.route('/messages').get(getMessages).post(postMessages).post(postClientMessages)