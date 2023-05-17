const User = require("../Models/UserModel")
const Role = require("../Models/RoleModel")
const mail = require("nodemailer")

const userController = {
    listUser: async(req, res) => {
        try {
            // const user = new User({
            //     name: "thai",
            //     email: "tranthai",
            //     password: 123
            // })
            // await user.save()
            const listUser = await User.find().populate('roles')
            res.status(200).json(listUser)
        } catch (err){
            res.status(500).json(err)
        }
    },
    create: async(req, res) => {
        try {
            const user = new User(req.body)
            const data = await user.save()
            // if(req.body.role) {
            //     const role = Role.findById(req.body.role)
            //     await = Role.updateOne({ $push : {}})
            // }
            res.status(200).json(data)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    updateRefreshToken: async(email, refreshToken) => {
        try {
            user = await User.findOne({email: email})
            user.refreshToken = refreshToken
            await user.save()
            return true
        } catch (err) {
            res.status(500).json("Loi update refreshToken")
        }
    },
    sendMail: async(req, res) => {
        try {
            const user = await User.findOne({ _id: req.user_id })

            const friend = await User.findOne({ _id: req.params.id})
            console.log(req.body)
            console.log(user.email)
            const transporter = mail.createTransport({
                service: "gmail",
                auth: {
                    user: user.email,
                    pass: req.body.passEmail
                }
            })

            const content = {
                from: user.email,
                to: friend.email,
                subject: req.body.subject,
                text: req.body.text
            }

            transporter.sendMail(content, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  res.status(200).json("Success")
                  return
                }
              });

        } catch (err) {
            res.status(400).json("Khong goi mail duoc")
            return
        }
    }
}

module.exports = userController 