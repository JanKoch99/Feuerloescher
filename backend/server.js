require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const {connection} = require("mongoose");
const cors = require('cors'); // Import the cors package

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const userConnectionRoutes = require('./routes/rasp')

const WebSocket = require('ws')
const app = express()

// middleware
app.use(express.json())
app.use(cors()); // Use the cors middleware


const WS_PORT = process.env.PORT2;
const HTTP_PORT = process.env.PORT;

//videoStream
const wsServer = new WebSocket.Server({ port: WS_PORT }, () => console.log(`WS server is listening at ws://localhost:${WS_PORT}`));
wsServer.on('connection', (ws, req) => {
    console.log('A new Websocket connection has been established.')

    ws.on('message', (frameData) => {
        // Broadcast the received frame to all connected clients
        ws.clients.forEach(client => client.send(frameData))
    })
})

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Serve the React frontend static files
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)
app.use('/api/rasp', userConnectionRoutes)


mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log('connected to db and listenning on port', HTTP_PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

