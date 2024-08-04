
# AdventureAlly

AdventureAlly is an e-commerce website backend built using Node.js and MongoDB. It provides endpoints for user authentication, product management, and shopping cart functionality.

## Features

- **User Authentication:** Users can sign up and sign in securely using JWT tokens.
- **Role-based Access Control:** Supports roles for users (user, admin) with different access permissions.
- **Product Management:** CRUD operations for managing products, including creation, update, deletion, and retrieval.
- **Shopping Cart:** Users can add products to their cart, view their cart, and manage cart items.
- **Additional Features:** Includes features like getting random products, best-selling products, etc.

## Getting Started

To get started with AdventureAlly, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Muslehud77/AdventureAlly-Server.git
   cd AdventureAlly-Server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```dotenv
   NODE_ENV=development
   PORT=5000
   DATABASE_URI=mongodb://localhost:27017/adventureally_db
   HASH_SALT=12
   DEFAULT_PASS=your_default_password
   JWT_ACCESS_SECRET=your_access_secret_key
   JWT_REFRESH_SECRET=your_refresh_secret_key
   JWT_ACCESS_EXPIRES_IN=7d
   JWT_REFRESH_EXPIRES_IN=30d
   ```

4. Start the server:

   ```bash
   npm run start:dev
   ```

5. Use API endpoints as described in the documentation.

## API Documentation

- **POST /signup:** Create a new user account.
- **POST /signin:** Authenticate and obtain JWT tokens.
- **POST /refreshToken:** Refresh the access token.
- **POST /api/products:** Create a new product (Admin only).
- **GET /api/products:** Get all products.
- **GET /api/products/:id:** Get a product by ID.
- **PATCH /api/products/:id:** Update a product (Admin only).
- **DELETE /api/products/:id:** Delete a product (Admin only).
- **POST /api/carts:** Add a product to the shopping cart (User only).
- **GET /api/my-cart:** View items in the user's shopping cart.
- **GET /api/best-selling:** Get best-selling products.
- **GET /api/random-products:** Get random products.

Note: This is not an exhaustive list of all available APIs. There are many more endpoints to explore and use in the project.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your improvements.

## Client Side

For the client-side of this project, visit the following links:

[![Frontend Live Demo](https://img.shields.io/badge/Frontend%20Live%20Demo-AdventureAlly-blue?style=for-the-badge&logo=appveyor)](https://adventure-ally.netlify.app/)
[![Client Repository](https://img.shields.io/badge/Client%20Repository-AdventureAlly-blue?style=for-the-badge&logo=github)](https://github.com/Muslehud77/AdventureAlly-client)

## Necessary Setup for Client

To set up the client-side of AdventureAlly, follow these steps:

1. Clone the client repository:
   ```bash
   git clone https://github.com/Muslehud77/AdventureAlly-client.git
   cd AdventureAlly-client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   If you encounter issues, use the following command:

   ```bash
   npm install --force
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

   ```dotenv
   VITE_IMAGEBB_API=your_imagebb_api_key
   VITE_BASE_URL=http://localhost:5000/api
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```



---

Thank you for checking out AdventureAlly! If you have any questions or feedback, feel free to reach out.


