
const User = require("../modules/User")

const jwt = require("jsonwebtoken")

const bcryptjs = require("bcryptjs")

const cloudinary = require ("cloudinary").v2

const asyncHanlder = require("express-async-handler")

// ## Register

const registerUser = async ( req , res ) => {


try{

   const existUser = await User.findOne({email : req.body.email})
 
   if(existUser){

     return res.status(400).send("User is alredy exist")

   }

    const user = new User(req.body)
   
    await user.save()

     user.password = undefined

    res.status(201).send(user)
     


}


catch(e){

    res.status(400).send(e.message)

}

}



// ###Login

const loginUser = async (req , res) => {

try{

// const { email , password } = req.body

// انا كتبتهم بشكل فوق دة عشان اختصروة مش اكتر ولا اقل

// const email = req.body.email

// const password = req.body.password


 const email = req.body.email.trim()

 const password = req.body.password.trim()

const getUser = await User.findOne({email})


if(!getUser){
 
    return res.status(400).send("Invalid Login email")
}



const isMatch = await bcryptjs.compare(password , getUser.password)



if(!isMatch){
 
    return res.status(400).send("Invalid Login password")
}



const token = jwt.sign(

  {id : getUser._id   , role :getUser.role} , 
  
  process.env.JWT_SECRET ,

  {expiresIn : "7d"}


)

getUser.tokens.push(token) // tokens دة جاي من موديل بقولوة خزنلي توكين مستخدم دة في موديل وبعد كدة سيف احفظة

await getUser.save()

res.status(200).send(

    {

     user : { id : getUser._id  , email:getUser.email , username : getUser.username , role : getUser.role},
     
     token 
    
    }
   

)

}



catch(e){

res.status(500).send(e.message)

}


} 


// ## profile

const profile =  async( req , res) => {

req.user.password = undefined

req.user.tokens = undefined

res.status(200).send(req.user)    



}


// ## uploadImages 


const uploadImages = asyncHanlder(async (req , res)=> {


// في مشكلة بتقابلنا وهو ان المستخدم لو عايز يعدل او يحذف صورة طبعا روحنا هناك خزنت بابليك ايدي و دة مسار الصورة على موقع عشان ننحذف صورة ومتتخزنش بزيادة لو مستخدم عدل صورة او حذف صورة

if(!req.file){
  return res.status(400).send("Pleas Upload Image") //في حالة ملف متبعتش او مستخدم مرفعش صورة او فايل مش موجود عادي يظهر رسالة صغيرة كدة بعد اذنك ارفع صورة مجرد تشيك بسيط
}

if(req.user.avatar?.public_id){

await cloudinary.uploader.destroy(req.user.avatar.public_id) 

// uploader خاصية مسؤلة عن الحذف او اضافة او تعديل صورة

// destroy بقولوة احذفلي الصورة 

// (req.user.avatar.public_id) دي داتا بتاعت الاوس بقولوة في ديكومنت اسمها افاتار جواها بابيليك ايدي احذفلي الصورة في حالة مستخدم حذف او عدل صورة دة الايدي نحذف منها صورة لان في موقع بتخزن بأيدي كل صورة

// public_id دي مفتاح سري بتاع كيلودرنري يساعدنا نحذف او نعدل او نضيف صورة على موقع كيلودرنري


}


// (req.user.avatar?.public_id)  دة معناها لو ملقتش بابليك ايدي في سكيما طلعلي اند فاينت كمان بستخدمها كحماية يعني كأني بقولوة لو في صورة احذفها مفيش صورة سيب كل حاجة زاي ماهي متعمليش ايرورر دة هدف من علامة استفهمام بتدل على تغير اختياري بمعني ان لو شرط دة مش موجود متكسرش الكود كمل لو موجود نفذة لو من غير علامة استفهام صورة مش موجودة هيضربلك ارورر عشان كدة علامة استفهمام بتحمي فونشين لو فيها ارورر وتطلعلي انديفينت من غير ماتضربلك ارورر 


 // بقولوة الصورة هتجيلك من ميلتر باكيج خزنهولي في داتا بيز لينك صورة خزنهو في داتا بيز


// req.file.path دة مسار الصورة خاصية في مليتر وفي ستوريج بتتحددة لما بتكون بتجيب من صورة موقع معين او سيرفر

// req.file.diskstorge دة لو هتجيب صورة من جهازك شخصي محلي

req.user.avatar = {

 url : req.file.path , // دة مسار الصورة في كيلودرنري

 public_id : req.file.filename // دة رقم الايدي بتاع كل صورة في كيلودرنري برضو

}



await req.user.save() // بسيف الصورة بعد ما حملتها وقولتلوة ابعتلي الرد ان صورة تحملت ومسار الصورة

res.status(200).send({

message : "Image Uploaded" ,

avatar : req.user.avatar

})

})












