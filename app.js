const express = require('express')
const cors = require('cors')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const Dialog = require('./models/Dialog')



const app = express()

app.use(cors())

app.use(express.json({ extended: true }))

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))


app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/profile', require('./routes/profile.routes'))
app.use('/api/users', require('./routes/users.route'))
app.use('/api/useraction', require('./routes/useraction.router'))
app.use('/api/dialogs', require('./routes/dialogs.routes'))



const PORT = process.env.PORT || 5000
const io = socket(app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`)))

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        // mongoose.set('debug', true)
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()


io.sockets.on('connection', function (socket) {
    console.log('New Connection')
    socket.on('join', data => {
        socket.join(data.room).on('new message', async msg => {
            socket.broadcast.to(data.room).emit('sending', msg)
            const dialog = await Dialog.findOne({ id: data.room })
            dialog.messages.push(msg)
            await dialog.save()
        })
    })
    socket.on('disconnect', function () {
		console.log('user disconnected')
	})
})

