
const Products = require("../modules/Products") 

const Cart = require("../modules/Cart")


const calculateTotal = async (cart) => {

//  احنا بعتنا بارميتر هنا عشان هنستخدمة في كل فونشين وكل كونتليرر من غير بارميتر مش هيعرف يحسب على انهي فونشين عشان كدة بعتنالوة بارميتر هي عايزة تعرف انهي كارت هي بتتعامل معاة عندك مثلا كارت حذف وعندك كارت تحديث كمية وكارت اضافة منتجات بكميات جديدة هتعرف كل دة ازاي لازم بارميتر عشان يعرف يتعامل مع كل روتير وكل وكونتليرر من دولت


await cart.populate("items.product") // بقولوة جوة ايتيمس في حاجة اسمها بروديكيت واخدة ايدي الايدي بتاعها فيها نفس ايدي متخزن في كوليكشن بروديكتس هاتلي بقي البيانات كلها بتاعت منتج دة اللى يربط ما بين كوليكشن بروديكتس وكوليكشن كارت الايدي ومن خلال الايدي اقدر اجيب تفاصيل منتج كلة عشان كدة قولتلوة هاتلي تفاصيل منتج وعرفت اضرب سعر في كمية 


let total = 0 


for(const totalItem of cart.items) {

// يعني معناة هتعملي فور على كل انديكس اوبجيكت متخزن جوة مصفوفة كارت ايتيمس طبعا مش هو عارف كارت ايتيمس دة عبارة عن اية الا لما انت تبصيها كبارميتر في اي فونشين زاي ادد ايتيم و ريموف ايتيم وايبديت 

total += totalItem.product.price * totalItem.quantity


}

// لف على كل منتج داخل الكارت ايتيمس"

cart.totalPrice = total

return cart ; // عشان نقدر نستخدمها في اي فونشين تاني يعني معناها ارجعلي بنتيجة نهائية بتاعت فونشين دة 







// await cart.populate("items.product") دة شكل الكود بعد ما عملت بابليتوت

// cart = {
//   items: [
//     {
//       product: {
//         _id: "p1",
//         price: 100
//       },
//       quantity: 2
//     }
//   ]
// }

}








const addItem = async( req , res ) => {

 try{   
    
const userId = req.user.id // بنجيب الايدي بتاع مستخدم اللى ضاف منتج دة جاي من الاوس ميديل وير يوسير ايدي عشان نقدر نحدد مين مستخدم ضاف منتج انا كدة مسكت ايدي بتاع مستخدم هنا 


const {productId , quantity} = req.body 

// const {productId , quantity} اول ما مستخدم يضغط على زر ادد تو كارت الفروند اند هيبعتلك لباك اند هيبعتلك رقم الايدي بتاع منتج والكمية بتاع مستخدم قد اية  

// بعد ما الفروند اند بعتلك الايدي بتاع منتج اللى مستخدم اختارة والكمية بنتأكد بعدها ان المنتج دة عندنا متخزن فعلا بنعمل شرط بتاعنا عشان نشوف منتج دة متخزن عندنا ولا لاء بص تحتك

if (quantity <= 0) {
  return res.status(400).send("Invalid quantity")
}

const IsProductHere = await Products.findById(productId) // بنتأكد ان منتج موجود متخزن عندي ولا لاء كنوع ما حماية تأكيد مش اكتر

if(!IsProductHere){

return res.status(400).send("This Product Is Not Found")

}

// احنا مسكنا ايدي بتاع مستخدم اللى جاي من الاوس بعد كدة هنقارنة بكارت هنشوفة نفس ايدي ولا لاء وهنعرف هل مستخدم دة عندة كارت قبل كدة ولا لاء 


let cart = await Cart.findOne({ user : userId }).populate("items.product") // انا كدة مسكت داتا مستخدم في كارت من خلال الايدي دة في حالة لو مستخدم عمل كارت قبل كدة وضاف منتجات بقولوة هاتلي داتا كارت بتاع مستخدم دة طالما هو مسجل عندنا قبل كدة وضايف كارت قبل كدة 


// await Cart.findOne({ user : userId }) دة كدة بيرجعلي دة بص تحت


// {
//   _id: "cart1",
//   user: "user123",
//  // items: [
//   {
//     product: "abc123",
//     quantity: 2
//   }
// ]

//   totalPrice: 300
// }

// .populate("items.product") بعد ما استخدمت دة راح مسك الايدي بتاع كوليكشن بروديكيت و راح جابلي الايدي بتاع منتج نفسة وخزنهولي داخل ايتيمس يعني بعد ما استخدمت بابليتوت بقي كدة بص تحتك

// {
//   _id: "cart1",
//   user: "user123",
//   items: [
//     { product: "prod1", quantity: 2 },
//     { product: "prod2", quantity: 1 }
//   ],
//   totalPrice: 300
// }


if (!cart) {

// طيب في حالة مستخدم دة جديد و اول مرة يضيف منتجات في كارت نقولوة خلاص نفتحلوة اوبجكيت يدخل في بياناتة في كارت ونخزنها طالما هو اول مرة متسجل عندنا و اول مرة يعمل شوبينج وبيستخدم الكارت ولسة هيضيف منتجات اول مرة ومش متخزن عندنا في داتا بيز


cart = new Cart ({

 user : userId ,

 items : [] ,

 totalPrice : 0

})

// موديل مجرد قالب او شكل كارت عايزة يكون ازاي لكن بيضيف بيانات حقيقية هو سطر نيو كارت دة

}


// بعد كدة بقي نبدأ نقارن نشوف انهي منتج من متخزن عندنا المستخدم ضافوة ونشوف هل منتج دة متخزن في داتا بيز يساوي نفس منتج دة متخزن في كارت وطبعا اي مقارنة بنقارن بية بتكون عن طريق الايدي عشان فريد ومش بيتكرر


const item = cart.items.find(

  ele => ele.product._id.toString() === productId 

  
// هنا بقولوة جوة كارت في مصفوفة اسمها ايتيمس جوة مصفوفة دي عايز تشوف هل الايدي بتاع منتج بتاع فروند اند اللى مستخدم ضغط علية بيساوي نفس الايدي اللى متخزن عندي في كارت ايتيمس طبعا خاصية فايند بترجع كل خاصية متخزن في مصفوفة يعني رجعتلك بروديكت وبترجعلك كمية وكل اوبجكيت

// لو لقي نفس منتج دة ايدي الجاي من بادي يساوي نفس منتج ايدي متخزن في كارت خلاص هيخزنهم في متغير


// انت فوق كنت بتقارن اوبجكيت مع اوبجكيت لكن تلؤتي انا بقولوة قارنلي الايدي بتاع مونجو ديبي بنفس الايدي اللى مستخدم ضغط علية في منتج ولو هو هو نفس الايدي زود كمية ولو مش نفس الايدي ضيف منتج جديد في كارت ومعاة كمية


// const item = cart.items.find(

//   ele => ele.product._id.toString() === productId 


)


if(item){

item.quantity += quantity // هنا بقولوة لو ايتيم شايل قيمة شايل بروديكيت والكمية في حاجة عندك اسمها الكمية عايزك تزودلي كمية قديمة متخزن في كارت على كمية جديدة اللى مستخدم بعتها يعني مستخدم بعت 4 كميات وانت كمية عندك 1 هيبقي 5 كميات 

// كدة ايتيم شايل منتج اللى اضاف في كارت بقولوة بقي زودلي كمية قديم ع جديد دة الكلام دة في حالة لو منتج مضاف في كارت فقط لكن لو مش مضاف مش هيزود كمية اكيد 

// هنا بيزود في كمية لو منتج مضاف في كارت لو مش مضاف بينزل سطر تحتيك في شرط  ايلس ويضيفوة اول مرة ومنتج مش موجود اصلا 



} 

else { // في حالة لو منتج مش مضاف اصلا ومفيش حاجة خالص و اول مرة يضاف نضيفة هنا 

cart.items.push({

 product : productId ,

 quantity : quantity

})


}

// findOne , findById , find كل دولت بيرجعو اوبجكيت واحد فقط ماعدا فايند بترجع كل اوبجكيت متخزن جوة مصفوفة وترجعهولك او تحطهولك في مصفوفة

// find بيجبلك كل اوبجيكات كلها متخزنة في مصفوفة ويحيطهالك في مصفوفة وبترجع اوبجكيت برضو مش اوبجيكت واحد كل اوبجيكتات داخل مصفوفة

// findIndex بترجعلك رقم انديكس بتاع كل اوبجيكت داخل مصفوفة


// هنرجع لطريقة فور طريقة الطيبة الكويسة زاي نظام طيبات كدة هههههههه

await calculateTotal(cart)

await cart.save()

res.status(200).send(cart)

}

catch(e){

 res.status(500).send(e.message)

}

}

