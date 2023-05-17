const Role = require('../Models/RoleModel')

const roleController = {
    createRole: async(req, res) => {
        try {
            const role = new Role(req.body)
            const data = await role.save()
            res.status(200).json(data) 
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
module.exports = roleController