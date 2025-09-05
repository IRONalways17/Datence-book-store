const API_BASE_URL = 'http://localhost:5000';

export const API_ENDPOINTS = {
  books: `${API_BASE_URL}/api/books`,
  book: (id) => `${API_BASE_URL}/api/books/${id}`,
};

export default API_BASE_URL;
