
# Basic Setup

This project is a basic server setup using Node.js, Express, TypeScript, and Mongoose. It provides a starting point for developing a server-side application with a structured and maintainable codebase.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **Mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`.
- **ts-node-dev**: A development tool that compiles TypeScript files on the fly and restarts the server upon file changes.
- **ESLint**: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- **Prettier**: An opinionated code formatter.
- **Husky**: A tool for managing Git hooks.

## Project Structure

```
Basic_Setup/
├── src/
│   ├── server.ts
│   └── ...
├── dist/
│   └── server.js
├── .env
├── package.json
└── README.md
```

## Setup Instructions

1. **Clone the Repository**

   ```sh
   git clone https://github.com/Muslehud77/Basic-Server-Template-Node.git
   cd Basic_Setup
   ```

2. **Install Dependencies**

   Make sure you have Node.js and npm installed. Then run:

   ```sh
   npm install
   ```

3. **Setup Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   PORT=your_port_number
   DB_URI=your_mongodb_connection_string
   ```

   Replace `your_port_number` with the port number you want the server to run on (e.g., 6000) and `your_mongodb_connection_string` with your actual MongoDB connection string.

4. **Build the Project**

   Compile the TypeScript code to JavaScript:

   ```sh
   npm run build
   ```

5. **Start the Server**

   - For development:

     ```sh
     npm run start:dev
     ```

   - For production:

     ```sh
     npm run start:prod
     ```

## Scripts

- **`build`**: Compiles TypeScript files to JavaScript.
- **`lint`**: Runs ESLint to analyze the code for potential errors and code style issues.
- **`lint:fix`**: Automatically fixes linting issues.
- **`prettier`**: Formats the code using Prettier.
- **`prettier:fix`**: Automatically formats the code using Prettier.
- **`start:dev`**: Starts the server in development mode with auto-reloading.
- **`start:prod`**: Starts the server in production mode.
- **`test`**: Placeholder for running tests.

## Environment Variables

The following environment variables are used in the project:

- **`PORT`**: The port on which the server will run.
- **`DB_URI`**: The MongoDB connection string.

Make sure to replace the placeholder values in the `.env` file with your own configurations.

## Conclusion

This basic setup provides a structured starting point for developing a Node.js server application with TypeScript, Express, and Mongoose. Feel free to modify and extend the project to suit your needs.
