require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const userConnectionRoutes = require('./routes/rasp')
const http = require("http");
const {connection} = require("mongoose");
const path = require("path");

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
//videoStream
io.on('connection', (socket) => {
    console.log('A new Websocket connection has been established.')

    socket.on('videoFrame', (frameData) => {
        // Broadcast the received frame to all connected clients
        socket.broadcast.emit('videoFrame', frameData)
    })
})


// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(express.static(path.join(__dirname, 'frontend/build')))
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)
app.use('/api/rasp', userConnectionRoutes)



mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listenning on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

