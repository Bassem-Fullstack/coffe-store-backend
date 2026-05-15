

const dotenv = require("dotenv")

dotenv.config()

const mongoose = require("mongoose")

const User = require("../modules/User")


const Admin = async()=> {

try{

await mongoose.connect(process.env.DB_URL)

console.log("Admin Database Connected")


const AdminFound = await User.findOne({email : process.env.ADMIN_EMAIL})


if(AdminFound) {

 console.log("this admin is already existing")   

 return; // بقولوة لو ادمن مسجل عندك في داتا بيز ومخزن قيمة بتاعتة خلاص وقفلي الفونيشن دة متشغلهوش الهدف اننا نمنع تكرار تسجيل دخول بنفس الفونشين او بقيمة مختلفة عشان لمانيجي نسجل بعد كدة ميدخلنيش باسورد او ايميل ادمن كان موجود قبل كدة دة خلط اساسا الادمن لهو اميل واحد وباسورد واحد فقط
 
}




await User.create({

username : process.env.ADMIN_USERNAME , 

email : process.env.ADMIN_EMAIL , 

password : process.env.ADMIN_PASSWORD ,

role : "admin"

})

console.log("Admin created successfully")

}


catch(e){

console.log(e)

}


finally {

await mongoose.disconnect()

}

}


Admin()
