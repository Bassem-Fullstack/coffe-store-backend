


const mongoose = require("mongoose")



const productSchema = mongoose.Schema({

name : {

type : String ,

required: true,

trim : true

},


description : {
 
    type:String ,

    required : true,

     trim: true

} ,



price: {

 type : Number , 

 required : true ,

 min: 1

},

images : [ { 
  
    url : String ,

    public_id : String

} ] ,

size : {

  type : String , 

  enum : ["small" , "medium" , "large"]

},


category : {

 type: mongoose.Schema.Types.ObjectId ,

 ref : "Category" ,
 
 required : true

} ,

createdBy : {

 type : mongoose.Schema.Types.ObjectId ,

 ref : "User" ,

 required : true

},

stock: {
  
 type: Number,

 default: 0,
 
  min: 0

}

})




module.exports = mongoose.model("Product" , productSchema)




































































