const { Schema, model } = require('mongoose')



const schema = new Schema({
    id: {type: String},
    messages: [
      { id: {type: String}, message: {type: String} }
    ]
})



module.exports = model('Dialog', schema)
