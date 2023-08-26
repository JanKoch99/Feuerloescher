require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const {connection} = require("mongoose");
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const userConnectionRoutes = require('./routes/rasp')
const cors = require('cors')

const {createServer} = require("https");
const { WebSocketServer } = require('ws');
const {create} = require("axios");
const {data} = require("./helper/nodeMailer");
const app = express()

app.use(cors({
    origin: [process.env.CORS_URI_FRONT,'http://localhost:3000']
}))

// middleware
app.use(express.json())


const WS_PORT = process.env.PORT2;
const HTTP_PORT = process.env.PORT;
//websocket config

const server = createServer();
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws, request, client) => {
    ws.on('error', console.error);

    ws.on('message', (frameData) => {
        console.log(ws)
        // Broadcast the received frame to all connected clients
        wsServer.clients.forEach(client => client.send(frameData))

    })
})
server.on('upgrade', function upgrade(request, socket, head) {
    socket.on('error', onSocketError);

    // This function is not defined on purpose. Implement it with your own logic.
    authenticate(request, function next(err, client) {
        if (err || !client) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }

        socket.removeListener('error', onSocketError);

        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request, client);
        });
    });
});
server.listen(WS_PORT);
console.log(`Ws listening on Port ${WS_PORT}`)
//videoStream
/*
const wsServer = new WebSocket.Server({ port: WS_PORT }, () => console.log(`WS server is listening at ws://localhost:${WS_PORT}`));
wsServer.on('connection', (ws, req) => {
    console.log('A new Websocket connection has been established.')

    ws.on('message', (frameData) => {
        console.log(ws)
        // Broadcast the received frame to all connected clients
        wsServer.clients.forEach(client => client.send(frameData))
    })
})
*/

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

