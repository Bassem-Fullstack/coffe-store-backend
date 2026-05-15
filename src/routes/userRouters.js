


const express = require("express")

const {registerUser, loginUser, profile, logout, updateUser , uploadImages}

= require("../controller/userController")

const router = express.Router()

const auth = require("../middleaware/auth")

const {validateRegister , validateLogin , validateUpdate} 

= require("../validations/Joi")

const upload = require("../middleaware/uploadImages")


//////////////////////////////////////////////////////////////////////////////// 

// ## login & register

router.post("/register" , validateRegister, registerUser)

router.post("/login" , validateLogin, loginUser)

router.get("/profile" , auth , profile)

router.delete("/logout" , auth , logout)

router.patch("/update" , auth ,validateUpdate, updateUser)

router.post("/upload" , auth ,upload.single('image') , uploadImages)


module.exports = router