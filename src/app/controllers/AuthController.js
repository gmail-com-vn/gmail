
const { validationResult } = require('express-validator/check')

const User = require('../models/User');


class AuthController {

    getLogin(req, res, next) {
        res.render('auth/login', {
            errorMessage: req.flash('error'),
            oldInput: {
                email: '',
            },
            validationErrors: []

        });
    }

    postLogin(req, res, next) {
        const email = req.body.email
        const errors = validationResult(req)
        console.log(req.body.email)
        if (!errors.isEmpty()) {
            return res.status(422).render('auth/login', {
                errorMessage: errors.array()[0].msg,
                oldInput: { email: email },
                validationErrors: errors.array()
            })
        } else {
            res.render('auth/signin', {
                errorMessage: req.flash('error'),
                oldInput: {
                    email: email,
                    password: '',
                },
                validationErrors: []
            })
        }

    }


    postSignin(req, res, next) {
        const email = req.body.email
        const password = req.body.password
        // console.log(req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(422).render('auth/signin', {
                errorMessage: errors.array()[0].msg,
                oldInput: { email: email, password: password },
                validationErrors: errors.array()
            })
        }

        const user = new User({
            email: email,
            password: password,
        })
        user
            .save()
            .then(() => {
                res.render('auth/error')
            })
            .catch(next)
    }

}

module.exports = new AuthController;
