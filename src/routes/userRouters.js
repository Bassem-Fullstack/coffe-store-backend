


const express = require("express")

const {registerUser, loginUser, profile, logout, changeRole , updateUser , uploadImages , DeleteUser , getAllUsers}

= require("../controller/userController")

const router = express.Router()

const auth = require("../middleaware/auth")


const upload = require("../middleaware/uploadImages")


const admin = require("../middleaware/adminRole")


const validate = require("../middleaware/validate")


const  { loginUser , registerUser } = require("../validations/Joi")


//////////////////////////////////////////////////////////////////////////////// 

// ## login & register

router.post("/register" , validate(registerUser) , registerUser)

router.post("/login" , validate(loginUser) , loginUser)

router.get("/profile" , auth , profile)

router.get("/" , auth , getAllUsers)

router.delete("/logout" , auth , logout)

router.delete ("/:id" , auth , DeleteUser)

router.patch("/update" , auth ,validateUpdate, updateUser)

router.patch("/:id/role" , auth , admin , changeRole)

router.post("/upload" , auth ,upload.single('image') , uploadImages)


module.exports = router