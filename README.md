# Monter Backend

## Description

This project is a Node.js application with MongoDB as the database, implementing RESTful APIs for user registration, login, verification, and profile management. It follows industry standards for clean code and includes features such as email OTP verification and JWT token-based authentication.

## Installation

1. Clone the repository:
    ```bash
[    git clone https://github.com/your/repository.git
](https://github.com/shivaprasadnashte/monter-backend-assignment)    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Define the following variables:
        ```
        PORT
        MONGODB_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        PUBLIC_MAIL_ID
        PUBLIC_PASSWORD
        ```

4. Run the application:
    ```bash
    node index.js
    ```

## API Routes

- `/api/users/register`
    - Method: POST
    - Description: Register a new user with email and password.
    - Request Body:
        ```json
        {
            "email": "example@example.com",
            "password": "password123"
        }
        ```
    - Response:
        ```json
        {
            "message": "User registered successfully. Please verify your email."
        }
        ```

- `/api/users/login`
    - Method: POST
    - Description: Login with email and password to generate JWT token.
    - Request Body:
        ```json
        {
            "email": "example@example.com",
            "password": "password123"
        }
        ```
    - Response:
        ```json
        {
            "token": "jwt_token"
        }
        ```

- `/api/users/verify`
    - Method: POST
    - Description: Verify user's email using OTP.
    - Request Body:
        ```json
        {
            "email": "example@example.com",
            "otp": "123456"
        }
        ```
    - Response:
        ```json
        {
            "message": "Email verified successfully."
        }
        ```

- `/api/users/resendotp`
    - Method: POST
    - Description: Resend OTP to user's email for verification.
    - Request Body:
        ```json
        {
            "email": "example@example.com"
        }
        ```
    - Response:
        ```json
        {
            "message": "OTP resent successfully."
        }
        ```

- `/api/users/getuser`
    - Method: GET
    - Description: Retrieve user information using JWT token.
    - Headers:
        ```
        Authorization: Bearer <jwt_token>
        ```
    - Response:
        ```json
        {
            "email": "example@example.com",
            "location": "New York",
            "age": 30,
            "work_details": "Software Engineer"
        }
        ```

- `/api/users/adddetails`
    - Method: POST
    - Description: Add extra information like location, age, and work details to user profile.
    - Headers:
        ```
        Authorization: Bearer <jwt_token>
        ```
    - Request Body:
        ```json
        {
            "location": "New York",
            "age": 30,
            "work_details": "Software Engineer"
        }
        ```
    - Response:
        ```json
        {
            "message": "User details added successfully."
        }
        ```
  
## MongoDB Schema
![image](https://github.com/shivaprasadnashte/monter-backend-assignment/assets/113913102/e3785b86-ba7b-4e85-82ea-673e1b0dcb59)
