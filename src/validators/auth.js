const {check} = require('express-validator')
const db = require('../db')
const {compare} = require('bcryptjs')

const password = check('password').isLength({min:6, max:15}).withMessage('password has to be between 6 and 15 characters long.')

const email = check('email').isEmail().withMessage('pls provide a valid email.')

const emailExists = check('email').custom(async (value)=> {
    const {rows} = await db.query('SELECT * from users WHERE email = $1',[
        value,
    ])
    if(rows.length){
        throw new Error('email already exists.')
    }
})

//login validation
const logincheck = check('email').custom(async (value, {req}) => {
    const user = await db.query('SELECT * from users WHERE email = $1', [value])
    if (!user.rows.length) {
        throw new Error('Wrong email or password')
    }
    const validpassword = await compare(req.body.password, user.rows[0].password)
    if(!validpassword){
        throw new Error('Wrong email or password')
    }

    req.user = user.rows[0]
})

module.exports = {
    registervalidation: [email, password, emailExists],
    loginvalidation: [logincheck],
}

