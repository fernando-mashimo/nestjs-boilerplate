# NestJS User Management Service

This service is a part of a larger application, built using NestJS and Mongoose. It is responsible for handling basic user-related operations.

## Features

- User Creation
- Fetch All Users
- Fetch Single User by Email
- Update User
- Delete User

## Main Packages

- `@nestjs/common`: Provides essential NestJS decorators and utility functions.
- `@nestjs/config`: Configuration handling module for NestJS.
- `@nestjs/core`: The core module of NestJS, a framework for building efficient, reliable and scalable server-side applications.
- `@nestjs/mongoose`: Mongoose module for NestJS.
- `@nestjs/platform-express`: The express platform layer implementation for NestJS.
- `@nestjs/swagger`: Used for API documentation.
- `mongoose`: MongoDB object modeling tool designed to work in an asynchronous environment.
- `@vendia/serverless-express`: Library to run serverless applications on AWS Lambda.
- `aws-lambda`: AWS Lambda Typescript definitions.

## Automated Deployment

This project is set up to use GitHub Actions for continuous integration and deployment to AWS Lambda. Any changes pushed to the main branch will automatically trigger a build and deployment process.

The files listed below play an important role in the deployment process:
- `.github/workflows/main.yml`: drives the automated deployment process by GitHub Actions.
- `serverless.yml`: sets the deployment of the application in a serverless cloud infrastructure (AWS Lambda).
- `src/serverless.ts`: starts the application on the deployment environment.

## Running the Project Locally

To run the project locally, you can use the following scripts:

- `npm install`: Installs the project dependencies.
- `npm run start:dev`: Starts the application in watch mode.

## Postman Collection

A Postman collection is available in the `dev-utilities` folder to help you interact with the API endpoints.

## How to Use

To use this service, you need to make HTTP requests to the appropriate endpoints. For example, to create a user, you would send a POST request to the `/users` endpoint with the user's details in the request body.

## Contributing

Contributions are welcome. Please make sure to update the code as appropriate.

## License

UNLICENSED