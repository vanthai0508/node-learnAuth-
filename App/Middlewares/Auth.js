const user = require("../Models/UserModel")
const authMethod = require("../../src/Auth/Auth.method")

isAuth = async (req, res, next) => {
    const tokenInHeader = req.headers.x_authorization

    if(!tokenInHeader) {
        res.status(401).send({message: "Khong co token"})
        return
    }

    const secretToken = process.env.ACCESS_TOKEN_SECRET
    const verify = await authMethod.verifyToken(tokenInHeader, secretToken)

    if(!verify) {
        return res.status(401).send({message: "khong verify duoc"})
    }

    req.user_id = await verify.payload.user
    req.role = await verify.payload.role
    next()
}
isAdmin = async(req, res, next) => {
    if(req.role == "Admin") {
        next()
    } else {
        res.status(401).send({ message: "Khong phai admin " })
        return
    }
}

isUser = async(req, res, next)  => {
    if(req.role == "User") {
        next()
    } else {
        res.status(401).send({ message: "Khong phai user "})
    }
}

const check = {
    isAuth,
    isAdmin,
    isUser
}

module.exports = check