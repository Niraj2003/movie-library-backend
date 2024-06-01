## Authentication Endpoints

### 1. Register User
- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user with a unique email address.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Responses:**
  ```json
  {
    "_id": "string",
    "username": "string",
    "email": "string",
    "password": "string (hashed)"
  }
  ```

  - 400 Bad Request
    ```json
    {
      "message": "Email already exists"
    }
    ```
  - 500 Internal Server Error
    ```json
    {
      "message": "Server error"
    }
    ```

### 2. Login User
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Responses:**
  - 200 OK
    ```json
    {
      "token": "string",
      "userId": "string",
      "message": "Login successful"
    }
    ```
  - 400 Bad Request
    ```json
    {
      "message": "Invalid credentials"
    }
    ```
  - 500 Internal Server Error
    ```json
    {
      "message": "Server error"
    }
    ```

### 3. Get User Profile
- **URL:** `/api/auth/profile`
- **Method:** `GET`
- **Description:** Fetches the profile of the authenticated user, including their lists.
- **Cookies:**
  `authToken`: `string`
- **Responses:**
  - 200 OK
    ```json
    {
      "user": {
        "_id": "string",
        "username": "string",
        "email": "string"
      },
      "lists": [
        {
          "_id": "string",
          "name": "string",
          "movies": [
            "object"
          ],
          "isPublic": "boolean",
          "user": "string"
        }
      ]
    }
    ```
  - 401 Unauthorized
    ```json
    {
      "message": "Unauthorized"
    }
    ```
  - 404 Not Found
    ```json
    {
      "message": "User not found"
    }
    ```
  - 500 Internal Server Error
    ```json
    {
      "message": "Server error"
    }
    ```

## List Management Endpoints
### 4. Create List
- **URL:** `/api/lists/create`
- **Method:** `POST`
- **Description:** Creates a new list for the authenticated user.
- **Middleware:** `authMiddleware`
- **Request Body:**
  ```json
  {
    "name": "string",
    "movies": [
      "object"
    ],
    "isPublic": "boolean"
  }
  ```
- **Responses:**
  - 201 Created
    ```json
    {
      "_id": "string",
      "name": "string",
      "movies": [
        "object"
      ],
      "isPublic": "boolean",
      "user": "string"
    }
    ```
  - 500 Internal Server Error
    ```json
    {
      "message": "Server error"
    }
    ```

### 5. Get User Lists
- **URL:** `/api/lists/my-lists`
- **Method:** `GET`
- **Description:** Retrieves all lists created by the authenticated user.
- **Middleware:** `authMiddleware`
- **Responses:**
  - 200 OK
    ```json
    [
      {
        "_id": "string",
        "name": "string",
        "movies": [
          "object"
        ],
        "isPublic": "boolean",
        "user": "string"
      }
    ]
    ```
  - 500 Internal Server Error
    ```json
    {
      "message": "Server error"
    }
    ```

### 6. Get Public Lists
- **URL:** `/api/lists/public-lists`
- **Method:** `GET`
- **Description:** Retrieves all public lists.
- **Responses:**
  - 200 OK
    ```json
    [
      {
        "_id": "string",
        "name": "string",
        "movies": [
          "object"
        ],
        "isPublic": "boolean",
        "user": "string"
      }
    ]
    ```
  - 500 Internal Server Error
    ```json
    {
      "message": "Server error"
    }
    ```

## Middleware
### Authentication Middleware
This middleware verifies the JWT token stored in the cookies to authenticate the user.

**Usage:**
  ```js
  const jwt = require('jsonwebtoken');

  module.exports = (req, res, next) => {
      const token = req.cookies.authToken;
      if (!token) {
          return res.status(401).json({ message: 'No token, authorization denied' });
      }
      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.userId = decoded.userId;
          console.log('User Authenticated');
          next();
      } catch (error) {
          console.error('Token is not valid:', error);
          res.status(401).json({ message: 'Token is not valid' });
      }
  };
  ```