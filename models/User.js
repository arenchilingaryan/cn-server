const { Schema, model } = require('mongoose')



const schema = new Schema({
    userName: {type: String, required: false},
    userId: {type: String, required: true},
    img: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phoneNumber: {type: Number, required: false},
    birthday: {type: String, required: false},
    age: {type: String, required: false},
    about: {type: String, required: false},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dialogs: [
        {
            id : {type: String}
        }
    ],
    followers: [
        { img: {type: String}, nickName: {type: String}, id: {type: String} }
    ],
    following: [
        { img: {type: String}, nickName: {type: String}, id: {type: String} }
    ]
})



module.exports = model('User', schema)
