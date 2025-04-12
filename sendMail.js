                                           
const fs = require('fs');
const nodemailer = require('nodemailer');

// Transporter oluşturma
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yusuferoglu1957@gmail.com',  // Gönderen e-posta adresi
    pass: 'xxxx xxxx xxxx xxxx'     // eğer 2F doğrulama var ise Uygulama şifresi veya mail adresi şifresi
  }
});

// maild.txt dosyasından alıcıları oku
fs.readFile('mail.txt', 'utf8', (err, data) => {
  if (err) {
    console.log('Dosya okunamadı:', err);
    return;
  }

  // E-posta adreslerini al ve virgülle ayırarak birleştir
  const recipients = data.split('\n').map(email => email.trim()).join(',');

  // E-posta içeriği
  const mailOptions = {
    from: 'yusuferoglu1957@gmail.com',  // Gönderen e-posta adresi
    to: recipients,  // Alıcı e-posta adresleri
    subject: 'Test E-posta',
    text: 'Bu bir test e-posta mesajıdır.'
  };

  // E-posta gönderme
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('E-posta gönderilemedi:', error);
    } else {
      console.log('E-posta gönderildi:', info.response);
    }
  });
});
