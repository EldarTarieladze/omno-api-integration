# Omno API Integration with Express.js

This project demonstrates the integration of the Omno API for transaction creation and 3DS payment processing using Express.js.

## Features

- Express.js server setup
- Omno API integration for transaction creation
- Webhook handling for Omno API responses
- 3DS redirection mechanism
- API documentation using Swagger

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/EldarTarieladze/omno-api-integration.git
   cd omno-api-integration
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Omno API credentials:
   ```
   NODE_ENV=development
   PORT=3000
   OMNO_API_URL=https://api.omno.com
   CLIENT_ID=your_client_id
   CLIENT_SECRET=your_client_secret
   OMNO_TRANSACTION_API=https://api.omno.com/transaction/h2h/create
   OMNO_AUTH_API=https://sso.omno.com/realms/omno/protocol/openid-connect/token
   RETRY_MAX_ATTEMPTS=3
   RETRY_INITIAL_DELAY=1000
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The server will start running on `http://localhost:3000` (or the port specified in your environment).

## API Endpoints

- `POST /create-transaction`: Create a new transaction
- `POST /webhook`: Handle Omno API webhooks

For detailed API documentation, visit `http://localhost:3000/api-docs` after starting the server.
