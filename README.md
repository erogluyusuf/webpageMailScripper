# 🕸️ Domain & Mail Scraper % Send Mail

Bu proje, iki aşamalı bir web kazıyıcı (scraper) sistemidir:

1. **Domainleri Toplama:** Hedef bir web sayfasındaki dış bağlantıları (domainleri) toplar.
2. **E-posta Adreslerini Toplama:** Toplanan domainlerin sayfalarında gezerek e-posta adreslerini bulur.

---

## 📂 Dosya Yapısı

. ├── domainScraper.js # Sayfadaki domainleri tarar ve urls.txt dosyasına kaydeder
  ├── mailScraper.js # urls.txt içindeki domainlere gidip mail adreslerini toplar 
  ├── urls.txt # Tarayıcıdan toplanan veya elle eklenmiş domain listesi 
  ├── mail.txt # Bulunan e-posta adreslerinin kaydedildiği dosya

  
---

## ⚙️ Nasıl Çalışır?

### 1️⃣ domainScraper.js

- Tarayıcıda hedef web sayfası açıkken `domainScraper.js` içeriğini geliştirici konsoluna yapıştırın.
- Sayfada bulunan bağlantıları analiz eder.
- Bulunan dış domainleri `urls.txt` dosyasına kaydeder (aynı domain tekrar eklenmez).

### 2️⃣ mailScraper.js

- `urls.txt` dosyasındaki her domaini ziyaret eder.
- Sayfalardaki e-posta adreslerini bulur.
- Daha önce eklenmemiş olanları `mail.txt` dosyasına ekler.

---

Kullanım

 1.   domainScraper.js → Hedef web sayfasında çalıştırılır, urls.txt oluşur.

 2.   mailScraper.js → Komut satırında çalıştırılır, mail.txt dosyası oluşur.


Notlar

 1. urls.txt ve mail.txt dosyaları otomatik olarak oluşturulur.

 2. urls.txt'ye elle domain ekleyerek süreci genişletebilirsiniz.

 3. Aynı domain veya e-posta adresi iki kez eklenmez.

---

## 💻 Gereksinimler

- Node.js (v18+ önerilir)
- Puppeteer kütüphanesi:  
  ```
  bash
  npm install puppeteer
  node mailScraper.js
  ```



