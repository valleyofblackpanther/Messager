require('dotenv').config() /*for thhe access to the environment variables so that i can connect to database.*/ 
const connectDB = require('./db/connect')
const http = require('http');
const socketio = require('socket.io');
var bodyParser = require('body-parser')
const server = http.createServer(app);
const io = socketio(server);

var express = require('express');
var app = express();
const message = require('./routes/route')


/*var server = app.listen(3000, () => {
    console.log('Server is running on port', server.address().port);
})*/

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
//routes
app.get('/api/chatbot',message)

//socket conneection
io.on("connection", () =>{
    console.log("User Connected")
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