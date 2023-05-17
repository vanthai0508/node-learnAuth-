const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

// const userMiddle = require('./App/Middlewares/CheckUser')
const userRoute = require('./App/Route/User')
const roleRoute = require('./App/Route/Role')
const authRoute = require("./src/Auth/Auth.routes")

dotenv.config()
const app = express()

port = 3001

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};
mongoose.connect((process.env.MONGODB_URL), options)




app.use(cors())
app.use(bodyParser.json({limit: "50mb"}))
app.use(morgan("common"))

app.use("/user", userRoute)
app.use("/role", roleRoute)
app.use("/auth", authRoute)




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})