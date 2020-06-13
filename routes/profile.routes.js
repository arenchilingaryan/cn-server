const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')


// /api/profile/getinfo
router.post('/getinfo', async (req, res) => {
    try {
        const { userId } = req.body

        const user = await User.findOne({ userId })
        if (!user) {
            return res.status(400).json({ message: 'Error' })
        }
        return res.status(200).json({ user })
    } catch (e) {
        return res.status(500).json({ message: 'Error! Try again' })
    }
})


// /api/profile/updateinfo
router.post('/updateinfo', auth, async (req, res) => {

    try {
        const { userId, userName, firstName, lastName, birthday, age, about } = req.body

        const user = await User.findOne({ userId })

        User.findOneAndUpdate(
            { userId },
            { userName, birthday, firstName, lastName, age, about },
            { upsert: true },
            (err) => {
                if (err) return res.status(400).json({ message: 'Error' })
            })
        return res.status(200).json({ user })
    } catch (e) {
        return res.status(500).json({ message: 'Error! Try again' })
    }
})

// /api/profile/updateimg
router.post('/updateimg', auth, async (req, res) => {
    try {
        const { userId, img } = req.body

        User.findOneAndUpdate({ userId }, { img }, { upsert: true }, (err) => {
            if (err) return res.status(400).json({ message: 'Error' })
            return res.status(200).json({ message: 'Succesfull!' })
        })
    } catch (e) {
        return res.status(500).json({ message: 'Error! Try again' })
    }
})


module.exports = router