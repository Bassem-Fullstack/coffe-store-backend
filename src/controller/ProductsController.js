

const Product = require("../modules/Products")

const cloudinary = require("../config/cloudinary")

const Category = require("../modules/category")

const mongoose = require("mongoose") 

// ###createProduct 


const createProduct = async ( req , res) => {

try{

// احنا عندنا اكتر من حقل في موديل وتفاصيل منتجات دي كتيرة فطبيعي نبدأها كدة في كريت منتجات


const{ name , description , price , size ,category , stock } = req.body       



// انا كتبتلوة متغيرات عشان نحفظها في داتا بيز في حقول عندنا موديل بحيث لو مستخدم دخل قيمة مش موجودة في المتغير او في حقول الموديل هيتجاهلها ومش هيشوفهم الفكرة انا حاططتهم كلهم في اوبجكيت بدل ما اروح اعمل كدة لكل متغير بص تحتيك مزعجين اوي عشان كدة كتبتهم بالمنظر دة 

// const name = req.body.name
// const description = req.body.description
// const price = req.body.price
// const size = req.body.size
// const category = req.body.category
// const stock = req.body.stock


// const images = []

// if (req.files){
// for (let img of req.files){

  
// const reuslt = await cloudinary.uploader.upload(img.path) 

  
// images.push({

// url : reuslt.secure_url ,

// public_id : reuslt.public_id

// })}}


// await Promise.all معناها استنا ان كل عمليات دي تخلص يعني كل صور تتحمل ورجعهالي كلهم في مصفوفة هي اصلا بترجع مصفوفة تلقائي

const images = req.files? await Promise.all(

 req.files.map(async (img)=> {

  const result = await cloudinary.uploader.upload(img.path)

  return {
    
    url : result.secure_url,

    public_id : result.public_id

  }

 })   

):[] // احنا بنعمل حماية زيادة لو مستخدم بعت بياناتة وبيانات المنتج من صورة يطبعلنا مصفوفة فاضية عادي عشان خاطر ميضربش ارورر بقولوة لو مبعتش صورة وبعت بيانات منتج وبياتاتة اطبعلي مصفوفة فاضية عشان مضربش ارورر


const product = await Product.create({

name,  // انا كتبت شورت هاند بدل ما اروح اقولوة نيم = ريجوسيت بادي نيم عشان كدة استخدمت شورت هاند

description,

price , 

size, 

category, 

stock, 

images,

createdBy : req.user._id // دة جاي من الاوس اليوسير اللى دخل بعد لوجين

})


res.status(201).send(product)


}


catch(e){

 res.status(500).send(e.message)   

}

}


//////////////////////////////////////////////////////////////////// 


// ###getAllProducts 


