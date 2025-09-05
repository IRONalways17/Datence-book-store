const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/book-explorer';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookSchema = new mongoose.Schema({
  title: String,
  price: String,
  availability: String,
  rating: String,
  url: String,
  imageUrl: String,
});

const Book = mongoose.model('Book', bookSchema);

async function scrapeBooks() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let pageNum = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    await page.goto(`https://books.toscrape.com/catalogue/page-${pageNum}.html`, {
      waitUntil: 'networkidle2',
    });

    const booksOnPage = await page.evaluate(() => {
      const bookPods = Array.from(document.querySelectorAll('.product_pod'));
      return bookPods.map(pod => {
        const title = pod.querySelector('h3 a').getAttribute('title');
        const price = pod.querySelector('.price_color').innerText;
        const availability = pod.querySelector('.instock.availability').innerText.trim();
        const rating = pod.querySelector('.star-rating').classList[1];
        const url = pod.querySelector('h3 a').href;
        const imageUrl = pod.querySelector('.image_container img').src;
        return { title, price, availability, rating, url, imageUrl };
      });
    });

    for (const bookData of booksOnPage) {
      const book = new Book(bookData);
      await book.save();
    }

    const nextButton = await page.$('.next a');
    if (!nextButton) {
      hasNextPage = false;
    }

    pageNum++;
  }

  console.log('Scraping complete!');
  await browser.close();
  mongoose.connection.close();
}

scrapeBooks();
