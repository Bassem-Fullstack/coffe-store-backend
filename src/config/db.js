

const mongoose = require("mongoose")


const connectDB = async ()=> {

try{

await mongoose.connect(process.env.DB_URL)

console.log("MongoDB Connected")
}

catch(e){

console.log(e.message)

}

} 


module.exports = connectDB