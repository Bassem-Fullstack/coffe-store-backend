


const express = require("express")

const {registerUser, loginUser, profile, logout, changeRole , updateUser , uploadImages , DeleteUser , getAllUsers}

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

router.get("/" , auth , getAllUsers)

router.delete("/logout" , auth , logout)

router.delete ("/:id" , auth , DeleteUser)

router.patch("/update" , auth ,validateUpdate, updateUser)

router.patch("/:id/role" , auth , changeRole)

router.post("/upload" , auth ,upload.single('image') , uploadImages)


module.exports = router