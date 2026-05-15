

const express = require("express")

const router = express.Router()

const admin = require("../middleaware/adminRole")

const auth = require("../middleaware/auth")


const { CreateOrder ,  getOrders , getOneOrder  , updateOrder , cancellOrder }

      = require("../controller/orderController")




   router.post("/" , auth , CreateOrder )

   router.get("/" , auth , getOrders )

   router.get("/:id" , auth , getOneOrder )

   router.patch("/:id" , auth , admin , updateOrder )

   router.patch("/:id/cancel" , auth , cancellOrder )


   module.exports = router