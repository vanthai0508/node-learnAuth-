const User = require('../../App/Models/UserModel')
const bcrypt = require('bcrypt')
const authMethod = require("./Auth.method")
const jwtEnum = require("../../Variables/jwt")
const randToken = require('rand-token')
const userController = require("../../App/Controllers/UserController")

const authController = {
    register: async(req, res) => {
        try {

            //check username and email
            const username = req.body.name.toLowerCase()
            const user = await User.findOne({
                name: username
            })
            if(user) {
                res.status(400).send({ message: "Username is used"})
                return
            }

            const email = await User.findOne({
                email: req.body.email
            })
            if(email) {
                res.status(400).send({ message: "Email is used"})
                return
            }

            //Ma hoa password
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)

            const data = new User(req.body)
            const result = await data.save()
            res.status(200).json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    login: async(req, res) => {
        try {

            //check email and password
            const user = await User.findOne({
                email: req.body.email
            }).populate('roles')
            if(!user) {
                res.status(400).send({ message: "Use doesn't exits"})
                return
            }
            

            const checkPass = bcrypt.compareSync(req.body.password, user.password)
            if(!checkPass) {
                res.status(400).send({ message: "Password correct "})
                return
            }

            // Tao token
            const secretToken = process.env.ACCESS_TOKEN_SECRET
            const lifeToken = process.env.ACCESS_TOKEN_LIFE
            const dataAccessToken = {
                user: user._id,
                role: user.roles[0].name
            }
            const accessToken = await authMethod.generateToken(
                dataAccessToken,
                secretToken,
                lifeToken
            )
            if(!accessToken) {
                res.status(401).send('Tao token bi loi')
                return
            }

            // Tao refresh token
            let refreshToken = randToken.generate(jwtEnum.refreshTokenSize)
            if(!user.refreshToken) {
                const data =  await userController.updateRefreshToken(user.email, refreshToken)
            } else {
                refreshToken = user.refreshToken
            }

            res.status(200).json({
                messsge: "Pass",
                accessToken,
                refreshToken,
                user
            })
            return
        } catch (err) {
            res.status(500).json("Loi api login")
        }
    }
}

module.exports = authController