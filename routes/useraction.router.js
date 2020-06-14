const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')


// /api/useraction/follow
router.post('/follow', auth, async (req, res) => {
    const { userId, myId } = req.body
    try {
        const me = await User.findOne({ userId: myId })
        const user = await User.findOne({ userId })

        const newFollowing = { img: user.img, nickName: user.nickName, id: user.userId }

        me.following.push(newFollowing)
        
        const newFollower = { img: me.img, me: user.nickName, me: user.userId }

        user.followers.push(newFollower)
        await me.save()
        await user.save()

        return res.status(200).json({message: 'Successfuly!'})
    } catch (e) {
        return res.status(500).json({ message: 'Error!' })
    }
})

// /api/useraction/unfollow
router.post('/unfollow', auth, async (req, res) => {
    const { userId, myId } = req.body
    try {
        const me = await User.findOne({ userId: myId })
        const user = await User.findOne({ userId })

        const idx = me.following.indexOf(el => el.userId === userId)

        me.following.splice(idx)
        
        const id = user.followers.indexOf(el => el.userId === myId)

        user.followers.slice(id)
        await me.save()
        await user.save()

        return res.status(200).json({message: 'Successfuly!'})
    } catch (e) {
        return res.status(500).json({ message: 'Error!' })
    }
})

module.exports = router