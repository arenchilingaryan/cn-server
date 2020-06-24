const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const Dialog = require('../models/Dialog')
const { v4 } = require('uuid')


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

// /api/profile/message
router.post('/message', auth, async (req, res) => {
    try {
        const { userId, id, message } = req.body

        const me = await User.findOne({ userId: id })
        const user = await User.findOne({ userId })

        let state = false


        me.dialogs.map(async i =>  {
            if (i.with === userId) {
                state = true
            }
        })


        if (state) {
            me.dialogs.map(async i =>  {
                if (i.with === userId) {
                    const dialogItem = { id, message }
                    const dialog = await Dialog.findOne({id: i.id})
                    dialog.messages.push(dialogItem)
                    await dialog.save()
                }
            })
            return res.status(200).json({message: 'pidor'})
        }

        const idx = v4()
        const person = { id: idx, with: userId }
        const personMe = { id: idx, with: id }

        const dialog = new Dialog({
            id: idx,
            messages: [
                { id, message }
            ]
        })

        user.dialogs.push(personMe)
        me.dialogs.push(person)
        await dialog.save()
        await user.save()
        await me.save()

        return res.status(200).json({message: 'Successfuly'})

    } catch (e) {
        return res.status(500).json({ message: 'Error! Please, try again' })
    }
})

module.exports = router