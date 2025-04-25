const fs = require('fs');

// urls.txt dosyasını oku
fs.readFile('urls.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Dosya okunurken bir hata oluştu:', err);
    return;
  }

  // Satırları ayıralım
  const lines = data.split('\n');

  // E-posta adreslerini oluştur
  const emails = lines.map(line => {
    let domain = line.trim(); // domain kısmını al
    domain = domain.replace(/^www\./, ''); // Başındaki 'www.' kısmını kaldır

    if (domain) {
      return [
        `info@${domain}`,
        `career@${domain}`,
        `kariyer@${domain}`
      ];
    }
    return [];
  });

  // Düzenlenmiş e-posta adreslerini birleştir
  const updatedEmails = emails.flat().join('\n');

  // Sonuçları yeni bir dosyaya yaz
  fs.writeFile('updated_emails.txt', updatedEmails, (err) => {
    if (err) {
      console.error('Dosya yazılırken bir hata oluştu:', err);
      return;
    }
    console.log('Dosya başarıyla yazıldı: updated_emails.txt');
  });
});
