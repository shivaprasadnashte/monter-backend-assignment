# Project Name

## Description

This project is a Node.js application with MongoDB as the database, implementing RESTful APIs for user registration, login, verification, and profile management. It follows industry standards for clean code and includes features such as email OTP verification and JWT token-based authentication.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your/repository.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Define the following variables:
        ```
        PORT=3000
        MONGODB_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        ```

4. Run the application:
    ```bash
    npm start
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

## Screenshots

- Include screenshots of each API request from Postman.
  
## MongoDB Schema

- Provide a schema diagram or description of the MongoDB collections used in the application.

## Conclusion

- Summarize the project and any additional notes.

## Contributors

- List the contributors to the project.
  
## License

- Specify the project's license (e.g., MIT License).
