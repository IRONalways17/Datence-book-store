import React from 'react';
import { FaHeart, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import './BookCard.css';

const BookCard = ({ book }) => {
  const { 
    addToCart, 
    addToFavorites, 
    isInCart, 
    isFavorite 
  } = useAppContext();

  const ratingStars = {
    One: '★☆☆☆☆',
    Two: '★★☆☆☆',
    Three: '★★★☆☆',
    Four: '★★★★☆',
    Five: '★★★★★',
  };

  const handleAddToCart = () => {
    addToCart(book);
  };

  const handleAddToFavorites = () => {
    addToFavorites(book);
  };

  const inCart = isInCart(book._id);
  const favorited = isFavorite(book._id);

  return (
    <div className="book-card">
      <div className="book-card-image-container">
        <img src={book.imageUrl} alt={book.title} />
      </div>
      <div className="book-card-content">
        <h3>{book.title}</h3>
        <p className="price">{book.price}</p>
        <p className={`availability ${book.availability === 'In stock' ? 'in-stock' : 'out-of-stock'}`}>
          {book.availability}
        </p>
        <div className="rating">{ratingStars[book.rating]}</div>
        <div className="book-card-actions">
          <button 
            className={`btn btn-cart ${inCart ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
            disabled={book.availability !== 'In stock'}
          >
            {inCart ? <FaCheck /> : <FaShoppingCart />} 
            {inCart ? 'In Cart' : 'Add to Cart'}
          </button>
          <button 
            className={`btn btn-favorite ${favorited ? 'favorited' : ''}`}
            onClick={handleAddToFavorites}
          >
            <FaHeart /> {favorited ? 'Favorited' : 'Favorite'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
