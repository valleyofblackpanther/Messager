require('dotenv').config()
const faker = require("faker")
const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const model = require('./models/schema')

app.get("/insertdata", async (req, res) => {
    let data = []
    for (let i = 0; i < 100; i++) {
      let record = {
        name: faker.name.findName(),
        email: faker.internet.email()
      }
      data.push(record)
    }
   
})


const port = process.env.PORT  || 3000

const start = async () => {
    try{
     //connectDB
     await connectDB(process.env.MONGO_URI)
     app.listen(port, console.log(`Server is listening ${port}...`))
    }
    catch(error){
    console.log(error)
    }
}

start() 
