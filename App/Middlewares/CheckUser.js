const User = require('../Models/UserModel')

checkUsername = async(req, res, next) => {
    try {
        const user = await User.findOne({
            name: req.body.name
        })
        if (user) {
            res.status(400).send({ message: "Username is used"})
            return;
        }
        // res.status(200).json("pass")
        next()

    } catch (err) {
        res.status(500).json(err)
    }

}

checkEmail = async(req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (user) {
            res.status(400).send({message: "Email is used"})
            return
        }
        next()
    } catch (err) {
        res.status(500).json(err)
    }
}

const check = {
    checkUsername,
    checkEmail,
};

module.exports = check