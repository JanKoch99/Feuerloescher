const nodeMailer = require("nodemailer")

const config = {
    host: process.env.CONFIG_NODEMAILER_HOST,
    port: parseInt(process.env.CONFIG_NODEMAILER_PORT),
    secure: false,
    /*tls: {
        ciphers: "SSLv3"
    },*/
    auth: {
        user: process.env.CONFIG_NODEMAILER_AUTH_USER,
        pass: process.env.CONFIG_NODEMAILER_AUTH_PASS
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
    from: "noreply@qrcheck.app",
    subject: "Rauch erkannt, dein Rauchmelder ist aktiv!",
    text: "Lieber Benutzer,\nIn einem deiner Zimmer wurde Rauch oder Feuer erkannt.\nFür weitere Informationen folgen Sie diesem Link: " + process.env.CORS_URI_FRONT + "\nPanische Grüsse\nDie FeuerLöscher",
}

module.exports = {data, send}