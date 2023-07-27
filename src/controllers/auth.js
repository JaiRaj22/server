const db = require('../db')
const {hash} = require('bcryptjs')
const {sign} = require('jsonwebtoken')
const { SECRET } = require('../constants')

exports.getUsers = async (req,res) => {
    try {
      const {rows} = await db.query('select userid, email from users')
      return res.status(200).json({
        success: true,
        user: rows,
      })
    }
    catch(error) {
        console.log(error.message)
    }
}

exports.register = async (req,res) => {
  const {email,password} = req.body
    try {
      const hashedpassword = await hash(password, 10)
      
      await db.query('insert into users(email, password) values ($1, $2)', 
      [email, hashedpassword])
      return res.status(201).json ({
        success: true,
        message: 'The registration was sucessfull'
      })

    }
    catch(error) {
        console.log(error.message)
        return res.status(500).json ({
          error:error.message
        })
    }
}

exports.login = async (req,res) => {
  // payload for req.user = user.rows[0]
  let user  = req.user
  let payload = {
    id:user.userid,
    email:user.email,
  }
  try {
    const token = await sign(payload, SECRET)
    return res.status(200).cookie('token', token,{httpOnly:true}).json({
      success: true,
      message: "logged in successfully",
    })
  }
  catch (error) {
    console.log(error.message)
        return res.status(500).json ({
          error:error.message
        })
  }
}

exports.protected = async (req,res) => {
  try {
    return res.status(200).json({
      info: 'protected info'
    })
  }
  catch(error) {
      console.log(error.message)
  }
}

exports.logout = async (req,res) => {
  try {
    return res.status(200).clearCookie('token',{httpOnly:true}).json({
      success: true,
      message: "logged out successfully",
    })
  }
  catch(error) {
    console.log(error.message)
        return res.status(500).json ({
          error:error.message
        })
  }
}