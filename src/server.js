
// هنبدأ نشغل مشروع هنا في سيرفر اساسي تمام دة الابلكيشن شايل كل حاجة


const dotenv = require("dotenv")

dotenv.config() // هنا انا بقولوة اقراءلي الملف دة اللى انا هحط فية القيم حساسية زاي باسورد او بيانات حساسة او توكين الفكرة اني بعمل ملف ونقفل علية عشان محدش يوصل للبيانات مشروع سواء من جيت اب او اياكان




const cors = require("cors")

const express = require("express")

const app = express()


const connectDB = require("../src/config/db")

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json()) // دة عشان سيرفر يعرف يقرأ بيانات بتاعتنا ونعرفة ان بيانات دي جيسون 




app.get("/" , (req , res) => {

res.send("API is working well")


})



const UserRouters = require("../src/routes/userRouters")

app.use( "/users" , UserRouters)


//////////////////////////////////////////////////////////////// 

const categoriesRouters = require("../src/routes/categoryRouters")

app.use("/categories" , categoriesRouters)



///////////////////////////////////////////////////////////////////////////////// 

const ProductsRouters = require("../src/routes/ProuductsRouters")

app.use("/products" , ProductsRouters )


///////////////////////////////////////////////////////////////////////////////

const CartRouters = require("../src/routes/CartRouters")


app.use("/cart" , CartRouters)


///////////////////////////////////////////////////////////////////////


const OrderRouters = require("../src/routes/OrederRouters")


app.use("/order" , OrderRouters )




const startServer = async () => {

try{  

await connectDB()

console.log("DB Connected")

// const Port = process.env.PORT || 5000 


// if(process.env.NODE_ENV !=="production"){

// app.listen(Port , ()=> {

// console.log("server is working well" + Port)

// })}

}

catch (err) {
  console.log(err.message)
  process.exit(1)
}

}

startServer()

// Production دة تبع فيركل هو بياخدة ويظبطوة ويعملك سيرفر من عندة 

// !== Production بقولوة لو سيرفر بتاعي مش شغال على بروديكشن شغلي موقع على سيرفر بتاعي


module.exports = app







