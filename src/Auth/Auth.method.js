const jwt = require('jsonwebtoken')
const { secret } = require('../../App/Config/Auth.config')
const promisify = require('util').promisify

const sign = promisify(jwt.sign).bind(jwt)
const verify = promisify(jwt.verify).bind(jwt)


exports.generateToken = async (payload, secretSignature, tokenLife) => {
    try {
        return await sign (
            {
                payload
            },
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife
            }
        );
    } catch (error) {
        console.log('Loi khi tao token')
        return null
    }
}

exports.verifyToken = async(token, secretKey) => {
    try {
        return await verify(token, secretKey)
    } catch {
        console.log("Verify token bi loi")
        return null
    }
}