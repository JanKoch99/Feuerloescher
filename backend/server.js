require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
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

const HTTP_PORT = process.env.PORT;

// videoStream
const wsServer = new WebSocket.Server({ server });
wsServer.on('connection', (ws, req) => {
    console.log('A new Websocket connection has been established.')
    const query = new URL(req.url, process.env.CORS_URI_FRONT).searchParams;
    const debug = query.get('debug'); // Access the value of the debug parameter
    ws.on('message', (frameData) => {
        // Broadcast the received frame to all connected clients
        wsServer.clients.forEach(async (client) => {
            if (debug==="cTul2qVg9AViHLwjilIvUtqOZyQMDv") {
                client.send(frameData)
            }
            else{
                //image
                client.send(null)
            }
        })
    })
})

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Serve the React frontend static files
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

