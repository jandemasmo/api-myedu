const mongoose = require("mongoose");

const connect = async () =>{
    try {
       await  mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Conectado ao mongoDB`)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {connect};