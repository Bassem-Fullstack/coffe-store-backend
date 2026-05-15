

const express = require("express")

const router = express.Router()


const { addItem , getCart , removeItem , UpdateCart, clearCart }
 
= require ("../controller/Cart")

const auth = require("../middleaware/auth")


router.post("/" , auth , addItem)


router.get("/" , auth , getCart) 


router.patch("/" , auth , UpdateCart)


router.delete("/remove" , auth , removeItem)

router.delete("/" , auth , clearCart)


module.exports = router



















