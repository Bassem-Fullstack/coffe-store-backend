

const mongoose = require("mongoose")


const cartSchema = new mongoose.Schema({


user : {

 type : mongoose.Schema.Types.ObjectId, 

 ref : "User" ,
  
 required : true // نعرف اسم مستخدم او ايدي بتاع مستخدم ضاف منتج دة في كارت
 
},


items : [

   {
     
    product : {

      type : mongoose.Schema.Types.ObjectId ,

       ref : "Product" ,

       required : true  // بنجيب ايدي بتاع منتج عشان نعرف المنتج اللى مستخدم ضافة اية في كارت 
     
    //    ايتيمس دي منتجات وكمية اللى مستخدم ضافها انا حططتها في مصفوفة عشان مستخدم ممكن يضيف اكتر من منتج عشان كدة حططتها في مصفوفة
    
    } ,
   

    quantity : {
       
     type : Number ,

     default : 1 ,
     
     min : 1 // الكمية بتكون رقم والقيمة افتراضية بتاعتها 1 واقل حاجة انها متقلش عن 1 يعني متكونش صفر او سالب 

    } 


   }


],


totalPrice : {

  type : Number ,

  default : 0

} 





})


module.exports = mongoose.model("Cart" , cartSchema)