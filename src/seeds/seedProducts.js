

const mongoose = require("mongoose")

const Category = require("../modules/category")

const Products = require("../modules/Products")

const User  = require("../modules/User")


const dotenv = require("dotenv")


dotenv.config()


// ببساطة احنا هنضيف منتجات هنا في فايل دة ونربطة بالفئة عشان فروند اند لما يجي يعرض منتجات يلاقيها جاهزة من خلال فايل دة

const seedProducts = async () => {

try {

await mongoose.connect(process.env.DB_URL)


await Category.deleteMany()

await Products.deleteMany() // دة بيمسح الداتا متخزنة فعلا زيادة عشان متكررش بس يعني بقولوة امسح داتا موجود تلؤتي عشان هضيف داتا جديدة


const admin = await User.findOne({role : "admin"})

const categories = await Category.insertMany( [

{
    name : "Whole Coffe Beans" , 
     
     image : {
          
       url : "https://plus.unsplash.com/premium_photo-1675237625862-d982e7f44696?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGNvZmZlZSUyMGJlYW5zfGVufDB8fDB8fHww",

       public_id : "Coffe_Beans"

     },

     createdBy : admin._id


},


{
    name : "Hot Coffes" , 
     
     image : {
          
       url : "https://plus.unsplash.com/premium_photo-1726797807133-a84ce84d29b4?q=80&w=819&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

       public_id : "Hot_Coffes"

     } ,

     
     createdBy : admin._id

},


{
    name : "Iced Coffee" , 
     
     image : {
          
       url : "https://images.unsplash.com/photo-1533007716222-4b465613a984?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aWNlZCUyMGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D" ,

       public_id : "Iced_Coffee"

     },

     
     createdBy : admin._id

}

])


 await Products.insertMany( [

// ## Whole Beans 

// 1#

{

name : "Whole Cafe Gourmet 250 Gram" ,
 
 description : "we opened our first store in Seattles Cafe Gourmet Market. Reflecting on our heritage inspired us to create this delicious blend with smooth body and subtle flavours of cocoa and toasted nuts." ,

 price : 900.00 ,

 stock : 65 ,

 images : [
     
    {
      url : "https://images.unsplash.com/photo-1642641222142-3b744c6a70d6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,

      public_id : "Cafe_Gourmet"

    }


 ],


  category : categories[0]._id ,

   
  createdBy : admin._id

},

// 2#


{

name : "Whole Bean Ethiopia 340 Gram." ,
 
 description : "With a velvety soft texture and floral, peppery spice notes, this is our tribute to the birthplace of coffee." ,

 price : 1600.00,

 stock : 50 ,

 images : [
     
    {
      url : "https://images.unsplash.com/photo-1633275513781-a04cf6d1454d?q=80&w=1232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,

      public_id : "Bean_Coffee_Ethiopia"

    }


 ],

  category : categories[0]._id ,

  createdBy : admin._id


},

// 3#


{

name : "Whole Bean Cafesserie 500 Gram." ,
 
 description : "Full-bodied with a smooth mouthfeel, lingering flavors of dried herbs and fresh earth, and almost no acidity." ,

 price : 2200.00,

 stock : 55 ,

 images : [
     
    {
      url : "https://images.unsplash.com/photo-1775144743449-6aeb6d2ea42e?q=80&w=367&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,

      public_id : "Bean_Cafesserie"

    }


 ],

  category : categories[0]._id ,

  createdBy : admin._id


},


// 4#


{

name : "Whole Bean BEH Coffe 250 Gram." ,
 
 description : "Every BEH Coffe beverage we handcraft for you started right here. so right it's never been changed." ,

 price : 900.00,

 stock : 68 ,

 images : [
     
    {
      url : "https://images.unsplash.com/photo-1604497051809-896c56554ccd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,

      public_id : "Bean_BEH"

    }


 ],

  category : categories[0]._id ,

  createdBy : admin._id


},




// 5#



{

name : "Whole Bean Robust Blend 500 Gram" ,
 
 description : "It's a hospitable blend of the finest Latin American beans that we've been offering to coffee lovers since the very beginning." ,

 price : 2200.00,

 stock : 80 ,

 images : [
     
    {
      url : "https://images.unsplash.com/photo-1681183133764-7278bd6f9ba3?q=80&w=515&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,

      public_id : "Bean_Robust_Blend"

    }


 ],

  category : categories[0]._id ,

  createdBy : admin._id


},



// 6#

{

name : "Whole Bean Coffee Espresso Blend 225 Gram" ,
 
 description : "It's a hospitable blend of the finest Latin American beans that we've been offering to coffee lovers since the very beginning." ,

 price : 800.00,

 stock : 32 ,

 images : [
     
    {
      url : "https://images.unsplash.com/photo-1599766676305-6af85465b875?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,

      public_id : "Espresso_Blend"

    }


 ],

  category : categories[0]._id ,

  createdBy : admin._id


},



// 7#

{

name : "Whole Perfetto Moka 225 Gram" ,
 
 description : "It gives a smooth, more approachable sensation on the palate, but drinkers can still expect a full flovered and full caffeine experience ." ,

 price : 900.00,

 stock : 65 ,

 images : [
     
    {
      url : "https://images.unsplash.com/photo-1693070809346-d79f329712d7?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,

      public_id : "Perfetto_Moka"

    }


 ],

  category : categories[0]._id ,

  createdBy : admin._id


},




///////////////////////////////////////////////////////////////////////////////////////// 

// ### Hot Coffes

// 1#

{

 name : "Hot Caramel Macchiato" ,
 
 description : "Freshly steamed milk with vanilla-flavoured syrup, marked with espresso and finished with caramel sauce." ,

 price : 155.00 ,

 images : [
     
    {
      url : "https://plus.unsplash.com/premium_photo-1729097011337-a61d44b1af85?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SG90JTIwQ2FyYW1lbCUyME1hY2NoaWF0b3xlbnwwfHwwfHx8MA%3D%3D" ,

      public_id : "Hot_Caramel_Macchiato"

    }


 ],

  category : categories[1]._id ,

  createdBy : admin._id

},



// 2#


{

 name : "Cafe Americano" ,
 
 description : "Espresso shots are topped with hot water to produce a light layer of cream." ,

 price : 125.00 ,

 images : [
     
    {
      url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlkWZ5xi_fHa4DNA_fTxUQfOFoJmGDuBeGKLGYtEF7gKqCKBcBxjN0g5F-gkesD1VboLSmSm2A_jlJf5Xg7sJ5tHoGZze4B_dblEQEJ4&s=10" ,

      public_id : "Cafe_Americano"

    }


 ],

  category : categories[1]._id ,

  createdBy : admin._id

},





// 3#


{

 name : "Matcha Latte" ,
 
 description : "Matcha green tea with milk." ,

 price : 150.00 ,

 images : [
     
    {
      url : "https://avocadoskillet.com/wp-content/uploads/2024/12/IMG_2024-12-04-154116.jpeg" ,

      public_id : "Matcha_Latte"

    }


 ],

  category : categories[1]._id ,

  createdBy : admin._id

},






// 4#


{

 name : "Teavana Breakfast Tea" ,
 
 description : "Full-bodied black tea with rich, malty undertones." ,

 price : 100.00 ,

 images : [
     
    {
      url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOeXbKlEiumC3zvIuWCXrWqNckJAtdKVrkQA&s" ,

      public_id : "Teavana_Tea"

    }


 ],

  category : categories[1]._id ,

  createdBy : admin._id

},



// 5#


{

 name : "Cappuccino" ,
 
 description : "Dark, rich espresso lies in wait under a smoothed and stretched layer of thick milk foam. An alchemy of barista artistry and craft." ,

 price : 130.00 ,

 images : [
     
    {
      url : "https://img.freepik.com/premium-photo/hot-coffee-latte-cappuccino-cup_554053-461.jpg" ,

      public_id : "Cappuccino"

    }


 ],

  category : categories[1]._id ,

  createdBy : admin._id

},







// 6#


{

 name : "Dulce De Leche Latte" ,
 
 description : "Freshly steamed milk and dulce de leche sauce to our classic espresso, then top it off with caramel drizzle." ,

 price : 145.00 ,

 images : [
     
    {
      url : "https://braziliankitchenabroad.com/wp-content/uploads/2023/11/Dulce-de-Leche-Latte-15.jpg" ,

      public_id : "Dulce_Latte"

    }


 ],

  category : categories[1]._id ,

  createdBy : admin._id

},



// 7#


{

 name : "Spanish Latte" ,
 
 description : "Our signature espresso meets Spanish sauce and steamed milk delivers a brilliant combination of sweetness." ,

 price : 145.00 ,

 images : [
     
    {
      url : "https://coffee-slang.com/wp-content/uploads/2026/01/spanish-latte-recipe-500x500.jpg" ,

      public_id : "Spanish_Latt"

    }


 ],

  category : categories[1]._id ,

  createdBy : admin._id

},




// 8#


{

 name : "Cafe Mocha" ,
 
 description : "Espresso combined with mocha sauce and steamed milk." ,

 price : 135.00 ,

 images : [
     
    {
      url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnA6pe5EhL4MMBaEDvnMbVnWgQTGrHax4BiA&s" ,

      public_id : "Cafe_Mocha"

    }


 ],

  category : categories[1]._id ,

  createdBy : admin._id

},


///////////////////////////////////////////////////////////////////////////////////////////////////////////// 


// ### Iced Coffes

// 1#

{

 name : "Iced Caramel Macchiato" ,
 
 description : "Espresso combined with vanilla-flavoured syrup, milk and caramel sauce over ice." ,

 price : 155.00 ,

 images : [
     
    {
      url : "https://www.allrecipes.com/thmb/LgtetzzQWH3GMxFISSii84XEAB8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/258686-IcedCaramelMacchiato-ddmps-4x3-104704-2effb74f7d504b8aa5fbd52204d0e2e5.jpg" ,

      public_id : "Iced_Caramel_Macchiato"

    }


 ],

  category : categories[2]._id ,

  createdBy : admin._id

},



// 2#


{

 name : "Iced Cafe Americano" ,
 
 description : "Espresso shots are topped with water to produce a light layer of cream, then served over ice." ,

 price : 125.00 ,

 images : [
     
    {
      url : "https://coffee-slang.com/wp-content/uploads/2025/06/iced-americano-recipe-1024x683.webp" ,

      public_id : "Iced_Cafe_Americano"

    }


 ],

  category : categories[2]._id ,

  createdBy : admin._id

},





// 3#


{

 name : "Iced Matcha Latte" ,
 
 description : "Matcha green tea is mixed with milk and served over ice." ,

 price : 150.00 ,

 images : [
     
    {
      url : "https://www.paperandtea.com/cdn/shop/articles/Mango_Matcha_Latte-Sora_f6659cf0-b1d4-4c02-87b7-6cd276f997b4.jpg?v=1778082046&width=1024" ,

      public_id : "Iced_Matcha_Latte"

    }


 ],

  category : categories[2]._id ,

  createdBy : admin._id

},






// 4#


{

 name : "Iced Cafe Latte" ,
 
 description : "Classic espresso is combined with milk and served over ice." ,

 price : 130.00 ,

 images : [
     
    {
      url : "https://images.ctfassets.net/v601h1fyjgba/2WsabeUiBcZsGEhToX0Fsq/a83fdeed214a3cd72dbb6dc9f899858b/15697_Keurig_CafeCreations_Iced_Mexican_Coffee_COMP_Hi__1_.jpg" ,

      public_id : "Iced_Cafe_Latte"

    }


 ],

  category : categories[2]._id ,

  createdBy : admin._id

},



// 5#


{

 name : "Cold Brew Latte" ,
 
 description : "Cold Brew Coffee with milk." ,

 price : 135.00 ,

 images : [
     
    {
      url : "https://cdn.shopify.com/s/files/1/0570/1828/6270/articles/9_785469f6-7de7-4bda-ac34-6135f8cd8c9b.jpg?v=1765346862&width=1100" ,

      public_id : "Cold_Brew_Latteo"

    }


 ],

  category : categories[2]._id ,

  createdBy : admin._id

},





// 6#


{

 name : " Doubleshot Iced Shaken" ,
 
 description : "wo fresh shots of espresso, hand shaken with ice, finished with milk mixed with sweetened whipped cream ." ,

 price : 170.00 ,

 images : [
     
    {
      url : "https://theseasonal.kitchen/wp-content/uploads/2024/04/Double-Shot-Iced-Shaken-Espresso-109.jpg" ,

      public_id : " Doubleshot_Iced_Shaken"

    }


 ],

  category : categories[2]._id ,

  createdBy : admin._id

},



// 7#


{

 name : "Iced Spanish Latte" ,
 
 description : "Our signature espresso meets Spanish sauce, milk and ice delivers a brilliant combination of sweetness." ,

 price : 145.00 ,

 images : [
     
    {
      url : "https://thehintofrosemary.com/wp-content/uploads/2023/11/Spanish-iced-latte-recipe-cover-photo.jpg" ,

      public_id : "Iced_Spanish_Latte"

    }


 ],

  category : categories[2]._id ,

  createdBy : admin._id

},




// 8#


{

 name : "Iced White Chocolate Mocha" ,
 
 description : "Espresso, milk and white chocolate flavoured sauce, poured over ice and without whipped cream." ,

 price : 145.00 ,

 images : [
     
    {
      url : "https://www.dessarts.com/wp-content/uploads/2025/04/White-Chocolate-Mocha-Drink_1200px_F-540x720.jpg" ,

      public_id : "Cafe_Mocha"

    }


 ],

  category : categories[2]._id ,

  createdBy : admin._id

},



])


}


catch(e){

 console.log(e)

}


finally{

await mongoose.disconnect()

}

}


seedProducts()


















































