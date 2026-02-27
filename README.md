# 💳 Mini Digital Wallet v2

![GitHub repo size](https://img.shields.io/github/repo-size/ayoub-jabiri/mini-digital-wallet-v2?style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/ayoub-jabiri/mini-digital-wallet-v2?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/ayoub-jabiri/mini-digital-wallet-v2?style=for-the-badge)
![License](https://img.shields.io/github/license/ayoub-jabiri/mini-digital-wallet-v2?style=for-the-badge)

A robust, scalable, and secure digital wallet infrastructure designed to handle financial transactions, user balances, and secure transfers with high efficiency.

---

## 🚀 Overview

**Mini Digital Wallet v2** is an evolved version of the original digital wallet system. It provides a clean API-first approach to managing personal finances. Whether it's cashing in, peer-to-peer transfers, or viewing transaction histories, this system is built with a focus on **concurrency**, **data integrity**, and **speed**.

### ✨ Key Features

-   👤 **User Management**: Secure registration and authentication.
-   💰 **Wallet Operations**: Deposit, withdraw, and real-time balance tracking.
-   💸 **P2P Transfers**: Seamlessly send money to other users within the ecosystem.
-   📜 **Transaction Ledger**: A comprehensive, immutable history of all financial activities.
-   🔒 **Security-First**: Implementation of transaction atomicity (ACID) to ensure no money is "lost" during transfers.
-   ⚡ **Optimized Performance**: Refactored logic from v1 for faster processing and lower latency.

---

## 🛠 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Backend** | Node.js and Express.js |

---

## 📂 Project Structure

```text
├── src/
│   ├── main/
│   │   ├── java/com/wallet/
│   │   │   ├── controller/    # API Endpoints
│   │   │   ├── service/       # Business Logic
│   │   │   ├── repository/    # Database Access
│   │   │   ├── model/         # Entities & DTOs
│   │   │   └── config/        # Security & App Config
│   └── test/                  # Unit & Integration Tests
├── docker-compose.yml         # Containerization
└── pom.xml / build.gradle     # Dependency Management
