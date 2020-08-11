const nodemailer = require('nodemailer')

const sendEmailTest = async function () {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'lula31@ethereal.email',
      pass: 'hJDv3VcHmjWryTEhW2'
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });


  let messageId = info.messageId
  let messageURL = nodemailer.getTestMessageUrl(info)



  console.log("Message sent: %s", messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", messageURL);
  let dataMail = {
    messageId,
    messageURL
  }
  return dataMail

}

module.exports = {
  sendEmailTest
}