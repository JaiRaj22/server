const express = require('express')
const app = express()
const {PORT, CLIENT_URL} = require('./constants')
const cookieparser = require('cookie-parser')
const cors = require('cors')
const passport = require('passport')

require('./middlewares/passport_middleware')
//middleware
app.use(express.json())
app.use(cookieparser())
app.use(cors({origin: CLIENT_URL, credentials: true}))
app.use(passport.initialize())
//import routes
const authroutes = require('./routes/auth');


//initilaize
app.use('/api', authroutes)

//function creation for listening
const appstart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`app is running at http://localhost:${PORT}`)
        })
    }
    catch (error) {
        console.log(`Error: ${error.message}`)
    }
}
appstart()