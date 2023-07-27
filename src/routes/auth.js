const {Router} = require('express')
const { getUsers, register, login } = require('../controllers/auth')
const { registervalidation, loginvalidation } = require('../validators/auth')
const { validationmiddleware } = require('../middlewares/auth-middleware')
const router = Router()

router.get('/get-users', getUsers)
router.post('/register', registervalidation, register)
router.post('/login', loginvalidation, validationmiddleware, login)
module.exports = router