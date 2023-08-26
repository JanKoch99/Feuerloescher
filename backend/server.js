require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const http = require("http");
const {connection} = require("mongoose");
const path = require("path");
const cors = require('cors'); // Import the cors package
const socketIO = require('socket.io')

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const userConnectionRoutes = require('./routes/rasp')


const app = express()
const server = http.createServer(app)

// middleware
app.use(express.json())
app.use(cors()); // Use the cors middleware


let io = socketIO(server);

//videoStream
io.on('connection', (socket) => {
    console.log('A new Websocket connection has been established.')

    socket.on('videoFrame', (frameData) => {
        // Broadcast the received frame to all connected clients
        socket.broadcast.emit('videoFrame', frameData)
    })
})

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Serve the React frontend static files
app.use(express.static(path.join(__dirname, 'frontend/build')));
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

