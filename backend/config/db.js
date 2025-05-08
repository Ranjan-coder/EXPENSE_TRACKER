const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI


const connectDB = async()=>{
    try {
        const ConnectionInstance = await mongoose.connect(`${MONGO_URI}`)
        if(ConnectionInstance){
            console.log("MONGODB CONNECTED");
            
        }
        
    } catch (error) {
        console.log(`Error Connecting to MongoDb : ${error}`)
        
    }

}
module.exports = connectDB