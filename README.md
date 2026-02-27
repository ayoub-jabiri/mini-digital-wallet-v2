# 💳 Mini Digital Wallet v2

![Trello Link](https://trello.com/invite/b/69149dad2e2b021024a407e7/ATTI11b4515c73c183fe6908a5f5f017a77e316F22F4/mini-digital-wallet-v2)
![Canva Link]([https://img.shields.io/github/stars/ayoub-jabiri/mini-digital-wallet-v2?style=for-the-badge](https://www.canva.com/design/DAG0oNOZpgM/kQuqwsmqQKU2cG9zbkPXvQ/edit?utm_content=DAG0oNOZpgM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton))
![GitHub forks](https://img.shields.io/github/forks/ayoub-jabiri/mini-digital-wallet-v2?style=for-the-badge)
![License](https://img.shields.io/github/license/ayoub-jabiri/mini-digital-wallet-v2?style=for-the-badge)

A robust, scalable, and secure digital wallet infrastructure designed to handle financial transactions, user balances, and secure transfers with high efficiency.

---

## 🚀 Overview

**Mini Digital Wallet v2** is an evolved version of the original digital wallet system. It provides a clean API-first approach to managing personal finances, whether it's cashing in or viewing transaction histories.

### ✨ Key Features

-   👤 **User Management**: Secure registration.
-   💰 **Wallet Operations**: Secure registration, deposit, withdraw, and real-time balance tracking.
-   📜 **Transaction Ledger**: A comprehensive, immutable history of all financial activities.

---

## 🛠 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Backend** | Node.js and Express.js |

---

## 📂 Project Structure

```text
├── Folder/
│   ├── controllers/    # API Endpoints
│   ├── middleware/     # Middlewares Checks
│   ├── models/         # Data Storage
│   ├── routes/         # Routers
│   └── server.js       # Server Set up
```

---

## 🔌 API Documentation

The **Mini Digital Wallet v2** provides a RESTful interface for managing users and their financial assets. All request and response bodies are in `JSON` format.

### 👤 User Management
Endpoints for handling user profiles and authentication.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| <kbd>POST</kbd> | `/users` | Create a new user account |
| <kbd>GET</kbd> | `/users` | Retrieve a list of all users |
| <kbd>GET</kbd> | `/users/:id` | Get detailed information for a specific user |
| <kbd>PUT</kbd> | `/users/:id` | Update user profile details |
| <kbd>DELETE</kbd> | `/users/:id` | Deactivate/Remove a user account |

### 💳 Wallet Operations
Core financial endpoints for balance management and account tracking.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| <kbd>POST</kbd> | `/wallets` | Initialize a new wallet for a user |
| <kbd>GET</kbd> | `/wallets` | List all active wallets (Supports **Pagination** & **Filtering**) |
| <kbd>GET</kbd> | `/wallets/:id` | Fetch specific wallet details and balance |
| <kbd>PUT</kbd> | `/wallets/:id` | Update wallet metadata |
| <kbd>DELETE</kbd> | `/wallets/:id` | Close a specific wallet |

#### 🔍 Query Parameters (for `GET /wallets`)
To help manage large datasets, the following query parameters are supported:

* `limit` (Integer): The number of wallet records to return per page (e.g., `?limit=10`).
* `name` (String): Filter wallets by a specific name or owner (e.g., `?name=savings`).

**Example Request:**
`GET /wallets?limit=5&name=business`

### 💸 Financial Transactions
Specialized endpoints for moving funds in and out of the system.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| <kbd>POST</kbd> | `/wallets/:id/deposit` | **Deposit**: Add funds to the specified wallet |
| <kbd>POST</kbd> | `/wallets/:id/withdraw` | **Withdraw**: Remove funds from the specified wallet |
