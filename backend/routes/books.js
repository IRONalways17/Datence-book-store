const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 12, rating, price, inStock, search } = req.query;
    const query = {};

    if (rating) {
      query.rating = rating;
    }

    if (inStock !== undefined && inStock !== '') {
      if (inStock === 'true') {
        query.availability = { $regex: /in stock/i };
      } else if (inStock === 'false') {
        query.availability = { $regex: /out of stock/i };
      }
    }

    if (price) {
      const [min, max] = price.split('-').map(p => parseFloat(p));
      if (!isNaN(min) && !isNaN(max)) {
        query.$expr = {
          $and: [
            { $gte: [{ $toDouble: { $substr: ["$price", 1, -1] } }, min] },
            { $lte: [{ $toDouble: { $substr: ["$price", 1, -1] } }, max] }
          ]
        };
      }
    }

    if (search && search.trim() !== '') {
      const searchTerm = search.trim();
      
      query.$or = [
        { title: { $regex: `^${searchTerm}`, $options: 'i' } },
        { title: { $regex: searchTerm, $options: 'i' } },
        ...searchTerm.split(/\s+/).map(word => ({
          title: { $regex: word, $options: 'i' }
        }))
      ];
    }

    const books = await Book.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();

    const count = await Book.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalBooks: count
    });
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error('Error fetching book:', err);
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

module.exports = router;
