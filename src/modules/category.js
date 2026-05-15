

const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema ({

name : {

  type : String , 

  unique : true ,

  trim : true ,
   
  required : true

}, 

// اسم منتج ولازم يكون في  منتج اجباري عشان مينفعش يرجعلنا منتج فاضي من غير اسم ونلغي مسافة ونلغي تكرار


image : {

    url : String ,
    
    public_id : String
},


createdBy : {

 type : mongoose.Schema.Types.ObjectId ,
 
  ref : "User"

}



})


const Category = mongoose.model("Category" , categorySchema)

module.exports = Category
