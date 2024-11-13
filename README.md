# Wallet Service API

This Wallet Service provides a set of APIs to manage user wallets, including creating wallets, adding funds, money transfers between users, and balance withdrawal.


## E-R Diagram
- The E-R diagram below represents the database schema used in this project. It shows the relationships between users, wallets, and transactions.



## Technologies Used
- `Node.js`: JavaScript runtime for building the server.
- `Express`: Web framework for API creation.
- `Knex`: SQL query builder for Node.js used for database migrations and queries.
- `MySQL`: Relational database to store user and transaction data.
- `Jest`: Testing framework for unit tests.
- `bcrypt`: Password hashing library.
- `jsonwebtoken`: JWT-based authentication.
- `TypeScript`: Type-safe JavaScript alternative.
- `dotenv`: Environment variable management.


## Installation

To install the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/wallet-service.git
cd wallet-service

npm install
```

## Usage

Create a .env file in the root directory with the following content:

```bash

PORT=3000
DB_HOST=<your-database-host>
DB_USER=<your-database-username>
DB_PASSWORD=<your-database-password>
DB_NAME=<your-database-name>
JWT_SECRET=<your-jwt-secret>
ADJUTOR_API_URL=<adjutor-api-url>
ADJUTOR_TOKEN=<adjutor-api-token>
```


Run database migrations:

```bash
npx knex migrate:latest --knexfile src/db/knexfile.ts
```
Or

```bash
npx ts-node -r dotenv/config node_modules/knex/bin/cli.js migrate:latest --knexfile src/db/knexfile.ts
```

Run the unit tests:

```bash
npm test
```

To start the server, run:

```bash
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints Testing
To test the API endpoints, you can use Postman. Import the following Postman collection link to get started:

[Postman Collection](https://www.postman.com/be-devs-8933/workspace/be/request/35579147-3842bf86-4937-4253-8f7f-3a33f8d9444e?action=share&creator=35579147&ctx=documentation)

You can choose to test it locally but Make sure your server is running before testing the endpoints.