const getAllProducts = async(req , res) => {

try{

const filter = {} // احنا عايزينوة ميجبش كل منتجات احنا عايزينوة يجيب كل منتجات ع حسب الفئة يعني انا مثلا في فئة ملابس ميديم يجبلي كل ملابس ميديم مش يجبلي معاها اوفر سايز او لاسمول دة الهدف من فلتر

if(req.query.category){
  
 filter.category = new mongoose.Types.ObjectId(req.query.category)
 
// const res = await fetch(`${Base_URL}/products?category=${categoryId}`) // الفكرة ببساطة بناخد الايدي بتاع فئة عشان نقدر من خلالها نعرض منتجات بتاعنا

//   المستخدم ضغط على فئة منتج الايدي بتاع فئة منتج اللى مكتوبة في شريط بحث الفروند هيبعتها للباك اند هيقارنهم مع بعض لو لاقهم متساويين هيعرض منتجات بتاع فئة دة و دة الحصل لما مستخدم ضغط على فئة هوت كافية عرضلة منتجات بتاعتها

}

// req.query.category دة اسم فئة انت بتكتبوة عادي من عشوائي دي جاية من بحث شريط بحث كلمة كويري دي اللى هي في يو ار ال فوق في شريط بحث بقولوة بعد كويري اكتب كلمة فئة 


if(req.query.user) {

  filter.createdBy = new mongoose.Types.ObjectId(req.query.user)

// عايز في شريط بحث فوق في كويري يظهرلي الفئة واسم مستخدم 

}

if (req.query.search){

filter.name = {$regex: req.query.search , $options:"i"}

// فيلتر بقولوة في شريط بحث لما مستخدم يبحث عن منتج معين يظهرلوة اسم منتج يعني كدة هيظهر ايدي مستخدم ثم فئة منتج ثم اسم منتج بيبحث علية 

}


if(req.query.min || req.query.max){

// price احنا بنقول في شريط بحث مش عايزين نبعت رقم بظبط انما احنا عايزين نبعت رقم بظبط او رقم او سعر يكون قريب من سعر المنتج يعني مثلا سعر منتج عندي 300ج وانا عندي هنا حاطط الشرط بتاعي مابين 100 لحد 500 الهدف من الكود دة يفلتري اسعار لوحدها لان اسعار بتتغير وكمان يجبلي اقرب رقم يكون مدى من يعني يكون قريب من سعر يعني مثلا سعر كوباية قهوة 300ج المستخدم بيحث عن سعر قهوة 500 هنقوم نعرضلوة ابو 100 او ابو 200 وابو 300 وابو500 سعر بتاعة


filter.price = {}


if(req.query.min){

filter.price.$gte = Number(req.query.min)

}

// خليناهم رقم عشان خاطر اللي بيجي من شريط بحث بيكون على شكل نص فقولت نحولها رقم

if(req.query.max){

filter.price.$lte = Number(req.query.max)

}



}




const everyProducts = await Product.find(filter).populate("category").

populate("createdBy" , "username email role")

if(everyProducts.length===0){

return res.status(404).send("Products Not Found")

}

// if(!everyProducts) خاصية الفايند هترجعلك مصفوفة فاضية مفيهاش منتج يعني شرط دة صح بس فكرة هيرجعلك مصفوفة فاضية مفيهاش منتج عشان كدة كتبت فوق شرط غيرة فهمت


res.status(200).send(everyProducts)


}  
 
 

catch(e){

 res.status(500).send(e.message)   

}

}

/////////////////////////////////////////////////////////////// 


// ### getProductById 


const getProductById = async(req , res) => {

try{

const _id = req.params.id

const getProduct = await Product.findById(_id).populate("category")

.populate("createdBy" , "username email role")


if(!getProduct){

  return res.status(404).send("Product Not Found") 

}


res.status(200).send(getProduct)



}

catch(e){

 res.status(500).send(e.message)

}

}


/////////////////////////////////////////////////////////////////////////////


// ### getCategoriesLimitProducts 


const getCategoriesLimitProducts = async(req , res) => {

try{

const categories = await Category.find({})


const getData = await Promise.all (

categories.map( async(everyItem)=> {

const products = await Product.find({ category : everyItem._id })

.limit(2).populate("category").populate("createdBy" , "username email role")

return {

 category : everyItem , // اعرضلي الفئة وتفاصيلها ومعاها المنتجات الخاصة بها الخاص بالفئة دي

 products 

}

// هل الايدي في فئة بتاع كل منتج دة متخزن في موديل فئات هو هو نفس الايدي بتاع فئة متخزنة في بروديكتس

// لو نفس الايدي هيرجعلك المنتجات بتاع فئات دي على طول بس انا هنا عامل فونشين دي مخصوص عشان يرجعلي منتجين من كل فئة فأنا هحددلوة اقولوة عايز اتنين بس منتجين من كل فئة وكمان رجعلي تفاصيل المستخدم اليوسير نيم والاميل بتاعة ورجعلي تفاصيل فئات كلها عناصر بتاعتها كل متخزنة في كوليكشن

// في اخر رجعلي اعرضلي بقي كل فئة في اوبجيكت لوحدها ومعاها منتجاتها زاي كدة بص تحتك

// [ find & map الماب والفايند بيرجع مصفوفة في اخر يعني اول حاجة دي مصفوفة كتيرجي وبروديكتس وتاني مصفوفة بتاع فايند دي بترجع منتجات المنتجات دي عبارة عن اوبجكيتات متخزنة جوة مصفوفة اللى هي مصفوفة فايند
//   {
//     category: {...},
//     products: [...]
//   },
//   {
//     category: {...},
//     products: [...]
//   }
// ]

})
  
)


res.status(200).send(getData)

}


catch(e){

res.status(500).send(e.message)

}


}





