const { sendStatus } = require('express/lib/response');
const Message = require('../models/messages')
const http = require('http');
const express = require('express');
const socketio = require('socket.io')

const server = http.createServer(app);
const io = socketio(server);

var app = express();

const getMessages = async (req, res) => {
    try {
        const message = await Message.find({});
        res.status(200).send({message})
    }
    catch (error) {
        res.status(500).send({msg:error})
    }
}

const getUsers = async (req, res) => {
    var user = req.params.user
    Message.find({Username: username},(err, messages)=>{
        res.send(messages);
    })
}

const postMessages = async (req, res) => {
    try {
        const message = await Message.create(req.body)
        res.status(201).send({message}) 
    }
    catch (error) {
        res.status(500).send({msg: error})
    }
}

const postClientMessages = async (req, res) => {
    const message = new Message(req.body);

    const savedMessage = await message.save()
    console.log('saved');
    message.save((err) => {
        if(err)
        sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
}

module.exports = {
    getMessages, postMessages, postClientMessages, getUsers
}