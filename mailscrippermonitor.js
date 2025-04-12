// görsel olarak bir pencereden takip etmek için
const puppeteer = require('puppeteer');
const fs = require('fs');

// mail.txt dosyasının yolu
const mailFilePath = 'mail.txt';

// URLs.txt dosyasındaki URL'leri oku
const urls = fs.readFileSync('urls.txt', 'utf-8').split('\n').map(url => url.trim());

// mail.txt dosyasının mevcut e-posta adreslerini oku
let existingEmails = [];
if (fs.existsSync(mailFilePath)) {
    existingEmails = fs.readFileSync(mailFilePath, 'utf-8').split('\n').map(email => email.trim());
}

// E-posta adreslerini bulmak için fonksiyon
const findEmails = async (page) => {
    return page.evaluate(() => {
        const emails = [];
        const mailElements = document.querySelectorAll('a[href^="mailto:"]');
        mailElements.forEach(element => {
            const email = element.getAttribute('href').replace('mailto:', '').trim();
            if (email && !emails.includes(email)) {
                emails.push(email);
            }
        });
        return emails;
    });
};

// Sayfa içerisindeki tüm linkleri al ve her birine tıkla
const findLinksAndEmails = async (page) => {
    const links = await page.evaluate(() => {
        const anchorTags = document.querySelectorAll('a');
        const urls = [];
        anchorTags.forEach(anchor => {
            const href = anchor.href;
            if (href && href.startsWith('http') && !urls.includes(href)) {
                urls.push(href);
            }
        });
        return urls;
    });

    // E-posta adreslerini topla
    const emails = await findEmails(page);

    return { links, emails };
};

// URL'leri sırayla gezip, her birinden e-posta adreslerini topla
const fetchEmails = async () => {
    const browser = await puppeteer.launch({
        headless: false, // Tarayıcıyı görünür yap
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreHTTPSErrors: true // SSL hatalarını yoksay
    });
    const page = await browser.newPage();

    // User-Agent ayarla
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Gereksiz kaynakları engelleme
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet' || request.resourceType() === 'font') {
            request.abort();  // Görseller, stil sayfaları ve fontları engelle
        } else {
            request.continue();  // Diğer kaynakları yüklemeye devam et
        }
    });

    for (const url of urls) {
        console.log(`Fetching emails from: ${url}`);
        try {
            // URL'yi kontrol et ve http/https ekle
            const completeUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
            
            // Sayfa yüklenirken zaman aşımını 60 saniye yap
            await page.goto(completeUrl, { waitUntil: 'load', timeout: 60000 });

            // Sayfadaki e-posta adreslerini ve linkleri al
            let { links, emails } = await findLinksAndEmails(page);

            // E-posta adreslerini işle
            if (emails.length > 0) {
                console.log('E-posta adresleri bulundu:', emails);

                // Yeni bulunan e-posta adreslerini mail.txt dosyasına ekle
                emails.forEach(email => {
                    if (!existingEmails.includes(email)) {
                        existingEmails.push(email);
                        fs.appendFileSync(mailFilePath, email + '\n');
                        console.log(`E-posta adresi eklendi: ${email}`);
                    } else {
                        console.log(`E-posta adresi zaten mevcut: ${email}`);
                    }
                });
            } else {
                console.log('Bu sayfada e-posta adresi bulunamadı.');
            }

            // Diğer linklere tıklayıp e-posta adreslerini topla
            for (const link of links) {
                try {
                    console.log(`Fetching emails from linked page: ${link}`);
                    await page.goto(link, { waitUntil: 'load', timeout: 60000 });

                    // Sayfadaki e-posta adreslerini al
                    let { emails: linkedEmails } = await findLinksAndEmails(page);

                    if (linkedEmails.length > 0) {
                        console.log('Linked page emails found:', linkedEmails);

                        linkedEmails.forEach(email => {
                            if (!existingEmails.includes(email)) {
                                existingEmails.push(email);
                                fs.appendFileSync(mailFilePath, email + '\n');
                                console.log(`Linked e-posta adresi eklendi: ${email}`);
                            } else {
                                console.log(`Linked e-posta adresi zaten mevcut: ${email}`);
                            }
                        });
                    }
                } catch (linkedError) {
                    console.error(`Linked page error (${link}): ${linkedError.message}`);
                }
            }

        } catch (error) {
            console.error(`Hata oluştu (${url}): ${error.message}`);
        }
    }

    await browser.close();
};

// E-posta çekmeye başla
fetchEmails();
