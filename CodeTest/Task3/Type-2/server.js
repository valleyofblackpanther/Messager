const { Socket } = require('socket.io');

const mongo = require('mongodb').MongoClient;
const client = require('socket.io')(4000);

//Connect to mongo 
mongo.connect('mongodb://127.0.0.1/mongochat', function(err, db){
   // if(err){
     //   throw new err;
    //}

    console.log('MongoDB connected...'); 

    //connect to Socket.io
    client.on('connection', function(socket){
    let chat = db.collection('chats');
    
    //create function to send status
    sendStatus = function(s){
       socket.emit('status', s);
    }

    //get chats from mongo collection
    chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
        try {
       socket.emit('output', res);
        }
        catch (error){
        console.log({msg: error});
        }
    });
    //handle input events 
    socket.on('input', function(data){
     let name = data.name;
     let message = data.message;

     //check for name and message
     if(name == '' || message == ''){
         //send error status
         sendStatus('Please enter a name and message');
     } else {
        //insert message
        chat.insert({name: name, message: message}, function(){
            client.emit('output', [data]);

            //send status object 
            sendStatus({
                message: 'Message sent',
                clear: true
            });
        });
     }
    });
    //handle clear 
    socket.on('clear', function(data){
        //remove all chats from collection
        chat.remove({}, function(){
            //emit cleared
            socket.emit('cleared'); 
        });
    });

    });
});