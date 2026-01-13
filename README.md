# Library Management System - Backend

A robust backend API for a Library Management System built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with email verification
- **Book Management**: Full CRUD operations for books with image upload support
- **Borrow System**: Manage book borrowing and returning functionality
- **Review System**: Allow users to review books with star ratings
- **Admin Dashboard**: Admin features for managing users and content
- **Email Notifications**: Send emails for verification and notifications
- **Image Processing**: Handle book cover image uploads with Sharp

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **File Upload**: Multer with Sharp for image processing
- **Email**: Nodemailer
- **Logging**: Morgan
- **Security**: bcryptjs for password hashing

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/subinbajracharya/LMS-back.git
cd LMS-back
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lms
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:5173
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (not configured)

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/verify/:token` - Verify email

### Books

- `GET /api/books` - Get all books
- `POST /api/books` - Create new book (Admin)
- `GET /api/books/:id` - Get single book
- `PUT /api/books/:id` - Update book (Admin)
- `DELETE /api/books/:id` - Delete book (Admin)
- `GET /api/books/search/:key` - Search books

### Users

- `GET /api/users` - Get all users (Admin)
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin)

### Borrows

- `GET /api/borrows` - Get all borrows
- `POST /api/borrows` - Create borrow record
- `PUT /api/borrows/:id/return` - Return borrowed book

### Reviews

- `GET /api/reviews/book/:bookId` - Get reviews for a book
- `POST /api/reviews` - Add review to book

## 🏗 Project Structure

```
lms-be/
├── assets/
├── src/
│   ├── config/
│   │   ├── config.js
│   │   └── mongoConfig.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── borrowController.js
│   │   ├── reviewController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── joiMiddleware.js
│   │   └── multerConfig.js
│   ├── models/
│   │   ├── books/
│   │   │   ├── bookModel.js
│   │   │   └── bookSchema.js
│   │   ├── borrow/
│   │   │   ├── borrowModel.js
│   │   │   └── borrowSchema.js
│   │   ├── review/
│   │   │   ├── reviewModel.js
│   │   │   └── reviewSchema.js
│   │   └── users/
│   │       ├── userModel.js
│   │       └── userSchema.js
│   ├── routes/
│   │   ├── authRouter.js
│   │   ├── bookRouter.js
│   │   ├── borrowRouter.js
│   │   ├── reviewRouter.js
│   │   └── userRouter.js
│   └── utils/
│       ├── emailProcessor.js
│       ├── encodeHelper.js
│       └── jwt.js
├── server.js
├── package.json
└── README.md
```

## 🔐 Environment Variables

| Variable       | Description                    | Required           |
| -------------- | ------------------------------ | ------------------ |
| PORT           | Server port number             | No (default: 5000) |
| MONGODB_URI    | MongoDB connection string      | Yes                |
| JWT_SECRET     | Secret key for JWT tokens      | Yes                |
| JWT_EXPIRE     | JWT token expiration time      | No (default: 7d)   |
| EMAIL_SERVICE  | Email service provider         | Yes                |
| EMAIL_USERNAME | Email address                  | Yes                |
| EMAIL_PASSWORD | Email password or app password | Yes                |
| FRONTEND_URL   | Frontend URL for CORS          | Yes                |

## 🐳 Docker Support

The project includes Docker configuration for easy deployment:

```bash
# Build the image
docker build -t lms-backend .

# Run the container
docker run -p 5000:5000 --env-file .env lms-backend
```

## 📝 License

ISC

## 👤 Author

Subin Bajracharya

## 🔗 Repository

[GitHub](https://github.com/subinbajracharya/LMS-back)
