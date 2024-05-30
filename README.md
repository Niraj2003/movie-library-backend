# Movie Library API Documentation

This API provides endpoints for managing movie lists and user authentication.

## Authentication Endpoints

### Register New User

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user with the application.
- **Request Body:**
  - `username` (string): The desired username for the new user.
  - `email` (string): The email address of the new user.
  - `password` (string): The password for the new user.
- **Response:**
  - `201 Created`: User successfully registered.
  - `500 Server Error`: Internal server error.

### Login User

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Logs in an existing user.
- **Request Body:**
  - `email` (string): The email address of the user.
  - `password` (string): The password for the user.
- **Response:**
  - `200 OK`: User successfully logged in. Returns a JWT token and user ID.
  - `400 Bad Request`: Invalid credentials.
  - `500 Server Error`: Internal server error.

## Movie Endpoints

### Search Movies

- **URL:** `/api/movies/search`
- **Method:** `GET`
- **Description:** Searches for movies using the Open Movie Database (OMDB) API.
- **Query Parameters:**
  - `query` (string): The search query for movies.
- **Response:**
  - `200 OK`: Returns a list of movies matching the search query.
  - `500 Server Error`: Internal server error.

## List Endpoints

### Create List

- **URL:** `/api/lists`
- **Method:** `POST`
- **Description:** Creates a new list of movies.
- **Request Body:**
  - `name` (string): The name of the list.
  - `movies` (array): An array of movie objects.
  - `isPublic` (boolean): Indicates whether the list is public or private.
- **Response:**
  - `201 Created`: List successfully created.
  - `500 Server Error`: Internal server error.

### Get User's Lists

- **URL:** `/api/lists`
- **Method:** `GET`
- **Description:** Retrieves all lists created by the authenticated user.
- **Response:**
  - `200 OK`: Returns an array of lists belonging to the user.
  - `500 Server Error`: Internal server error.

### Get List by ID

- **URL:** `/api/lists/:id`
- **Method:** `GET`
- **Description:** Retrieves a specific list by its ID.
- **URL Parameters:**
  - `id` (string): The ID of the list to retrieve.
- **Response:**
  - `200 OK`: Returns the requested list.
  - `404 Not Found`: List not found.
  - `403 Forbidden`: User not authorized to access the list.
  - `500 Server Error`: Internal server error.

### Update List

- **URL:** `/api/lists/:id`
- **Method:** `PUT`
- **Description:** Updates an existing list with new information.
- **URL Parameters:**
  - `id` (string): The ID of the list to update.
- **Request Body:**
  - `name` (string): The updated name of the list.
  - `movies` (array): An updated array of movie objects.
  - `isPublic` (boolean): Updated value indicating whether the list is public or private.
- **Response:**
  - `200 OK`: List successfully updated.
  - `404 Not Found`: List not found.
  - `403 Forbidden`: User not authorized to update the list.
  - `500 Server Error`: Internal server error.

### Delete List

- **URL:** `/api/lists/:id`
- **Method:** `DELETE`
- **Description:** Deletes a list.
- **URL Parameters:**
  - `id` (string): The ID of the list to delete.
- **Response:**
  - `200 OK`: List successfully deleted.
  - `404 Not Found`: List not found.
  - `403 Forbidden`: User not authorized to delete the list.
  - `500 Server Error`: Internal server error.
