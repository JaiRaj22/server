const db = require('../db')
const {hash} = require('bcryptjs')
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
  try {

  }
  catch (error) {
    console.log(error.message)
        return res.status(500).json ({
          error:error.message
        })
  }
}