# Postly Api

Postlly API is a powerful and scalable backend service built with [NestJS](https://nestjs.com/) and [MongoDB](https://www.mongodb.com/) that includes user registration, login, and JWT-based authentication, etc.

---

## Features

- User registration and login
- JWT authentication (access tokens)
- Get current authenticated user (`/auth/me`)
- MongoDB & Mongoose for database
- Input validation and error handling
- Modular, scalable NestJS structure

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- npm

### Installation

```sh
git clone https://github.com/your-username/nest-auth-api.git
cd nest-auth-api
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URI=mongodb://localhost:27017/nest-auth
JWT_SECRET=your_jwt_secret
JWT_EXPIRES=1d
PORT=3000
```

### Running the App

```sh
npm run start:dev
```

The API will be available at `http://localhost:3000`.

## API Endpoints

### Auth

- `POST /auth/signup` — Register a new user  
  **Body:**  
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

- `POST /auth/login` — Login and get JWT token  
  **Body:**  
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

### User

- `GET /user` — Get all users
- `GET /user/:id` — Get user by ID
- `PATCH /user/:id` — Update user
- `DELETE /user/:id` — Delete user


## Project Structure

See [src/](src) for modules:

- [`src/app.module.ts`](src/app.module.ts)
- [`src/auth`](src/auth)
- [`src/user`](src/user)

## License

UNLICENSED

---

Builtusing [NestJS](https://nestjs.com/)