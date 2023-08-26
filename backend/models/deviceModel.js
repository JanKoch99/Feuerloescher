const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rasp_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Device', deviceSchema)