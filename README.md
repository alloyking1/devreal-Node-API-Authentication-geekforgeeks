# DevRel Node API Authentication

Authentication API built with Node.js, Express, and MongoDB for learning and tutorial purposes.

## What This Project Is For

This project is built to demonstrate a practical backend authentication flow using:

- user registration
- secure password hashing
- login validation
- basic API hardening middleware

It is intended as a reference project for developers learning how to structure a secure Node.js authentication API.

## Publication

- Follow-up tutorial article platform: **GeeksforGeeks Blog**
- Project source code repository: this GitHub repo

## Tech Stack

- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB Atlas
- ODM: Mongoose
- Auth-related libraries: bcryptjs, jsonwebtoken
- Security middleware: helmet, cors, cookie-parser, express-rate-limit
- Utilities available for MFA work: speakeasy, qrcode
- Environment management: dotenv
- Development tooling: nodemon

## Project Structure

```text
src/
	app.js               # Express app and middleware
	server.js            # App bootstrap
	config/
		db.js              # MongoDB connection
	controllers/
		authController.js  # Register and login logic
	models/
		User.js            # User schema
	routes/
		authRoutes.js      # Auth endpoints
	middleware/          # Reserved for custom middleware
	utils/               # Reserved for helper utilities
```

## API Endpoints

- `GET /api/health` - health check
- `POST /api/auth/register` - create a new user
- `POST /api/auth/login` - authenticate an existing user

### Sample Request: Register

```json
{
  "email": "user@example.com",
  "password": "myStrongPassword"
}
```

### Sample Request: Login

```json
{
  "email": "user@example.com",
  "password": "myStrongPassword"
}
```

## Environment Variables

Create a `.env` file in the project root:

```dotenv
PORT=5000
MONGO_URI_BASE=mongodb+srv://<username>:<password>@<cluster-host>
JWT_ACCESS_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret
```

## Setup Instructions

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Configure your `.env` file (see above).
4. Start development server:

```bash
npm run dev
```

5. For production run:

```bash
npm start
```

## Available Scripts

- `npm run dev` - starts server with nodemon
- `npm start` - starts server with node
- `npm test` - placeholder script (not configured yet)
