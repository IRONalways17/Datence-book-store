import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import Pagination from './Pagination';
import { API_ENDPOINTS } from '../config/api';
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    rating: '',
    price: '',
    inStock: '',
    search: '',
  });
  const [searchInput, setSearchInput] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  const debouncedSearch = useCallback((searchTerm) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeoutId = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchTerm }));
      setPage(1);
    }, 500);
    
    setSearchTimeout(timeoutId);
  }, [searchTimeout]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value.trim());
  };

  const clearSearch = () => {
    setSearchInput('');
    setFilters(prev => ({ ...prev, search: '' }));
    setPage(1);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching books from:', API_ENDPOINTS.books);
        console.log('With filters:', filters, 'Page:', page);
        
        const { data } = await axios.get(API_ENDPOINTS.books, {
          params: { ...filters, page },
          timeout: 10000,
        });
        
        console.log('API Response:', data);
        setBooks(data.books || []);
        setTotalPages(data.totalPages || 1);
        
        if (!data.books || data.books.length === 0) {
          if (filters.search && filters.search.trim() !== '') {
            setError(`No books found matching "${filters.search}". Try different search terms.`);
          } else {
            setError("No books found. The database might be empty.");
          }
        }
      } catch (error) {
        console.error("API Error:", error);
        if (error.code === 'ECONNREFUSED') {
          setError("Backend server is not running. Please start the backend server.");
        } else if (error.code === 'ENOTFOUND') {
          setError("Network error. Please check your connection.");
        } else if (error.response) {
          setError(`Server error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          setError("No response from server. Please check if the backend is running on port 5000.");
        } else {
          setError(`Failed to load books: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [filters.rating, filters.price, filters.inStock, filters.search, page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'search') {
      handleSearchChange(e);
    } else {
      setFilters({ ...filters, [name]: value });
      setPage(1);
    }
  };

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  const handleRetry = () => {
    setError(null);
    setPage(p => p);
  };

  if (loading) {
    return (
      <div className="home">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <div className="error">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
          <div className="debug-info">
            <details>
              <summary>Debug Information</summary>
              <p>Backend URL: http://localhost:5000/api/books</p>
              <p>Current filters: {JSON.stringify(filters)}</p>
              <p>Current page: {page}</p>
            </details>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="filters-container">
        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              name="search"
              className="search-input"
              placeholder="Search books by title..."
              value={searchInput}
              onChange={handleSearchChange}
            />
            {searchInput && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          {searchInput && (
            <div className="search-indicator">
              Searching for: "<strong>{searchInput}</strong>"
              {loading && <span className="search-loading">...</span>}
            </div>
          )}
        </div>
        <select name="rating" value={filters.rating} onChange={handleFilterChange}>
          <option value="">All Ratings</option>
          <option value="One">1 Star</option>
          <option value="Two">2 Stars</option>
          <option value="Three">3 Stars</option>
          <option value="Four">4 Stars</option>
          <option value="Five">5 Stars</option>
        </select>
        <select name="inStock" value={filters.inStock} onChange={handleFilterChange}>
          <option value="">All Stock</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
      </div>
      
      {books.length === 0 ? (
        <div className="no-books">
          <h3>No books found</h3>
          <p>Try adjusting your search criteria or check if the database has been populated.</p>
          <button onClick={handleRetry} className="retry-button">
            Refresh
          </button>
        </div>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
      
      {totalPages > 1 && (
        <Pagination 
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default Home;
