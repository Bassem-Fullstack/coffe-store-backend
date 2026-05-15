
const Order = require ("../modules/Order")

const Cart = require("../modules/Cart")



const CreateOrder = async ( req , res ) => {

try{

const userId = req.user.id

const {city , street , phone , paymentMethod } = req.body

// هنجيب كارت عشان نشوف منتجات اللى مستخدم هيشريتها ونخزنة في اوردر ونعملوة فاتورة يكون دة سعر نهائي لان مستخدم في كارت ممكن يحذف منتج يضيف منتج او يزود كمية لكن في اوردر لاء

const cart = await Cart.findOne({ user : userId }).populate("items.product")

// هاتلي ديكومينت يوسير وهاتلي من جواها في حاجة اسمها ايتيمس هتلاقي جواها بروديكيت ايدي بروديكيت دة الايدي بتاع ريفرنس بتاع منتج هاتلي فية تفاصيل منتج

if(!cart || cart.items.length === 0 ) {

return res.status(400).send("Cart is empty")

}


// هنا بقي هنحدد نعرض اية في اوردرر بقي عشان لو طبعنا فاتورة ويبقي سعر نهائي دة خلاص اللى حددوة مستخدم

let totalPrice = 0 ; 

const orderItems = cart.items.map((everyItem) => {

 const price = everyItem.product.price // لان السعر في كارت متخزن جوة بروديكت في موديل كارت   

 const avergeTolta = price * everyItem.quantity

 totalPrice += avergeTolta

// بقولوة هنا خزنلي ورجعلي الايدي منتج والسعر والكمية عشان نخزنة في داتا بيز عشان نعرف من ايدي انهي منتج علية طلب والكمية قد اية والسعر عشان لو جينا طبعا فاتورة للمستخدم نجيب ايدي بتاع منتج دة ونجيب سعر وتفاصيل مع توتال برايز وكمية

return {

  product : everyItem.product._id , // انت بعد ما بتعمل بابليوت بيجبلك كل حاجة تفاصيل عن منتج دة كلة في  داخل اوبجكيت بتاع بروديكيت عشان كدة كتبتلوة ايدي كدة
  
  quantity : everyItem.quantity ,

  price : price // خزنت سعر عشان نعمل اثبات حالة لشراء منتج لعميل عشان لو سعر اتغير بعد كدة ميحصلش مشكلة او شكوي عشان كدة كتبنا سعر هنا

// بقولوة خزنلي الايدي بتاع منتج والكمية والسعر في اوردرر نبدأ نخزنهم في داتا بيز دة تفاصيل منتج

// دة تفاصيل هيتخزن في داتا بيزن الايدي بتاع منتج نعرف منتج دة اية بظبط والكمية طلب قد اية كمية والسعر هناخد دة كلة ونبدأ نضيفة في كوليكشن بتاعنا

// لية كتبنا السعر هنا رغم ان هو متخزن في بروديكيت ايدي تفاصيل منتج سعرة وكل حاجة لان السعر ممكن يتغير وانت عايز تطبع فاتورة للمستخدم احنا هنا بنربط الاوردر بالايدي بتاع منتج عشان نعرف منتج دة اية بظبط وكمان بنشوف كمية بتاعتة قد اية والسعر وكتبنا السعر هنا عشان نعمل فاتورة اثبات حالة يعني مثلا منتج انهاردة اشترية بخمسين جنية فين يثبت كدة انك اشتريتة بخمسين جنية في فاتورة لازم تكتب السعر وتفاصيل والايدي بتاع منتج اللى فية تفاصيل منتج ممكن يتغير او يتحذف عشان والسعر برضو ممكن يتغير عشان كدة كتبت سعر هنا عشان لما اجي اطبع في فاتورة اطبع سعر دة كذا ويوم تاريخ كذا وكمية وكدة السعر ممكن يتغير في اي وقت عندك في متجر لكن هنا في فاتورة الاوردر السعر مش هيتغير لانك طبعت سعر هنا والسعر بتاع اوردر لان اوردر اثبات حالة نثبت ان مستخدم اشتري منتج دة بسعر كذا ويوم كذا مينفعش محطش سعر في اوردر 

}

})


const newOrder = await Order.create({

user : userId ,

items : orderItems ,

totalPrice : totalPrice , // دي جت منين من متغير فوق انت عاملوة 

paymentMethod ,

// status & paymentStatus مبنكتبش دة هنا في كريت لان احنا لسة بنضيف اوردر منعرفش مستخدم دة دفع ولا  لسة ولا كنسل الاوردر لكن في مونجو ديبي بيحطلك القيمة ديفلوت اللى هو بينديج الانتظار بتاع دفع لما مستخدم يدفع او يكنسل الاورد انت بتروح تحديث وتحدث بيانات

shippingAddress : {

city  ,

phone ,

street ,

}

})




cart.items = [] ; //بنفرغ الاوردر عشان ميتكررش نفس الاوردر في نفس مصفوفة خلاص مستخدم طلب اوردر خلاص بقي فرغ اوردر عشان ميتراكمش بعد كدة باقي اوردرات عليها ونفس منتج يتكرر 

await cart.save()

res.status(201).send(newOrder)

}

catch(e) {

res.status(500).send(e.message)

}

}


