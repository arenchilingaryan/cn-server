const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')


// /api/users/users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({users})
    } catch (e) {
        return res.status(500).json({ message: 'Error! Try again' })
    }
})

module.exports = router