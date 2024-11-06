# Dynamic Form API with Node.js, MySQL, and Sequelize

This project provides a RESTful API to create, store, and retrieve dynamic forms in a MySQL database. Using Node.js, MySQL, and Sequelize ORM, it allows flexible form creation with a focus on scalability and maintainability. The API follows MVC architecture and uses design principles like SOLID and encapsulation for robust code structure.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)

## Features

- **Dynamic Form Creation**: Define new forms with custom fields and data types.
- **Form Data Validation**: Ensures data matches the specified types.
- **Persistent Model Loading**: Reloads dynamic models from metadata upon server startup.
- **Error Handling**: Consistent response codes and error messages following RESTful standards.

## Architecture

- **Model-View-Controller (MVC)**: Keeps code modular and easily testable.
- **Dynamic Models**: Uses metadata to create and reload models on server startup.
- **Validation**: Verifies data type consistency for dynamic fields.

## Technologies

- **Node.js** - JavaScript runtime for server-side applications.
- **Express.js** - Web framework for building RESTful APIs.
- **Sequelize** - ORM for managing MySQL database models.
- **MySQL** - Relational database for data storage.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MySQL database installed

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:  
   Create a `.env` file with the following details:
   ```plaintext
   DB_DIALECT=mysql
   DB_HOST=<database-host>
   DB_NAME=<database-name>
   DB_USERNAME=<database-username>
   DB_PASSWORD=<database-password>
   DB_PORT=3306
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

## API Endpoints

### 1. Create a Form
   - **Endpoint**: `POST /api/form`
   - **Description**: Creates a new form table in the database. 
   - **Request Body**:
     ```json
     {
       "uniqueId": "uuid",
       "title": "form_name", // This is not type but rather the name of the form
       "name": "string",
       "email": "email",
       "phone": "number",
       "isGraduate": "boolean"
     }
     ```
   - **Response**:
     - `201 Created`: Form successfully created.
     - `409 Conflict`: Form already exists.

### 2. Add Data to a Form
   - **Endpoint**: `POST /api/fill_data?form_title=form_name`
   - **Description**: Adds data to an existing form.
   - **Request Body**:
     ```json
     {
       "name": "John Doe",
       "email": "john.doe@example.com",
       "phone": 1234567890,
       "isGraduate": true
     }
     ```
   - **Response**:
     - `200 OK`: Data successfully added.
     - `404 Not found`: Form not found.
     - `400 Bad Request`: Validation error if data types don't match.

### 3. Retrieve Form Data
   - **Endpoint**: `GET /api/fill_data?form_title=form_name`
   - **Description**: Retrieves all entries for a specific form.
   - **Response**:
     - `200 OK`: Returns form data.
     - `404 Not Found`: Form does not exist.

## Project Structure

```
.
├── config
│   └── database.js        # Database configuration and dynamic model loader
├── controllers
│   └── formController.js   # Handlers for API endpoints
├── routes
│   └── formRoutes.js       # Routes for form operations
├── services
│   └── formService.js      # Main business logic 
├── utils
│   └── getSequelizeType.js # Utility for data type transformation
│   └── responseHandler.js  # Utility for handling api responses
├── .env                    # Environment variables
├── app.js                  # Application
├── server.js               # Application entry point
└── README.md               # Project documentation
```

## Future Improvements

- **Enhanced Validation**: Add custom validation for more data types (e.g., date, float).
- **Dynamic Relationships**: Enable relationships between forms for more complex schemas.
- **Caching**: Use caching for faster access to frequently used forms.
- **UI Integration**: Create a frontend for easier form creation and data entry.

---

This project is designed for scalable and flexible form creation. Contributions and improvements are always welcome!