/////////////////////////////////////////////////////////////////////// 

const getOrders = async( req , res ) => {

try {

const userId = req.user.id 

const getAllOrders = await Order.find({ user : userId }).populate("items.product")


if (getAllOrders.length===0) {

return res.status(404).send({ message: "Orders not found" });

}


res.status(200).send(getAllOrders)

}

catch(e) {

res.status(500).send(e.message)

}

}


///////////////////////////////////////////////////////////////////////////////////////////////////// 



const getOneOrder = async( req , res ) => {

try {

const userId = req.user.id 

const orderId = req.params.id

const getOrder = await Order.findOne({ _id : orderId  , user : userId }).populate("items.product")

if (!getOrder) {

return res.status(404).json({ message: "Order not found" });

}



res.status(200).send(getOrder)

}

catch(e) {

res.status(500).send(e.message)

}

}


///////////////////////////////////////////////////////////////////////////////////////////////


const updateOrder = async( req , res ) => {

// ملحوظة صغيرة في تحديث اوردرات حاجتين بس اللى بيتحدثوة الدفع وحالات توصيل اوردر يعني مثلا الاوردر وصل للمستخدم خلاص حدثلي ان اوردر وصل طيب هل المستخدم دفع فاتورة اوردر اة دفع خلاص حدثلي بيانات ان هو دفع لكن تحدث منتجات في اوردر او اي حاجة دة غلط مبيتحدش بيعملوة اوردر من اول وجديد ويكنسلوة اوردر دة ويسيبوة ميحذفوهوش لكن بيعمل اوردرر جديد 

try {

const { paymentStatus , status , paymentMethod } = req.body

const userId = req.user.id 

const orderId = req.params.id


const getOrderToUpdate = await Order.findOne({ _id : orderId , user : userId }) 

// من خلال متغير دة قدرت امسك كل اوبجكيتات بتاع اوردر دة 

if(!getOrderToUpdate) {

return res.status(404).send({ message: "Order not found" });

}

const lockedStatuses = ["delivered", "cancelled"]

if (lockedStatuses.includes(getOrderToUpdate.status))
  
{

return res.status(400).json({ message: " Order Cannot be updated" });

}


if(status){

getOrderToUpdate.status = status

} 

if(paymentStatus) {

  getOrderToUpdate.paymentStatus = paymentStatus  
}


if(paymentMethod) {

  getOrderToUpdate.paymentMethod = paymentMethod  
}



await getOrderToUpdate.save()

res.status(200).send(getOrderToUpdate)


}

catch(e) {

res.status(500).send(e.message)

}


}


/////////////////////////////////////////////////////////////////////////////////////////


const cancellOrder = async( req , res ) => {

try{

 const userId = req.user.id 
 
 const orderId = req.params.id


 const cancelOrder = await Order.findOne({ _id : orderId , user : userId })


if(!cancelOrder) {

return res.status(404).send({ message: "Order not found" });

}


cancelOrder.status = "cancelled" 

await cancelOrder.save()

res.status(200).send({ message : "Order cancelled successfull"  , cancelOrder })

}


catch(e) {

res.status(500).send(e.message)

}


}




module.exports = { CreateOrder ,  getOrders , getOneOrder  , updateOrder , cancellOrder }





























































