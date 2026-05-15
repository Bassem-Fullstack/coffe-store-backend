

const joi = require("joi")



const productSchema = joi.object({

name : joi.string().min(1).required() ,

description : joi.string().allow("").optional(),

price : joi.number().positive().precision(2).required() ,

stock : joi.number().positive().integer().min(0).optional(),

category : joi.string().required() ,

size : joi.string().optional()

})

// .positive().precision(2) دة معناها ان رقم بعد كسر يكون رقمين وان رقم يكون ايجابي موجب مش سالب

// integer() يعني رقم صحيح


module.exports = productSchema


// نت كده بتعمل Schema (قواعد)
