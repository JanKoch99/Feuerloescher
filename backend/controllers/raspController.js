const RaspConnection = require('../models/raspConnectionModel')
const {send, data} = require("../helper/nodeMailer");
const axios = require("axios");

const userConnection = async (req, res) => {
    const {mail, phone, rasp_id} = req.body

    try {
        const raspConnection = await RaspConnection.connect(mail, phone, rasp_id)

        res.status(200).json({raspConnection})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const triggerAlarm = async (req, res) => {
    const {id} = req.params

    const raspConnections = await RaspConnection.find({rasp_id: id})

    if (!raspConnections) {
        return res.status(404).json({error: 'No such rasp'})
    }

    try {
        await sendMailsAndPhone(raspConnections)
    } catch (error) {
        return res.status(404).json({error: 'RaspConnection could not be updated'})
    }

    res.status(200).json({success: 'alarm triggered'})
}

const sendMailsAndPhone = async (raspConnections) => {

    raspConnections.forEach((raspConnection) => {
        if (raspConnection.deactivated) {
            return
        }
        if (raspConnection.mail) {
            send({from: data.from, to: raspConnection.mail, subject: data.subject, text: data.text })
        }
        if (raspConnection.phone) {
            sendPhone(raspConnection.phone)
        }
        disableRaspConnection(raspConnection)

    })
}

const disableRaspConnection = async (raspConnection) => {

    const raspConnectionUpdated = await RaspConnection.findOneAndUpdate({$or: [{mail: raspConnection.mail}, {phone: raspConnection.phone}]}, {
        deactivated: true
    })

    if (!raspConnectionUpdated) {
        throw Error('RaspConnection could not be updated')
    }

    return raspConnectionUpdated
}

const sendPhone = async (phone) => {
    const smsKey = `${process.env.SMS_KEY}`
    const text = "TestibusTotalus"
    const debug = 1
    const from = "Feuerloescher"
    const details = 1
    const url = `https://gateway.sms77.io/api/sms?p=${smsKey}&to=${phone}&text=${text}&debug=${debug}&from=${from}&details=${details}`
    try {
        const response = await axios.get(url)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }


}

module.exports = {userConnection, triggerAlarm}