const router = require("express").Router()
const userController = require("../Controllers/UserController")
const {checkUsername, checkEmail} = require("../Middlewares/CheckUser")
const  {isAuth, isAdmin} = require("../Middlewares/Auth")

router.post("/", checkUsername, checkEmail, userController.create)
router.get("/", isAuth, isAdmin, userController.listUser)
router.post("/send/:id", isAuth, isUser, userController.sendMail)

module.exports = router