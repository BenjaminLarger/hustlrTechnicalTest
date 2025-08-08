# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Starting the Application
- `npm start` or `npm run dev` - Runs both frontend and backend concurrently
- `npm run server` - Runs only the Express.js backend server (port 4001)  
- `npm run client` - Runs only the React frontend (port 3000)

### Build Commands
- `npm run build` - Creates production build of React frontend (uses --openssl-legacy-provider flag)

### Installation
- `npm install` - Standard dependency installation
- `npm install react-material-ui-carousel --save --legacy-peer-deps` - Alternative installation method mentioned in README

## Architecture Overview

This is a full-stack e-commerce application with a clear separation between frontend and backend:

### Backend (`/api` directory)
- **Framework**: Express.js with Node.js
- **Database**: MongoDB with Mongoose ODM (currently commented out in server.js:12)
- **File Storage**: Cloudinary for image uploads
- **Structure**:
  - `server.js` - Main server entry point
  - `app.js` - Express app configuration
  - `controllers/` - Business logic (user, product, order, payment)
  - `models/` - Mongoose schemas and data models
  - `routes/` - API endpoint definitions
  - `middlewares/` - Authentication, validation, error handling
  - `config/` - Database and environment configuration
  - `utils/` - Helper functions and utilities

### Frontend (`/src` directory)
- **Framework**: React 18 with Create React App
- **State Management**: Redux with Redux Toolkit
- **Routing**: React Router DOM v6
- **UI Framework**: Bootstrap 5 + Reactstrap
- **Key Features**: Shopping cart, user authentication, product catalog, checkout flow

### Key Integration Points
- Frontend makes API calls to backend (likely axios-based given dependency)
- Redux store manages cart state and user session
- Payment processing includes Stripe and Paytm integration
- File uploads handled through Express middleware to Cloudinary

### Environment Configuration
- Backend requires `.env` file with:
  - `MONGO_URI` for database connection
  - `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` for file storage
  - `PORT` (defaults to 4001)

## Important Notes
- The codebase uses legacy OpenSSL provider flags for React scripts
- Database connection is currently disabled (commented out in server.js)
- Concurrency handled via `concurrently` package for running both servers
- Payment integration supports multiple providers (Stripe, Paytm)
- Image handling includes compression and watermarking capabilities