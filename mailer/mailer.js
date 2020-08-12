const nodemailer = require('nodemailer')

const mailConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'lula31@ethereal.email',
    pass: 'hJDv3VcHmjWryTEhW2'
  }
}

module.exports = nodemailer.createTransport(mailConfig);