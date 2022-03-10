const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    username:{
        type:String,
        reuired:[true, 'name should be provided'],
    },
    message:{
        type:String,
        required:[true, 'Write a message'],
    }
})

module.exports = mongoose.model('Message', messageSchema)

