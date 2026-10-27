


const mongoose = require("mongoose")


const connectDB = async ( ) => {

try {

await mongoose.connect(process.env.DB_URL)

console.log(" MongoDB already Connected ")

}

catch(err) {

console.log("MongoDB doesn't connect")

}


}


module.exports = connectDB
