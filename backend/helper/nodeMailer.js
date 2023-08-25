const nodeMailer = require("nodemailer")

const config = {
    service: "dalcloud",
    host: "mail.dalcloud.net",
    port: "587",
    secure: "STARTTLS",
    auth: {
        user: "noreply@qrcheck.dev",
        pass: "_,41,sIoGyMNOlOuStOoDrANicaRCeepERyOw"
    }
}


const send = (data) => {
    const transporter = nodeMailer.createTransport(config)
    transporter.sendMail(data, (err, info) => {
        if (err){
            console.log(err)
        } else {
            return info.response
        }
    })
}

const data ={
        "from": "noreply@qrcheck.app",
        "subject": "Rauch erkannt, dein Rauchmelder ist aktiv!",
        "text": "Lieber Benutzer \nIn einem deiner Zimmer wurde Rauch erkannt.\nWeitere Infos drücken sie Hier."
}

module.exports = {data, send}