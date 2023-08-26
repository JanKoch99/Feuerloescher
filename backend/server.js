require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const {connection} = require("mongoose");
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const userConnectionRoutes = require('./routes/rasp')
const deviceRoutes = require('./routes/device')
const cors = require('cors')
const http = require('http');

const WebSocket = require('ws')
const app = express()
const server = http.createServer(app);

app.use(cors({
    origin: [process.env.CORS_URI_FRONT,'http://localhost:3020','http://localhost:3000']
}))

// middleware
app.use(express.json())


const WS_PORT = process.env.PORT2;
const HTTP_PORT = process.env.PORT;

// videoStream
const wsServer = new WebSocket.Server({ server });
wsServer.on('connection', (ws, req) => {
    console.log('A new Websocket connection has been established.')

    ws.on('message', (frameData) => {
        console.log(ws)
        // Broadcast the received frame to all connected clients
        wsServer.clients.forEach(client => client.send(frameData))
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
app.use('/api/device', deviceRoutes)


mongoose.connect(process.env.MONG_URI)
    .then(() => {
        server.listen(HTTP_PORT, () => {
            console.log('connected to db and listenning on port', HTTP_PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

