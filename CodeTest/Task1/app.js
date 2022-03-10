const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
//middleware
app.use(express.static('./public'))
app.use(express.json())
//if we don't use this we will not have our .body


//routes


app.use('/api/v1/tasks',tasks)
//tasks here is the middleware function and we are calling it using app.use(), specifying
//the middleware function

const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`listening at ${port}...`))
    } catch (error) {
      console.log(error)
    }
} //we will invoke connectDB, and then only if we are successfull then we'll spin up the server
//we use the arrow function, since i know that connectdb returns a promise, ,i can set this function async.


start()

//app.get('api/v1/tasks') - get all the tasks
//app.post('/api/v1/tasks') - create a new task
//app.get('api/v1/tasks/:id') - get single task
//app.get patch('api/v1/tasks/:id) - update task
//app.delete('/api/v1/tasks/:id) - delete task
