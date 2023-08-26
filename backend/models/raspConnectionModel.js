const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const raspConnectionSchema = new Schema({
    mail: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
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

    if (!mail && !phone) {
        throw Error('Email or phone must be filled!')
    }

    if (!validator.isEmail(mail)) {
        throw Error('Email is not valid')
    }

    const exist = await this.findOne({$or: [{mail: mail}, {phone: phone}]})

    if (exist) {
        throw Error('Email or Phone is already in use')
    }

    const raspConnection = await this.create({mail: mail, phone: phone, rasp_id: rasp_id})

    return raspConnection
}

module.exports = mongoose.model('RaspConnection', raspConnectionSchema)