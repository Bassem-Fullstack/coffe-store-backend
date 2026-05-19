


const express = require("express")

const router = express.Router()

const {createProduct , getAllProducts , getProductById , getCategoriesLimitProducts , updateProduct , deleteProduct , UpdateImage}

= require("../controller/ProductsController")

const auth = require("../middleaware/auth")

const admin = require("../middleaware/adminRole")

const upload = require("../middleaware/uploadImages")

const validateProduct = require("../validations/vailateProducts")

router.post("/" , auth , admin , upload.array("images") ,validateProduct, createProduct)

router.get("/" , getAllProducts)

router.get ("/with-product", getCategoriesLimitProducts)

router.get("/:id" , getProductById)

router.patch("/:id" , auth , admin , updateProduct)

router.patch("/:id/images" , auth , admin , upload.single("image") ,UpdateImage)

router.delete("/:id" , auth , admin , deleteProduct )




module.exports = router