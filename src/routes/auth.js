const {Router} = require('express')
const { getUsers, register, login, protected, logout} = require('../controllers/auth')
const { registervalidation, loginvalidation } = require('../validators/auth')
const { validationmiddleware } = require('../middlewares/validation-middleware')
const { userAuth } = require('../middlewares/auth-middleware')
const router = Router()

router.get('/get-users', getUsers)
router.get('/protected', userAuth, protected)
router.post('/register', registervalidation, validationmiddleware,register)
router.post('/login', loginvalidation, validationmiddleware, login)
router.get('/logout', userAuth, logout)
module.exports = router