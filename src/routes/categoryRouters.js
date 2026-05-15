

const express = require("express")

const router = express.Router()

const auth = require("../middleaware/auth")

const { createCategory , getallCategory , getOneCategory , updateCategory , deleteCategory} 

= require("../controller/category") 


const upload = require("../middleaware/uploadImages")


const admin = require("../middleaware/adminRole")

///////////////////////////////////////////////////////////////////// 




router.post("/" , auth , admin , upload.single('image') , createCategory)

 
router.get("/" , getallCategory )


router.get("/:id" , getOneCategory)


router.patch("/:id" , auth , admin , upload.single("image") , updateCategory)


router.delete("/:id" , auth , admin , deleteCategory )





module.exports = router