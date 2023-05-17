const authController = require("./Auth.controller")
const Router = require('express').Router()


Router.post("/", authController.register)
Router.get("/login", authController.login)

module.exports = Router