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

    const raspConnections = await RaspConnection.find({rasp_id: id}).sort({debug: 1})
    console.log(raspConnections)

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

    for (let i=0; i <raspConnections.length; i++){
        try {
            let link;

            if (raspConnections[i].deactivated) {
                return
            }
            if (raspConnections[i].debug){
                link=process.env.LINK_VIDEO
            } else {
                link=process.env.LINK_BILD
            }
            let text1 = "Lieber Benutzer,\nIn einem deiner Zimmer wurde Rauch oder Feuer erkannt.\nFür weitere Informationen folgen Sie diesem Link: " + link + "\nPanische Grüsse\nDie FeuerLöscher"

            if (raspConnections[i].mail.length > 0) {
                send({from: data.from, to: raspConnections[i].mail, subject: data.subject, text: text1})
            }
            if (raspConnections[i].phone.length > 0) {
                console.log("PHONE")
                await sendPhone(raspConnections[i].phone, text1)
            }

            await disableRaspConnection(raspConnections[i])
            await new Promise(r => setTimeout(r, 300));
        } catch (error) {
            console.log(error)
        }

    }
}

const disableRaspConnection = async (raspConnection) => {

    let raspConnectionUpdated = null

    if (raspConnection.mail.length > 0) {
        raspConnectionUpdated = await RaspConnection.findOneAndUpdate({mail: raspConnection.mail}, {
            ...{deactivated: true}
        })
    } else if (raspConnection.phone.length > 0) {
        raspConnectionUpdated = await RaspConnection.findOneAndUpdate({phone: raspConnection.phone}, {
            ...{deactivated: true}
        })
    }

    if (!raspConnectionUpdated) {
        throw Error('RaspConnection could not be updated')
    }

    return raspConnectionUpdated
}

const sendPhone = async (phone, text1) => {
    const smsKey = `${process.env.SMS_KEY}`
    const text = text1
    const debug = 0
    const from = "Feuerloescher"
    const details = 1
    const url = `https://gateway.sms77.io/api/sms?p=${smsKey}&to=${phone}&text=${text}&debug=${debug}&from=${from}&details=${details}`
    try {
        await axios.get(url)
    } catch (error) {
        console.log(error)
    }
}

const enableAllRaspConnections = async (req, res) => {

    const raspConnections = await RaspConnection.find({deactivated: true})

    try {
        await enableRaspConnection(raspConnections)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

    res.status(200).json({success: 'resetted'})
}

const enableRaspConnection = async (raspConnections) => {
    for (const raspConnection of raspConnections) {

        let raspConnectionUpdated = null

        if (raspConnection.mail.length > 0) {
            raspConnectionUpdated = await RaspConnection.findOneAndUpdate({mail: raspConnection.mail}, {
                ...{deactivated: false}
            })
        } else if (raspConnection.phone.length > 0) {
            raspConnectionUpdated = await RaspConnection.findOneAndUpdate({phone: raspConnection.phone}, {
                ...{deactivated: false}
            })
        }

        if (!raspConnectionUpdated) {
            throw Error('RaspConnection could not be updated')
        }
    }
}

module.exports = {userConnection, triggerAlarm, enableAllRaspConnections}