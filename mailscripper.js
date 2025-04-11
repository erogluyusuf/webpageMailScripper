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

// URL'leri sırayla gezip, her birinden e-posta adreslerini topla
const fetchEmails = async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    for (const url of urls) {
        console.log(`Fetching emails from: ${url}`);
        try {
            await page.goto(url, { waitUntil: 'domcontentloaded' });

            const emails = await findEmails(page);

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
        } catch (error) {
            console.error(`Error fetching ${url}: ${error.message}`);
        }
    }

    await browser.close();
};

// E-posta çekmeye başla
fetchEmails();
