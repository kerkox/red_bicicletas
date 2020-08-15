const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')

let mailConfig;

if (process.env.NODE_ENV === "production") {
    const options = {
        auth: {
            api_key: process.env.SENDGRID_API_SECRET,
        },
    };
    mailConfig = sgTransport(options);
} else {
    if (process.env.NODE_ENV === "staging") {
        const options = {
            auth: {
                api_key: process.env.SENDGRID_API_SECRET,
            },
        };
        mailConfig = sgTransport(options);
    } else {
        mailConfig = {
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: process.env.ETHEREAL_EMAIL_USER_DEV,
                pass: process.env.ETHEREAL_EMAIL_PASS_DEV
            },
        };
    }
}

module.exports = nodemailer.createTransport(mailConfig);