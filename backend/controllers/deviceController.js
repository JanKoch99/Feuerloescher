const Device = require('../models/deviceModel')

const getDevicesForUser = async (req, res) => {
    const {id} = req.params

    try {
        const devices = await Device.find({user_id: id})

        res.status(200).json({devices})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteDevice = async (req, res) => {
    const {id} = req.params

    try {
        const device = await Device.findOneAndDelete({_id: id})

        if (!device) {
            return res.status(404).json({error: 'Gerät nicht gefunden'})
        }

        res.status(200).json(device)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const createDevice = async (req, res) => {
    const {name, rasp_id, user_id} = req.body

    try {
        const device = await Device.create({name, rasp_id, user})

        res.status(200).json(device)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getDevicesForUser,
    deleteDevice,
    createDevice
}