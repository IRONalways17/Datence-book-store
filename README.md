# Book Explorer - Datence Project

A comprehensive full-stack web application for book discovery and management, developed for academic purposes. This project demonstrates modern web development practices using React, Node.js, Express, and MongoDB.

## Project Overview
<img width="1920" height="3388" alt="full-responsive-final" src="https://github.com/user-attachments/assets/57a75f6d-dafc-4cb0-9231-e819f80bb9bf" />

Book Explorer is a responsive web application that allows users to browse, search, and manage a collection of books. The application features a clean, modern interface with functionality for viewing book details, managing favorites, and maintaining a shopping cart.

## Technology Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **React Icons** - Icon library for UI components
- **CSS3** - Custom styling with responsive design

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling library
- **CORS** - Cross-origin resource sharing middleware

### Development Tools
- **ESLint** - Code linting and formatting
- **Nodemon** - Development server with auto-restart

## Project Structure

```
book-explorer/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context for state management
│   │   ├── config/         # Configuration files
│   │   └── styles/         # CSS styling files
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Express.js backend API
│   ├── models/             # MongoDB data models
│   ├── routes/             # API route definitions
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── scraper/                # Data scraping utility
│   ├── scraper.js          # Web scraping script
│   └── package.json        # Scraper dependencies
└── README.md               # Project documentation
```

## Features

### Core Functionality
- **Book Browsing**: View a collection of books with detailed information
- **Search Capability**: Search books by title, author, or genre
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Book Details**: Comprehensive book information including ratings and descriptions
- **Favorites Management**: Add and remove books from favorites list
- **Shopping Cart**: Add books to cart with quantity management

### User Interface
- Clean, modern design with intuitive navigation
- Responsive layout that adapts to different screen sizes
- Professional typography and color scheme
- Interactive elements with hover effects and transitions

## Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd book-explorer
   ```

2. **Install Dependencies**
   
   Install root dependencies:
   ```bash
   npm install
   ```
   
   Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   cd ..
   ```
   
   Install backend dependencies:
   ```bash
   cd backend
   npm install
   cd ..
   ```
   
   Install scraper dependencies:
   ```bash
   cd scraper
   npm install
   cd ..
   ```

3. **Database Setup**
   
   Ensure MongoDB is running locally on the default port (27017). The application will automatically create a database named `book-explorer`.

4. **Populate Database (Optional)**
   
   Run the scraper to populate the database with sample book data:
   ```bash
   cd scraper
   npm start
   ```

5. **Start the Application**
   
   Start the backend server:
   ```bash
   cd backend
   npm start
   ```
   
   In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   
   Open your web browser and navigate to `http://localhost:5173` to view the application.

## API Endpoints

The backend provides the following REST API endpoints:

### Books
- `GET /api/books` - Retrieve all books
- `GET /api/books/:id` - Retrieve a specific book by ID
- `GET /api/books/search/:query` - Search books by query

### Server
- `GET /` - Health check endpoint

## Database Schema

### Book Model
```javascript
{
  title: String,          // Book title
  author: String,         // Author name
  price: Number,          // Book price
  originalPrice: Number,  // Original price before discount
  rating: Number,         // User rating (1-5)
  image: String,          // Book cover image URL
  genre: String,          // Book genre/category
  description: String,    // Book description
  availability: String    // Stock availability status
}
```

## Configuration

### Frontend Configuration
- API base URL: `http://localhost:5000`
- Development server port: 5173
- Production build output: `dist/`

### Backend Configuration
- Server port: 5000
- MongoDB connection: `mongodb://localhost:27017/book-explorer`
- CORS enabled for all origins

## Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Follow ES6+ JavaScript standards
- Use meaningful variable and function names
- Comment complex logic and API endpoints

### Component Structure
- Keep components focused and reusable
- Use functional components with hooks
- Implement proper prop validation
- Maintain consistent file naming conventions

### State Management
- Use React Context for global state
- Keep component state local when possible
- Implement proper error handling

## Educational Objectives

This project demonstrates:

1. **Full-Stack Development**: Complete MERN stack implementation
2. **API Design**: RESTful API development with Express.js
3. **Database Integration**: MongoDB integration with Mongoose ODM
4. **Frontend Development**: Modern React development practices
5. **Responsive Design**: Mobile-first CSS implementation
6. **State Management**: React Context API usage
7. **Component Architecture**: Reusable component design
8. **Error Handling**: Proper error handling and user feedback
9. **Development Workflow**: Modern development tools and practices

## Future Enhancements

Potential areas for expansion:
- User authentication and authorization
- Advanced search filters and sorting options
- Book reviews and ratings system
- Inventory management for administrators
- Payment processing integration
- Email notifications
- Advanced analytics and reporting

## Contributing

This is an academic project. When contributing:

1. Follow the established code style and conventions
2. Write clear, descriptive commit messages
3. Test changes thoroughly before submitting
4. Document any new features or significant changes
5. Ensure backward compatibility when possible

## License

This project is developed for academic purposes.

## Contact

For questions or support regarding this academic project, please contact the development team or refer to the course documentation.
9929586989
---

**Note**: This application is designed for educational purposes and demonstrates web development concepts and best practices. It is not intended for production use without additional security and performance optimizations.
