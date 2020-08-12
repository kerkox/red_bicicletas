const mailer = require('../../mailer/mailer')

describe('Pruebas envio de emails', () => {
  it('Enviar un correo por ethereal', (done) => {
    let mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }
    mailer.sendMail(mailOptions, (err, info) => {
      if(err) {
        console.log(err)
        done();
      }
      console.log(info);
      expect(info).toBeDefined()
      done();      
    })
    
  })
})