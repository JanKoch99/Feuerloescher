const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const raspConnectionSchema = new Schema({
    mail: {
        type: String,
        unique: false
    },
    phone: {
        type: String,
        unique: false
    },
    rasp_id: {
        type: String,
        required: true,
    },
    deactivated: {
        type: Boolean,
        default: false
    }
})

raspConnectionSchema.statics.connect = async function(mail, phone, rasp_id) {
    //validation


    if (!rasp_id) {
        throw Error('Scannen Sie noch einmal den QR-Code oder klicken Sie noch einmal auf den Link.')
    }

    if (!mail.length > 0 && !phone.length > 0) {
        throw Error('Email or phone must be filled!')
    }

    if (mail.length > 0 && !validator.isEmail(mail)) {
        throw Error('Email is not valid')
    }

    let existMail
    let existPhone

    if (mail.length > 0) {
        existMail = await this.findOne({mail: mail})
    }
    if (phone.length > 0) {
        existPhone = await this.findOne({phone: phone})
    }

    if ((existMail && existMail.rasp_id === rasp_id) || (existPhone && existPhone.rasp_id === rasp_id)) {
        throw Error('Email or Phone is already in use')
    }

    const raspConnection = await this.create({mail: mail, phone: phone, rasp_id: rasp_id})

    return raspConnection
}

module.exports = mongoose.model('RaspConnection', raspConnectionSchema)