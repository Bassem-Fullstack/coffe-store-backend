
const joi = require("joi")


// ##Register

const validateRegister = (req , res , next) => {

const schema = joi.object({

username: joi.string().min(3).required(),

email : joi.string().email().lowercase().required(),

password: joi.string().min(8).required()


})

const {error} = schema.validate(req.body)

// {error} دة خاصية موجودة في جوي وظيفتة يطلعلك بس الارورر موجود لما يتأكد بيانات مش مظبوطة

if(error){

return res.status(400).send(error.details[0].message)

}

next()

} 
 
///////////////////////////////////////////////// 

// ##Login

const validateLogin = (req , res , next) => {

const schema = joi.object({

email : joi.string().email().lowercase().required() ,

password: joi.string().required()

})


const {error} = schema.validate(req.body)

if(error) {

return res.status(400).send(error.details[0].message)

}

next()

}

///////////////////////////////////

// ## update username or password or email

// لية عامل جوي لاكتر من روت عشان كل روت لها احداث مختلفة عن قبلها وعندك حدث تحديث دة اختياري مش اجباري وريجيستر لازم باسورد وايميل ويوسير نيم اجباري ويكون تمن ارقام لوجين احنا بنسجل ايميل فقط مش محتاجين يوسير نيم في حاجة وفي تحديث بيانات مش عايزينها اجباري احنا عايزينها اختياري وقت ما مستخدم يحب


const validateUpdate = (req , res , next) => {


const schema = joi.object({

username : joi.string().min(3) ,

email : joi.string().lowercase().email() ,

password : joi.string().min(8)

}).min(1) // min(1) هنا بقولوة حدثلي قيمة واحدة على اقل سواء الاميل او الباسورد او يوسير نيم الهدف من كدة ان هو ميرجعليش اوبجكيت الفاضي


const {error} = schema.validate(req.body)

if(error) {

return res.status(400).send(error.details[0].message)

}

next()

} 












module.exports = { validateRegister , validateLogin , validateUpdate }


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