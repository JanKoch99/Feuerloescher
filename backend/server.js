require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const userConnectionRoutes = require('./routes/rasp')

const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

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

