const router = require('express').Router()
const roleController = require('../Controllers/RoleController')

router.post('/', roleController.createRole)

module.exports = router 