///////////////////////////////////////////////////////////////////////////////

// ### updateProduct 


const updateProduct = async(req , res) => {

try {

const _id = req.params.id 


const getProduct = await Product.findById(_id) // كدة مسكت منتج عايز يتعدل


if(!getProduct){

return res.status(404).send("Product Not Found")

}


const allowedFields  = ["name" , "price" , "description" , "size"  , "category" , "stock"]

const update = Object.keys(req.body)

update.forEach((key) => {

if(allowedFields.includes(key)){

if(key === "price" || key === "stock"){

getProduct[key] = Number(req.body[key])

}

else{

getProduct[key] = req.body[key] // بقولوة لو مصفوفة عندك بتحتوي على مفتاح اوبجكيت نفس مفاتيج اللى عندك في موديل سكيما اسمح لمستخدم يحدث بيانات عادي

}

}

})


await getProduct.save()

res.status(200).send(getProduct)

}


catch(e){

res.status(500).send(e.message)

}


}



// ### updateImage 


const UpdateImage = async( req , res ) => {

try{

const _id = req.params.id 

const publicId = req.params.publicId // بحدث الصورة لازم اجيب بابليك ايدي بتاعها متخزن في صورة وممكن تكتب اي اسم عادي الفكرة ان الاسم دة هتكتبوة في لينك يو ار ال 

if (!req.file || !publicId) {
  return res.status(400).send("Image and publicId are required")
}


const getProduct = await Product.findById(_id)

if (!getProduct) {
    return res.status(404).send("Product Not Found") 
}

if (!getProduct.images.length) {

  return res.status(400).send("No images found")

}


if(req.file && publicId){

// احنا هنتحقق من شرطين مع بعض مستخدم بعت صورة وعايز يحدثها والشرط تاني نحذف الصورة الحالية في حالة ان مستخدم عايز يحدث صورتة قديمة


const imageIndex = getProduct.images.findIndex((img)=> {

return img.public_id === publicId

// بقارن بقولوة هل متغير في رقم ايدي بتاع صورة يساوي نفس الايدي متخزن في داتا بيز وفي كلورندري لو بيساوي بعض هيخزنهم في متغير هنا

})

// findIndex شغلتة ان هو بيدور على رقم انديكس وطبعا انت عندك مفتاح الصور متخزن مصفوفة جواها اوبجكيت والفايند انديكس بيبحث عن الرقم انديكس بتاع اوبجكيت لو ملاقهاش هيرجعلك سالب واحد -1
// findIndex بيرجع سالب واحد في حالة لو ملاقاش رقم انديكس يعني معناها القيمة دي مش موجودة

if(imageIndex === -1){

 return res.status(404).send("Image Not Found")

}


await cloudinary.uploader.destroy(publicId) // احذف الصورة لو هما متشابهين ونفس ايدي

const result = await cloudinary.uploader.upload(req.file.path)

// بقولوة هنا حدثلي الصورة اللى جاية من ميلتر وارفعهالي على كوليندري وخزنهالي في داتا بيز

getProduct.images[imageIndex] = {

 url : result.secure_url ,
 
 public_id : result.public_id
 

}

}



await getProduct.save()

res.status(200).send(getProduct)

}

catch(e){

  res.status(500).send(e.message)
}

}


//////////////////////////////////////////////////////////////////////// 


// ### deleteProduct


const deleteProduct = async( req , res ) => {

try {

const _id = req.params.id

const removeProduct = await Product.findById(_id)

if (!removeProduct) {

  return res.status(404).send("Product not found")

}


 await Promise.all(
 
 removeProduct.images.map(async (delImg)=>{

 return await cloudinary.uploader.destroy(delImg.public_id) // حذفت صورة من كلويندري

 })   

)

await Product.findByIdAndDelete(_id) // بعد ماحذقت صورة بحذف بيانات من داتا بيز 

res.status(200).send(removeProduct)

}


catch(e){

 res.status(500).send(e.message)   

}

}



module.exports ={ createProduct , getAllProducts , getProductById , getCategoriesLimitProducts , updateProduct , UpdateImage , deleteProduct }




// module.exports = productSchema