const express = require('express')

//controller functions
const {userConnection, triggerAlarm} = require('../controllers/raspController')

const router = express.Router()

//unregistered user connect with device
router.post('/userconnection', userConnection)

router.get('/alarm/:id', triggerAlarm)

module.exports = router