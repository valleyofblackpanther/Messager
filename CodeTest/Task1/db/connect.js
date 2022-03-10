const mongoose = require('mongoose')



const connectDB = (url) => {
return mongoose
.connect(url)

}

//we are trying to pass the env value from app.js


module.exports = connectDB