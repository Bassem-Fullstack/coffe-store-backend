

const mongoose = require("mongoose")

const validator = require("validator")

const bcryptjs = require("bcryptjs")

const userSchema = new mongoose.Schema({ 

username : {

  type:String ,
  
  required : true ,

  trim : true

},

email : {

   type:String ,

   required : true ,

   lowercase : true ,
   
   trim : true ,

   unique : true ,
   
   validate(value){
   
   if(!validator.isEmail(value)){

     throw new Error("Email is Invalid")

   }

   }


},

password : {
 
    type : String , 

    trim : true ,

    required:true ,

    minlength : 8 , 

   validate(value){

   const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
   
   if(!strongPassword.test(value)){
     
     throw new Error ("Password must contain uppercase, lowercase, number, and special character")
   }

   }
    

}, 

tokens : [

{
  type : String , 

  default : []
 
}

],

avatar : {
  
 url : {
      type:String  // دة لينك يو ار ال مسار الصورة بروفايل

 },


 public_id : {
   type :String // دة عشان لو مستخدم هيعدل او يحذف صورة من كيلودرنري لان خاصية بتاع كيلودرنري بتتكتب كدة عشان منملاش مساحة ع فاضي
 }

} ,

role : {

  type : String ,

  enum : ["admin" , "user"] , // هنا بقولوة اعملي حدود يعني لو مستخدم مدخلهوش صفحة ابدي ولو ادمن خليها يعمل اللي هو عايزة في موقع لكن مستخدم من حقة بس يشوف موقع يجيب صورة لمنتج او دتا منتج لكن مش من حقة يعدل او يحذف بيانات موقع

  default : "user" // لو مفيش رول يعني متحددتش دة هوية مين خلية تلقائي يوسير
}


})

userSchema.pre("save" , async function (){


const user = this // this هنا بتعود على ديكومنت داتا بيز متخزنة زيز في باك اند عموما بتعود على


if(user.isModified("password")){

 user.password = await bcryptjs.hash( user.password, 10) 

}


})





module.exports = mongoose.model("User" , userSchema)

