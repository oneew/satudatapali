# Authentication System Documentation

This document explains how the authentication system works in the Satu Data Portal application.

## Overview

The authentication system uses a traditional username/password approach with JWT tokens for session management. All user credentials are stored in the MongoDB database, not in any external API.

## Authentication Flow

1. **User Login Request**
   - User submits username and password through the frontend login form
   - Frontend sends POST request to `/v1/users/login` endpoint

2. **Backend Validation**
   - Backend receives login request
   - Validates that both username and password are provided
   - Queries MongoDB database to find user by username
   - If user exists, compares provided password with hashed password in database using bcrypt
   - If credentials are valid, generates JWT token

3. **Token Generation**
   - JWT token is generated with user information (id, username, role)
   - Token is signed with the secret key from environment variables
   - Token has a 1-day expiration time

4. **Response**
   - If successful, backend returns:
     - Success message
     - JWT token
     - User information (id, username, name, email, role, perangkatdaerah)
     - User role
   - If failed, backend returns appropriate error message

5. **Frontend Handling**
   - Frontend receives token and stores it in localStorage
   - Token is added to Authorization header for subsequent requests
   - User is redirected to dashboard

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Tokens**: Session management using JSON Web Tokens
- **Token Expiration**: Tokens expire after 1 day
- **Role-based Access**: User roles are included in tokens for authorization
- **Environment Variables**: Secret keys are stored in environment variables

## Database Schema

The user collection in MongoDB contains the following fields:
- username (unique)
- password (hashed)
- email
- name
- role
- perangkatdaerah (optional)
- createdAt
- updatedAt

## API Endpoints

- `POST /v1/users/login` - User login
- `POST /v1/users/register` - User registration (admin only)
- Authentication middleware for protected routes

## Environment Variables

- `MONGO_URI` - MongoDB connection string
- `PORT` - Server port (default 5002)
- `JWT_SECRET` - Secret key for JWT token signing

## Common Issues and Solutions

1. **Port Conflicts**
   - Solution: Change PORT in .env file and update frontend proxy configuration

2. **Database Connection Issues**
   - Solution: Verify MONGO_URI in .env file and check network connectivity

3. **JWT Secret Not Defined**
   - Solution: Ensure JWT_SECRET is defined in .env file

## Testing

The authentication system can be tested using:
- Manual testing through the login form
- API testing tools like Postman
- Automated test scripts (see test-full-login.js)