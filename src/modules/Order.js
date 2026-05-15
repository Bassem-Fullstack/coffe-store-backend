

const mongoose = require("mongoose")



const OrderSchema = mongoose.Schema( {



user : {

 type : mongoose.Schema.Types.ObjectId, 

 ref : "User" ,
  
 required : true 
 
},


items : [

   {
     
    product : {

      type : mongoose.Schema.Types.ObjectId ,

       ref : "Product" ,

       required : true  
    //    ايتيمس دي منتجات وكمية اللى مستخدم ضافها انا حططتها في مصفوفة عشان مستخدم ممكن يضيف اكتر من منتج عشان كدة حططتها في مصفوفة
    
    } ,
   

    quantity : {
       
     type : Number ,

     default : 1 ,
     
     min : 1 , // الكمية بتكون رقم والقيمة افتراضية بتاعتها 1 واقل حاجة انها متقلش عن 1 يعني متكونش صفر او سالب 

     required : true 

    } , 
    
    price : {

      type : Number ,

      required : true
    }
  
   }


],


totalPrice : {

  type : Number ,

  required : true ,
  
  min: 0


},


status : {

  type : String , 

  enum : [ "pending" , "processing" , "shipped" , "delivered" , "cancelled"] ,
  
  default : "pending"

},


paymentStatus : {

type : String , 

enum : [ "pending" , "paid" , "failed" ] ,

default : "pending"


} ,


paymentMethod : {

 type : String , 

 enum : ["cash" , "card"] ,

 default : "cash"
  

} , 

shippingAddress : {

    city : {

     type : String ,

     required : true ,
     
      trim : true

    } ,

    phone : {

    type : String ,

    required : true ,

    trim : true

    } ,


    street : {
    
      type : String ,

      required : true ,
      
       trim : true

    }


}

},

{
  timestamps : true
}


)



module.exports = mongoose.model("Order" , OrderSchema  )


