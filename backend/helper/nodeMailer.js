const nodeMailer = require("nodemailer")
let link = process.env.LINK_BILD;
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


const send = (data, isVideo) => {
    if(isVideo) {
        link = process.env.LINK_VIDEO
    }

    if (!isVideo) {
        link= process.env.LINK_BILD
    }
    console.log('link', link)
    const transporter = nodeMailer.createTransport(config)
    transporter.sendMail(data(link), (err, info) => {
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
    text: "Lieber Benutzer,\nIn einem deiner Zimmer wurde Rauch oder Feuer erkannt.\nFür weitere Informationen folgen Sie diesem Link: " + link + "\nPanische Grüsse\nDie FeuerLöscher",
}

module.exports = {data, send}