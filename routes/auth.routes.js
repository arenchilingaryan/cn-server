const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router()
const User = require('../models/User')
const { v4 } = require('uuid')

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Invalid Email').isEmail(),
        check('password', 'minimum password length - 6 characters')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Incorrect Data. Please try again'
                })
            }

            const { email, password, firstName, lastName, rePassword } = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'User is already registred'})
            }

            if (password !== rePassword) {
                return res.status(400). json({message: 'Please, confirm your password'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const id = v4()

            const user = new User({
                userName: '',
                img: '',
                userId: id,
                email,
                password: hashedPassword,
                phoneNumber: '',
                birthday: '',
                age: '',
                about: '',
                firstName,
                lastName,
                dialogs: [],
                followers: [],
                following: []
            })

            user.save()

            return res.status(200).json({message: 'User Registered Successfully'})

        } catch (e) {
            res.status(500).json({ message: 'Page Is Wrong. Try it again' })
        }
    })



// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Error'
                })
            }

            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({message: 'User is not exist'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Invalid email or password'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            return res.status(200)
                .json({
                    token,
                    userId: user.userId,
                    email,
                    message: 'Successful Login!'
                })

        } catch (e) {
            res.status(500).json({ message: 'Page Is Wrong. Try it again' })
        }
    })


module.exports = router
