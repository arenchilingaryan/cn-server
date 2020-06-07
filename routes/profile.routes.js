const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')


// /api/profile/getinfo
// router.post('/getinfo', auth, async (req, res) => {
//     try {
//         const { email, userId } = req.body

//         if (!email) {
//             return res.status(400).json({ message: 'Your email is not valid' })
//         }

//         if (!userId) {
//             return res.status(400).json({ message: 'Your id is not valid' })
//         }
//         const user = await User.findOne({ email })
//         const history = await Views.find({ owner: email })
//         return res.status(200).json({ user, history })
//     } catch (e) {
//         return res.status(400).json({ message: 'Error! Try again' })
//     }
// })


// /api/profile/updateinfo
// router.post('/updateinfo', auth, async (req, res) => {
//     try {
//         const { _id, email, userName, birthday, languages, phoneNumber, locationProfile, age, about } = req.body

//         User.findOneAndUpdate(
//             { email },
//             { userName, birthday, languages, phoneNumber, locationProfile, age, about },
//             { upsert: true },
//             (err) => {
//                 if (err) return res.status(400).json({ message: 'Error' })
//                 return res.status(200).json({ message: 'Succesfull!' })
//             })
//     } catch (e) {
//         return res.status(400).json({ message: 'Error! Try again' })
//     }
// })

// /api/profile/updateimg
// router.post('/updateimg', auth, async (req, res) => {
//     try {
//         const { email, img } = req.body

//         User.findOneAndUpdate({ email }, { img }, {upsert:true}, (err) => {
//             if (err) return res.status(400).json({ message: 'Error' })
//             return res.status(200).json({ message: 'Succesfull!' })
//         })
//     } catch (e) {
//         return res.status(400).json({ message: 'Error! Try again' })
//     }
// })


module.exports = router