////////////////////////////////////////////////////////////////////////////////////////

const getCart = async( req , res ) => {

try{  
  
const userId = req.user.id  

const getUserCart = await Cart.findOne({user : userId}).populate("items.product")

if(!getUserCart){

return res.status(400).send("Cart is not found")

}

res.status(200).send(getUserCart)


}

catch(e){

res.status(500).send(e.message)

}

}


////////////////////////////////////////////////////////////////////////// 



const removeItem = async ( req , res) => {

try{

const userId = req.user.id 

const {productId} = req.body

const cart = await Cart.findOne({ user : userId })

if(!cart){

return res.status(400).send("Cart is not found")

}



cart.items = cart.items.filter(

ele => ele.product.toString() !== productId // متخليش الايدي اللى جاي من مستخدم اللى منتج اختارة يساوي نفس الايدي اللى متخزن عندي يعني احذفة 

)


await calculateTotal(cart)

await cart.save()

res.status(200).send(cart)

}

catch(e){

res.status(500).send(e.message)

}

}



////////////////////////////////////////////////////////////////////////////////////////////////////


const UpdateCart = async ( req , res) => {

try{

const userId = req.user.id

const {productId , quantity} = req.body

const cart = await Cart.findOneAndUpdate(


{user : userId ,

"items.product" : productId ,

// items.product كدة خلط مينفعش يتكتب داخل اوبجكيت كدة لازم تحطها في علامتين تنصيص عشان يشتغل لانهم محطوطين داخل اوبجكيت لكن كدة هيفهموهم ان دة مصفوفة جواها منتج

},

{

$set:{

  "items.$.quantity" : quantity // بقولوة حدثلي الكمية فقط عشان كدة كتبت علامة دولار داخل كوتشين نصوص لو من علامة دولار جوة اللي جوة علامة تنصيص 
}

},

{
    new :true 
}


)

if (!cart) {
  return res.status(404).send("Cart or Product Not Found")
}


await calculateTotal(cart)


res.status(200).send(cart)

}

catch(e){

res.status(500).send(e.message)

}

}


//////////////////////////////////////////////////////////////////////////////


const clearCart = async(req , res) => {

try{    
const userId = req.user.id 

const cart = await Cart.findOne({ user : userId})

if(!cart){

return res.status(404).send("Cart not found");

}

cart.items = [] 

cart.totalPrice = 0

await cart.save()

res.status(200).send({ message : "Cart cleared successfully" , cart})


}

catch(e){

res.status(500).send(e.message)

}


}




module.exports = { addItem , getCart , removeItem , UpdateCart , clearCart }
