const mailer = require('../../mailer/mailer')

describe('Pruebas envio de emails', () => {
  it('Enviar un correo por ethereal', (done) => {
    mailer.sendEmailTest().then(dataMail => {
      console.log(dataMail);
      expect(dataMail.messageURL).toBeDefined()
      done();
    }).catch(err => {
      console.log(err)
      done();
    })
    
  })
})