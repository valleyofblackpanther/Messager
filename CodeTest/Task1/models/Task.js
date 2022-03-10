const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'must provide name'], //if i pass in a value(object) without my name property then it's
        trim: true,              //going to show some error. Or required field.
        maxlength: [20, 'name can not be more than 20 characters']   //these are validators
    },
    completed: {
        type: Boolean,
      //  default: false,
    }
}) //first schema

module.exports = mongoose.model('Task', TaskSchema)