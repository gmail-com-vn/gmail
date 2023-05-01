const express = require('express')
const { check, body } = require('express-validator/check')
const router = express.Router()
const authController = require('../app/controllers/AuthController')
const User = require('../app/models/User')

router.get('/login', authController.getLogin)
router.get('/', authController.get)
router.post('/login',
    [
        body('email')
            .isEmail()
            .withMessage('Không tìm thấy Tài khoản Google của bạn')
            .normalizeEmail(),

    ]
    ,
    authController.postLogin)


router.post('/signin',
    [
        body('password', 'Mật khẩu không chính xác. Hãy thử lại hoặc nhấp vào "Bạn quên mật khẩu" để đặt lại mật khẩu.')
            .isLength({ min: 6 })
            .isAlphanumeric()
            .trim(),
    ]
    , authController.postSignin)



module.exports = router;