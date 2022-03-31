// Const
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 5000
const { db } = require('./database')
const handleDisconnect = require('./database')

// App

app.use(cors({
    origin: ["https://velvety-rabanadas-dffc6b.netlify.app"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))


// Create session
app.use(session({
   key: "userId",
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false,
   cookie: {
       expires: 60 * 60 * 24
   }
}))

// Handle database disconnect
handleDisconnect()


// Default Route
app.use("/", require('./routes/controllers'))


// Start Server
app.listen(PORT, () => {
    console.log('server started on port 5000')
})