// ## logout

const logout = async (req , res) => {

try{

await User.updateOne(

// احنا عايزين نجيب الايدي بتاع مستخدم عشان نعدل علية ونحذف توكين بتاعة في حالة الخروج لو خرج من صفحة طبعا بعد ماخزنة التوكين في داتا بيز عن طريق لوجين

{_id : req.user._id} ,

{ $pull:{tokens : req.token}}

// $pull دي خاصية في مونجو ديبي وظيفتها انها تحذف اي حاجة هنا انا بحذف توكين بعد ما المستخدم سجل خروج


)  

 res.status(200).send({ message: "Logged out successfully" })

}


catch(e){
res.status(500).send(e.message)

}

}




// ## updateUser

const updateUser = async (req , res)=> {

try{

const currentUser  = await User.findById(req.user._id) // auth بتاع الاوس مخزنين فية توكين الايدي هناك

if(!currentUser){

return res.status(404).send("User not found") 

}

if(req.body.username){

  currentUser.username = req.body.username  

}


if(req.body.email){

// في الاميل عايزين نمنع تكرار نفس مستخدم يعني انا حدثت ايميل جديد لما اجي احدثة لكن مفيش مشكلة لو يوسير نيم  او باسورد اتكرر لكن الاميل مستخدم ممنوع ان هو يكرر حتي لو لاحظت هناك في موديل قايلوة فريد الفكرة ان الاميل دة رغم انك في موديل قايلوة خليها فريد بس ممكن هنا تحديث لما تيجي تحدث بيانات هيلاقي نفس اميل دة مستخدم تاني مستخدم نفس ايميل يحصل لخبطة هنا بقي بنمع تكرار نفس الايميل لما يجي تتحدث في حالة لو متخزن عندي

const getuser = await User.findOne({ email : req.body.email })

if (getuser && getuser._id.toString()!== req.user._id.toString()){

 return res.status(400).send("This Eamil is alredy existing")

// هنا فوق كتبت شرطين مع بعض بقولوة لو جيت يوسير شايل قيمة شايل ايميل وكمان الايدي بتاعها مش بيساوي نفس الايدي يعني مش مطابقين قولي ان مستخدم دة موجود فعلا الفكرة اننا نمنع تكرار الاميل بقولوة لو يوسير دة شايل نفس الاميل وبيانات ومتخزنة في مونجو ديبي احذفة متضيفهوش قالتلوة ميساويس الايدي اللى مستخدم دخلة في لوجين ومتخزن في توكين بالايدي بتاع المستخدم متخزن عندي الداتا بيز الفكرة اننا نمنع تكرار اميل فقط في تحديث   

// const getuser = await User.findOne({ email : req.body.email }) هو هنا مش جايبلي الاميل بس لاء دة جايبلي كل بيانات مستخدم ديكومينت في مونجو ديبي عشان كدة استخدمت الايدي في سطر بعدة


}


currentUser.email = req.body.email

}


if(req.body.password){

 currentUser.password = await bcryptjs.hash(req.body.password , 10)   

}


await currentUser .save()

currentUser.password = undefined

res.status(200).send(currentUser )

}


catch(e){
res.status(400).send(e.message)

}

}







module.exports =  { registerUser , loginUser , profile , logout , updateUser , uploadImages}