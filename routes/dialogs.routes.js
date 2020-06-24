const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const Dialog = require('../models/Dialog')


// /api/dialogs/getdialog
router.post('/getdialog', auth, async (req, res) => {
    try {
        const { id } = req.body

        const dialog = await Dialog.findOne({ id })
        if (!dialog) {
            return res.status(400).json({ message: 'Error' })
        }
        return res.status(200).json({ messages: dialog.messages })
    } catch (e) {
        return res.status(500).json({ message: 'Error! Try again' })
    }
})

module.exports = router