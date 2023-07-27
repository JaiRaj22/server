const express = require('express');

const app = express()
const PORT = 8000;
//middleware
app.use(express.json())
//import routes
const authroutes = require('./routes/auth')

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