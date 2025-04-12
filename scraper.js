const fs = require('fs');
const path = require('path');

// URLs dosyasının yolu
const filePath = path.join(__dirname, 'urls.txt');

// Hedef dizin
const targetDir = path.join(__dirname, 'hrefs');

// Hedef dizini oluşturma
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

// URLs dosyasını okuma
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Dosya okunamadı:', err);
    return;
  }

  // URL'leri satır satır ayırma
  const urls = data.split('\n').filter(url => url.trim() !== '');

  // URLs dosyasına her URL için bir dosya oluşturma
  urls.forEach((url, index) => {
    const fileName = `url_${index + 1}.txt`;
    const fileUrl = path.join(targetDir, fileName);

    fs.writeFile(fileUrl, url, 'utf8', (err) => {
      if (err) {
        console.error(`URL yazılırken hata oluştu: ${url}`, err);
      } else {
        console.log(`URL başarıyla yazıldı: ${url}`);
      }
    });
  });
});
