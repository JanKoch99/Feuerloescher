const express = require('express')

const {getDevicesForUser, deleteDevice, createDevice} = require('../controllers/deviceController')

const router = express.Router()

router.get('/devicesForUser/:id', getDevicesForUser)

router.delete('/delete/:id', deleteDevice)

router.put('/', createDevice)

module.exports = router