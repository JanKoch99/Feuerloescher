const RaspConnection = require('../models/raspConnectionModel')
const mongoose = require("mongoose");
const {send, data} = require("../helper/nodeMailer");

const userConnection = async (req, res) => {
    const {mail, phone, rasp_id} = req.body
    console.log(mail)

    try {
        const raspConnection = await RaspConnection.connect(mail, phone, rasp_id)

        res.status(200).json({raspConnection})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const triggerAlarm = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such rasp'})
    }

    const raspConnections = await RaspConnection.find({rasp_id: id})

    if (!raspConnections) {
        return res.status(404).json({error: 'No such rasp'})
    }

    await sendMailsAndPhone(raspConnections)

    res.status(200).json({success: 'alarm triggered'})
}

const sendMailsAndPhone = async (raspConnections) => {

    raspConnections.forEach((raspConnection) => {
        if (raspConnection.mail) {
            send({from: data.from, to: 'Z4l3s5i0@hotmail.com', subject: data.subject, text: data.text })
        }
        if (raspConnection.phone) {
            sendPhone(raspConnection)
        }
    })
}

const sendMail = async (raspConnection) => {

}

const sendPhone = async (raspConnection) => {

}

module.exports = {userConnection, triggerAlarm}