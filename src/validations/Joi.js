
const joi = require("joi")


// ##Register



const registerUser = joi.object({

username : joi.string().required().min(3).max(35).trim().messages({


"string.empty" : "Username must not be empty" ,

"any.required" : "Username is required" ,

"string.min": "Username must be at least 3 characters",


}),


email :joi.string().email().required().trim().lowercase().messages({


 "string.empty" : "Email must not be epmty" ,
 
 "any.required" : "Email is required" ,

"string.email": "Please enter a valid email address",

}) ,


password : joi.string().required().trim().pattern(new RegExp(("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")))

.messages({

"string.empty" : "Password must not be empty" ,

"string.pattern.base": "Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters (@$!%*?&)" ,

"any.required" : "Password is required" 

})


})


 
///////////////////////////////////////////////// 

// ##Login


const loginUser = joi.object({


email :joi.string().email().required().trim().lowercase().messages({


 "string.empty" : "Email must not be epmty" ,
 
 "any.required" : "Email is required" ,

"string.email": "Please enter a valid email address",

}) ,


password : joi.string().required().trim().pattern(new RegExp(("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")))

.messages({

"string.empty" : "Password must not be empty" ,

"string.pattern.base": "Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters (@$!%*?&)" ,

"any.required" : "Password is required" 

})


})






module.exports = { registerUser , loginUser }


// joi بيخزن بيانات بتاعتك كدة عشان كدة كتبنا الارورر اول متغير ثم بعد كدة في الشرط ايف كتبنها بطريقة عادية اوبجكيت في اوبجكيت جواة اريية 

// {
//   error: {
//     details: [
//       {
//         message: "username too short"
//       }
//     ]
//   }
// }