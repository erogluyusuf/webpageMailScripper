const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');
const pdfFilePath = path.join(__dirname, 'yusuf_eroglu.pdf'); // PDF dosyanızın yolu
// Mail içeriğini almak için bir fonksiyon
function getEmailContent() {
    const emailBody = `
    <p>Merhaba, ben Yusuf Eroğlu.</p>

<div dir="ltr"><table style="direction:ltr;border-collapse:collapse"><tbody><tr><td style="font-size:0;height:12px;line-height:0"></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" style="width:100%" width="100%"><tbody><tr><td><table cellpadding="0" cellspacing="0" width="100%" style="width:100%;line-height:normal"><tbody><tr><td style="font-family:Arial;text-align:left"><p style="font-size:17px;margin:1px"></p><p style="margin:1px"><img style="height:69px" src="https://d36urhup7zbd7q.cloudfront.net/anonymous_user/no_sig_173627012447/1c60d4ff-a4f1-4cc2-833e-7b47fc037114/signoff.gif?ck=1736270124.47" alt="Yusuf Eroglu" height="69"></p></td></tr></tbody></table></td></tr><tr><td style="line-height:1%;padding-top:16px;font-size:1px"></td></tr><tr><td><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;line-height:1.15"><tbody><tr><td style="vertical-align:top;padding:.01px 14px 0.01px 1px;width:65px;text-align:center"><p style="margin:1px"><img border="0" src="https://d36urhup7zbd7q.cloudfront.net/a/5bbbde0b-6ec1-4254-bbf5-3a16f38be8ba__400x400__.jpeg" height="65" width="65" alt="photo" style="width:65px;vertical-align:middle;border-radius:0;height:65px;border:0;display:block"></p></td><td valign="top" style="padding:.01px 0.01px 0.01px 14px;vertical-align:top;border-left:solid 1px #bdbdbd"><table cellpadding="0" cellspacing="0" style="border-collapse:collapse"><tbody><tr><td style="padding:.01px"><p style="margin:.1px;line-height:120%;font-size:16px"><span style="font-family:Arial;font-size:16px;font-weight:bold;color:#646464;letter-spacing:0;white-space:nowrap">YUSUF EROĞLU</span><br><span style="font-family:Arial;font-size:13px;font-weight:bold;color:#646464;white-space:nowrap">Yazılım Geliştiricisi</span></p></td></tr><tr><td><table cellpadding="0" cellspacing="0" style="border-collapse:collapse"><tbody><tr><td nowrap="" width="325" style="padding-top:14px;white-space:nowrap;width:325px;font-family:Arial"><p style="margin:1px;line-height:99%;font-size:11px"><span style="white-space:nowrap"><a href="tel:+90(537)6258196" style="font-family:Arial;text-decoration:unset" rel="nofollow noreferrer" target="_blank"><span style="line-height:120%;font-family:Arial;font-size:11px;color:#212121;white-space:nowrap">+90 (537) 625 81 96</span></a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="mailto:yusuferoglu1957@gmail.com" style="font-family:Arial;text-decoration:unset" rel="nofollow noreferrer" target="_blank"><span style="line-height:120%;font-family:Arial;font-size:11px;color:#212121;white-space:nowrap">yusuferoglu1957@gmail.com</span></a></span></p></td></tr><tr><td nowrap="" width="100" style="padding-top:8px;white-space:nowrap;width:100px;font-family:Arial"><p style="margin:1px;line-height:99%;font-size:11px"><span style="white-space:nowrap"><a href="https://maps.google.com/?q=Darıca/Kocaeli" style="font-family:Arial;text-decoration:unset" rel="nofollow noreferrer" target="_blank"><span style="line-height:120%;font-family:Arial;font-size:11px;color:#212121;white-space:nowrap">Darıca/Kocaeli</span></a></span></p></td></tr></tbody></table></td></tr><tr><td style="padding:14px 0.01px 0.01px 0.01px"><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td align="left" style="padding-right:6px;text-align:center;padding-top:0"><p style="margin:1px"><a href="https://github.com/erogluyusuf" rel="nofollow noreferrer" target="_blank"><img width="24" height="24" src="https://cdn.gifo.wisestamp.com/s/gh/4183c4/48/0/background.png" style="float:left;border:none" border="0" alt="github"></a></p></td><td align="left" style="padding-right:6px;text-align:center;padding-top:0"><p style="margin:1px"><a href="https://medium.com/@erogluyusuf" rel="nofollow noreferrer" target="_blank"><img width="24" height="24" src="https://cdn.gifo.wisestamp.com/s/med/e0393e/48/0/background.png" style="float:left;border:none" border="0" alt="medium"></a></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="line-height:1%;padding-top:16px;font-size:1px"></td></tr><tr><td><table cellpadding="0" cellspacing="0" style="min-width:100%;max-width:469px;line-height:normal"><tbody><tr><td width="1%" style="padding-right:6px;border-right:1px solid #e5e5e5"><p style="margin:1px"><img border="0" src="https://images.wisestamp.com/widgets/green_32.png" alt="Green"></p></td><td style="color:#008000;font-size:12px;padding:0 8px 0 8px;vertical-align:middle;font-family:Arial"><p style="margin:1px">Please consider your environmental responsibility. Before printing this e-mail message, ask yourself whether you really need a hard copy.</p></td></tr></tbody></table></td></tr><tr><td style="line-height:1%;padding-top:16px;font-size:1px"></td></tr><tr><td><table cellpadding="0" cellspacing="0" style="max-width:600px;padding-right:8px"><tbody><tr><td><p style="margin:1px"><a href="https://www.linkedin.com/in/erogluyusuf" rel="nofollow noreferrer" target="_blank"><img width="170" height="40" src="https://cdn.gifo.wisestamp.com/apps/fixed_button/full/Lets%20connect!/_mc_ffffff,0077b5_mc_/30/10/linkedin-50/left/40,28,340,80.png" alt="App Social Buttons Image"></a>&nbsp;</p></td></tr></tbody></table></td></tr><tr><td style="line-height:1%;padding-top:16px;font-size:1px"></td></tr></tbody></table></td></tr><tr><td style="font-family:'ws-id MBva1pe9bQL';font-size:.01px;line-height:0">&nbsp;</td></tr></tbody></table></div>
    `;
    return emailBody;
}

// Transporter oluşturma
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yusuferoglu1957@gmail.com',  // Gönderen e-posta adresi
    pass: 'xxxx xxxx xxxx xxxx'     // 2F doğrulama var ise uygulama şifresi yok ise mail şifresi
  }
});

    // E-posta içeriğini alıyoruz
    const emailContent = getEmailContent();


// maild.txt dosyasından alıcıları oku
fs.readFile('maild.txt', 'utf8', (err, data) => {
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
    subject: 'Test Deneme hk.',
    html: emailContent,
    attachments: [
        {
            filename: 'yusuf_eroglu.pdf', // Eklenecek PDF dosyasının adı
            path: pdfFilePath   // Dosyanın yeri
        }
    ],
    headers: {
        'priority': 'high', // 1 = High, 3 = Normal, 5 = Low
        'importance': 'high', // Önem derecesini "high" olarak belirledik
        'x-msmail-priority': 'high',
        'x-priority':'1'
    }
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
