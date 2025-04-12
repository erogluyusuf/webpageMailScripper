const puppeteer = require('puppeteer');
const fs = require('fs');

const mailFilePath = 'mail.txt';

// URLs.txt dosyasındaki URL'leri oku ve temizle
const urls = fs.readFileSync('urls.txt', 'utf-8')
    .split('\n')
    .map(url => url.trim())
    .filter(url => url.length > 0); // boş satırları atla

// Mevcut e-postaları oku
let existingEmails = [];
if (fs.existsSync(mailFilePath)) {
    existingEmails = fs.readFileSync(mailFilePath, 'utf-8')
        .split('\n')
        .map(email => email.trim())
        .filter(email => email.length > 0);
}

// Sayfadaki e-posta adreslerini bul
const findEmails = async (page) => {
    return await page.evaluate(() => {
        const emails = [];
        const mailElements = document.querySelectorAll('a[href^="mailto:"]');
        mailElements.forEach(el => {
            const email = el.getAttribute('href').replace('mailto:', '').trim();
            if (email && !emails.includes(email)) {
                emails.push(email);
            }
        });
        return emails;
    });
};

// Sayfadaki tüm bağlantıları (linkleri) al
const findLinks = async (page) => {
    return await page.evaluate(() => {
        const links = [];
        const anchorTags = document.querySelectorAll('a[href]');
        anchorTags.forEach(anchor => {
            const href = anchor.getAttribute('href');
            if (href && !links.includes(href)) {
                links.push(href);
            }
        });
        return links;
    });
};

// URL'leri sırayla işle ve tüm sayfaları tarama
const fetchEmails = async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    // Ziyaret ettiğimiz URL'leri tutacak bir set
    const visitedUrls = new Set();

    // URL'leri sırayla işle
    for (const url of urls) {
        // URL başında http veya https yoksa, https ekle
        const completeUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
        console.log(`Fetching emails from: ${completeUrl}`);

        try {
            await page.goto(completeUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });

            // Sayfada bulunan e-posta adreslerini topla
            const emails = await findEmails(page);

            if (emails.length > 0) {
                console.log('E-posta adresleri bulundu:', emails);

                emails.forEach(email => {
                    if (!existingEmails.includes(email)) {
                        existingEmails.push(email);
                        fs.appendFileSync(mailFilePath, email + '\n');
                        console.log(`E-posta adresi eklendi: ${email}`);
                    } else {
                        console.log(`E-posta zaten mevcut: ${email}`);
                    }
                });
            } else {
                console.log('Bu sayfada e-posta adresi bulunamadı.');
            }

            // Sayfadaki tüm linkleri al
            const links = await findLinks(page);

            // Tüm linkleri sırayla takip et
            for (const link of links) {
                const completeLink = link.startsWith('http://') || link.startsWith('https://') ? link : `${completeUrl}${link}`;
                if (!visitedUrls.has(completeLink) && completeLink.startsWith('http')) {
                    visitedUrls.add(completeLink);
                    console.log(`Visiting linked page: ${completeLink}`);
                    await page.goto(completeLink, { waitUntil: 'domcontentloaded', timeout: 20000 });

                    // Bağlantıdaki e-posta adreslerini topla
                    const linkedEmails = await findEmails(page);
                    linkedEmails.forEach(email => {
                        if (!existingEmails.includes(email)) {
                            existingEmails.push(email);
                            fs.appendFileSync(mailFilePath, email + '\n');
                            console.log(`E-posta adresi eklendi: ${email}`);
                        }
                    });
                }
            }
        } catch (error) {
            console.error(`Hata oluştu (${completeUrl}): ${error.message}`);
        }
    }

    await browser.close();
};

fetchEmails();
