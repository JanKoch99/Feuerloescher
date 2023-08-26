const express = require('express')

//controller functions
const {userConnection, triggerAlarm, enableAllRaspConnections} = require('../controllers/raspController')

const router = express.Router()

//unregistered user connect with device
router.post('/userconnection', userConnection)

router.get('/alarm/:id', triggerAlarm)

router.get('/enable', enableAllRaspConnections)


module.exports = router