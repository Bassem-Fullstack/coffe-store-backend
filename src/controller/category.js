

const Category = require("../modules/category")

const cloudinary = require("../config/cloudinary")


const createCategory = async(req , res) => {

try{


const result = await cloudinary.uploader.upload(req.file.path);

// كدة انا خزنت الصورة في كلورنيدري هيرجعهالي بالمنظر دة بص تحتك

// {
//   "secure_url": "https://res.cloudinary.com/...jpg",
//   "public_id": "abc123"
// }



const category = await Category.create({

name : req.body.name ,

image : { 
    
url : result.secure_url , 

public_id : result.public_id

},


createdBy : req.user.id


})    



res.status(201).send(category)

}

catch(e){

 res.status(500).send(e.message)   

}

}

/////////////////////////////////////////////////////////

const getallCategory = async (req , res) => {

 try{ 
      
 const categories  = await Category.find({})

 res.status(200).send(categories) 

}


 catch(e){
  
    res.status(500).send(e.message)

 }

}


/////////////////////////////////////////////////////// 


const getOneCategory = async(req , res) => {

try{

const _id = req.params.id

const getCategory = await Category.findById(_id)

if (!getCategory) {
    
  return res.status(404).send("Category not found")
}

res.status(200).send(getCategory)

}

catch(e){

res.status(500).send(e.message)

}

}




///////////////////////////////////////////////////////////////


const updateCategory = async (req , res) => {

try{

const _id = req.params.id

const category = await Category.findById(_id)

if(!category) {

return res.status(404).send("Category not Found")

}



if(req.body.name){

 category.name = req.body.name 

}


if(req.file){

if(category.image?.public_id) {

await cloudinary.uploader.destroy(category.image.public_id)

// بقولوة لو الصورة متخزنة شيلها من داتا بيز وحطيلي الصورة جديدة

}

const result = await cloudinary.uploader.upload(req.file.path);

category.image = {

url : result.secure_url ,

public_id : result.public_id

}


} 



await category.save()

res.status(200).send(category)

}


catch(e){

res.status(500).send(e.message)

}

}


////////////////////////////////////////////////////////////////////// 


const deleteCategory = async ( req , res)=> {

try{
    
 const _id = req.params.id 
 
 const category  = await Category.findById(_id)


if(!category){

  return res.status(400).send("Category not found")
  
}


if(category.image?.public_id){

await cloudinary.uploader.destroy(category.image.public_id)

// طبيعي هيلاقي رقم الايدي بتاع صورة متخزن في داتا بيز نفس رقم بابليك ايدي متخزن في كلورنيدري فطبيعي هيحذفها

}


await Category.findByIdAndDelete(_id)
  
res.status(200).send(category)

} 

catch(e){

res.status(500).send(e.message)

}


}










module.exports = {
createCategory , 
getallCategory , 
getOneCategory , 
updateCategory ,
deleteCategory , 
 }









