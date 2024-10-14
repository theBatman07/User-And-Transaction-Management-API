# User and Transaction Management

This project is a Node.js REST API that uses MongoDB as the database. The API provides functionalities for managing users and transactions, including querying transactions by various filters such as status, date range, and type.

## Features

- **User Management**:
  
  - Create users.
  - Get user details by ID.
  - Retrieve all users.
- **Transaction Management**:
  
  - Create transactions for users.
  - Retrieve all transactions for a user, with filters such as status, transaction type (debit/credit), and date range.
  - Retrieve all transactions (with user details), with similar filtering options.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building REST APIs.
- **MongoDB**: NoSQL database used to store users and transactions.
- **Postman**: Tool used to test API requests.

## Getting Started

### 1. Clone the repository

```bash
git clone
```

### 2. Install Dependencies

Install the project dependencies using `npm`:

```bash
npm install
```

### 3. Configure MongoDB

Make sure MongoDB is running on your local machine, or use MongoDB Atlas (cloud database). Then in a `.env` file (if using dotenv), configure your MongoDB connection:

```js
MONGO_URI="your_mongo_url"
```

### 4. Run the Application

To run the project:

```bash
npm start
```

The API will be available at `http://localhost:5000`.

## API Endpoints

### 1. **User API**

#### Create a New User

- **URL**: `POST /api/users`
  
- **Request Body**:
  
  ```json
  { 
      "name": "John Doe", 
      "phoneNumber": "9123456789" 
  }
  ```
  

#### Get All Users

- **URL**: `GET /api/users`
  

#### Get User by ID

- **URL**: `GET /api/users/:id`
  

### 2. **Transaction API**

#### Create a Transaction

- **URL**: `POST /api/transactions`
  
- **Request Body**:
  
  ```json
  { 
      "status": "success", 
      "type": "credit", 
      "transactionDate": "2024-10-14T15:00:00.000Z", 
      "amount": 300, 
      "userId": "64ab12345c67890abcdef123" 
  }
  ```
  

#### Get All Transactions for a User (with Filters)

- **URL**: `GET /api/transactions/user/:userId`
  
- **Query Params** (Optional):
  
  - `status`: `success`, `pending`, `failed`.
  - `type`: `debit`, `credit`.
  - `fromDate`: Date in ISO format (e.g., `2024-10-01`).
  - `toDate`: Date in ISO format (e.g., `2024-10-15`).
- **Example**:
  
  ```bash
  GET /api/transactions/user/64ab12345c67890abcdef123?status=success&type=debit&fromDate=2024-10-01&toDate=2024-10-15
  ```
  

#### Get All Transactions (with User Details and Filters)

- **URL**: `GET /api/transactions`
  
- **Query Params** (Optional):
  
  - `status`: `success`, `pending`, `failed`.
  - `type`: `debit`, `credit`.
  - `fromDate`: Date in ISO format (e.g., `2024-10-01`).
  - `toDate`: Date in ISO format (e.g., `2024-10-15`).
- **Example**:
  
  ```bash
  GET /api/transactions?status=success&type=credit&fromDate=2024-10-01&toDate=2024-10-15
  ```

### Run in Postman

**Postman** - [<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/26591371-f22e57b7-032e-4268-a9fd-097451b38b37?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D26591371-f22e57b7-032e-4268-a9fd-097451b38b37%26entityType%3Dcollection%26workspaceId%3D6f236162-605d-44df-aa93-79d75022bdf5)