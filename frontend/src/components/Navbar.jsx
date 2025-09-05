import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import './Navbar.css';
import './Badge.css';

const Navbar = () => {
  const { getCartItemCount, favorites } = useAppContext();
  const cartCount = getCartItemCount();
  const favoritesCount = favorites.length;

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/favorites" aria-label="Favorites" title="Favorites" className="nav-link-with-badge">
          <FaHeart />
          {favoritesCount > 0 && <span className="badge">{favoritesCount}</span>}
        </Link>
        <Link to="/cart" aria-label="Shopping Cart" title="Cart" className="nav-link-with-badge">
          <FaShoppingCart />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
        <a href="https://github.com/your-username/book-explorer" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
          <FaGithub />
        </a>
      </div>
      <div className="navbar-center">
        <Link to="/" className="navbar-title">
          <h1>Datence Book Store</h1>
        </Link>
      </div>
      <div className="navbar-logo">
        <Link to="/" aria-label="Home" title="Go to Home">
          <img src="/datence.png" alt="Datence Logo" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
