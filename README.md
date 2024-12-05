# Server Lab 6

## Overview
This project is a Node.js application using Express.js framework. It provides APIs for managing users, fruits, and distributors. The application also integrates with MongoDB for data storage and Cloudinary for image uploads.

## Features
- User registration and authentication
- CRUD operations for fruits
- Image upload using Multer and Cloudinary
- Secure routes with JWT authentication

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- Cloudinary
- Multer
- JWT (JSON Web Token)
- dotenv

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd server-lab6
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```dotenv
    MONGODB_URI=<your-mongodb-uri>
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    CLOUDINARY_SECRET_KEY=<your-cloudinary-secret-key>
    PORT=<your-port>
    ```

4. Start the server:
    ```sh
    npm start
    ```

5. For development mode with auto-restart on changes:
    ```sh
    npm run start:dev
    ```

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `PATCH /api/users/update/:id` - Update user details

### Fruit Routes
- `POST /api/fruits/create` - Create a new fruit
- `GET /api/fruits` - Get all fruits
- `GET /api/fruits/search/:name` - Search fruits by name
- `GET /api/fruits/query` - Get fruit using query params
- `GET /api/fruits/:fruitId` - Get fruit by ID
- `PATCH /api/fruits/:fruitId` - Update fruit by ID
- `DELETE /api/fruits/:fruitId` - Delete fruit by ID
