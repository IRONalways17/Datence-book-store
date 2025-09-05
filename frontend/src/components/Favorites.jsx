import React from 'react';
import { useAppContext } from '../context/AppContext';
import BookCard from './BookCard';
import './Favorites.css';

const Favorites = () => {
  const { favorites, clearFavorites } = useAppContext();

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="favorites-container">
          <h2>Your Favorites</h2>
          <div className="empty-favorites">
            <p>You haven't added any books to your favorites yet</p>
            <a href="/" className="continue-shopping">Browse Books</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <div className="favorites-header">
          <h2>Your Favorites ({favorites.length} books)</h2>
          <button onClick={clearFavorites} className="clear-favorites-btn">
            Clear All Favorites
          </button>
        </div>
        
        <div className="favorites-grid">
          {favorites.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
