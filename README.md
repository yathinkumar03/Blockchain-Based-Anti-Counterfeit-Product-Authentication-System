# Blockchain-Based Anti-Counterfeit Product Authentication System

## 📌 Project Overview

ChainSure is a blockchain-powered anti-counterfeit product authentication and decentralized supply-chain verification platform developed using Ethereum, Solidity, React, MetaMask, and Ganache.

The system enables manufacturers to securely register products on the blockchain, generate QR codes for verification, and track ownership transfers throughout the supply chain. Consumers can verify product authenticity using Product IDs or QR codes, helping prevent counterfeit products and ensuring transparency.

---

# 🚀 Features

- Secure blockchain-based product registration
- MetaMask wallet authentication
- QR code generation and verification
- Ownership transfer tracking
- Decentralized product verification
- Manufacturer authorization system
- Admin dashboard
- Role-based access control
- Product image support
- Modern responsive UI with glassmorphism design

---

# 🛠 Technologies Used

## Frontend
- React.js
- Vite
- CSS3
- React Router DOM
- Ethers.js
- React Hot Toast

## Blockchain
- Solidity
- Ethereum
- Ganache
- Hardhat
- MetaMask

---

# 🧠 Smart Contract Features

The smart contract includes:

- Product registration
- Product verification
- Ownership transfer
- Ownership history tracking
- Manufacturer authorization
- Secure hash generation using `keccak256`
- Role-based access restrictions

---

# 🔐 Digital Signature Algorithm

The project uses:

ECDSA (Elliptic Curve Digital Signature Algorithm)

with Ethereum's `secp256k1` elliptic curve for secure wallet authentication and transaction signing through MetaMask.

---

# 🏗 System Architecture

User  
↓  
React Frontend  
↓  
MetaMask Wallet  
↓  
Ethers.js  
↓  
Ethereum Blockchain (Ganache)  
↓  
Smart Contract  
↓  
Blockchain Product Storage  

---

# 🔄 Workflow

Manufacturer Registers Product  
↓  
Blockchain Stores Product Data  
↓  
QR Code Generated  
↓  
Ownership Transfers Recorded  
↓  
Consumer Verifies Product  
↓  
Authenticity Confirmed  

---

# 📂 Project Structure

```text
Blockchain-Based-Anti-Counterfeit-Product-Authentication-System
│
├── contracts
│   └── AntiCounterfeitProductAuthentication.sol
│
├── scripts
│   └── deploy.js
│
├── frontend
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
├── hardhat.config.js
├── package.json
├── README.md
└── .gitignore
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <repository-url>
```

---

## 2️⃣ Install Dependencies

### Root Dependencies

```bash
npm install
```

### Frontend Dependencies

```bash
cd frontend
npm install
```

---

# 🔗 Configure Ganache

- Open Ganache
- Use RPC URL:

```text
http://127.0.0.1:7545
```

- Chain ID:

```text
1337
```

---

# 🚀 Deploy Smart Contract

Run:

```bash
npx hardhat run scripts/deploy.js --network ganache
```

Copy deployed contract address and update:

```text
frontend/src/utils/contract.js
```

---

# 👨‍💻 Add Manufacturer

Run:

```bash
npx hardhat console --network ganache
```

Then:

```javascript
const contract = await ethers.getContractAt(
  "AntiCounterfeitProductAuthentication",
  "YOUR_CONTRACT_ADDRESS"
)

await contract.addManufacturer(
  "YOUR_WALLET_ADDRESS",
  "Test Manufacturer"
)
```

---

# 🌐 Start Frontend

```bash
cd frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# 📸 Main Modules

## Product Registration
Manufacturers register products securely on blockchain.

## Product Verification
Consumers verify authenticity using Product ID or QR code.

## Ownership Tracking
Track product movement across the supply chain.

## Admin Dashboard
Monitor blockchain system activity.

---

# 🔒 Security Features

- Blockchain immutability
- MetaMask wallet authentication
- ECDSA digital signatures
- Decentralized verification
- Smart contract authorization
- Tamper-resistant product records

---

# 📈 Future Enhancements

- IPFS decentralized storage
- AI-based counterfeit detection
- Mobile application
- NFT-based product certificates
- Multi-chain support
- Real-time analytics dashboard

---

# 🎯 Real-World Applications

- Pharmaceutical supply chains
- Luxury goods authentication
- Electronics verification
- Food traceability
- Logistics and shipment tracking

---

# 👨‍💻 Developed By

Yathin Kumar

---

# 📜 License

This project is developed for academic and educational purposes.