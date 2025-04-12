// Sayfanın tüm <a> etiketlerini seç
const links = document.querySelectorAll('a');

// Sayfa URL'sini al ve sadece domain kısmını çıkar
const currentPageUrl = window.location.hostname; // domain kısmı (örneğin 'tubisad.org.tr')

// Sosyal medya ve diğer istenmeyen domain'lerin bir listesi
const excludedDomains = ['linkedin.com', 'youtube.com', 'twitter.com', 'facebook.com', 'instagram.com', 'x.com'];

// Sayfa URL'lerini tutacak bir set (duplicated URL'leri engeller)
const hrefs = new Set();

// Tüm <a> etiketlerinden href değerlerini topla
links.forEach(link => {
  const href = link.href;

  // Eğer href geçerli ve domain kısmı sayfanın domain'inden farklıysa, set'e ekle
  if (href) {
    const linkDomain = new URL(href).hostname; // bağlantının domain kısmı

    // Eğer linkin domain kısmı şu anki sayfanın domain'i ile eşleşiyorsa, o bağlantıyı geç
    // Ayrıca, sosyal medya ve diğer istenmeyen domain'leri de geç
    if (!linkDomain.includes(currentPageUrl) && !excludedDomains.some(domain => linkDomain.includes(domain))) {
      hrefs.add(linkDomain); // Sadece domain kısmını ekle
    }
  }
});

// Veriyi bir dosyaya kaydetmek için Blob kullan
const blob = new Blob([Array.from(hrefs).join('\n')], { type: 'text/plain' });
const url = URL.createObjectURL(blob);

// Link elemanı oluştur ve indir butonu gibi çalıştır
const a = document.createElement('a');
a.href = url;
a.download = 'url.txt'; // Dosya adı
document.body.appendChild(a);  // Geçici olarak sayfaya ekle
a.click(); // Dosyayı indir
document.body.removeChild(a); // Sonrasında linki sayfadan kaldır
