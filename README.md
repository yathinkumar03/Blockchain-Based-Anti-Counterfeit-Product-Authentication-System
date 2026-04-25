# Blockchain-Based-Anti-Counterfeit-Product-Authentication-System
Blockchain-based system to prevent counterfeit products by enabling secure product registration, verification, and ownership tracking. Built with Solidity, Hardhat, Ganache, React, and Ethers.js, it ensures transparency and immutability across the supply chain using decentralized technology.
# Blockchain-Based Anti-Counterfeit Product Authentication System

This project implements a decentralized application (DApp) to combat counterfeit products using blockchain technology. It enables manufacturers to securely register products on a blockchain, allowing consumers and stakeholders to verify authenticity and track ownership throughout the supply chain.

The system is built using Solidity smart contracts deployed via Hardhat on a local Ethereum network (Ganache). The frontend is developed using React (Vite) and integrates with MetaMask for wallet-based authentication and transaction signing.

## Key Features

* 🔐 **Manufacturer Authorization** – Only verified manufacturers can register products
* 📦 **Product Registration** – Products are stored immutably on blockchain
* 🔍 **Product Verification** – Consumers can verify authenticity using Product ID or QR code
* 🔄 **Ownership Transfer** – Tracks product movement across supply chain participants
* 📜 **Ownership History** – Transparent and tamper-proof tracking of all ownership changes
* 📱 **QR Code Integration** – Easy verification via QR scanning

## Tech Stack

* **Blockchain:** Solidity, Ethereum
* **Development Framework:** Hardhat
* **Local Blockchain:** Ganache
* **Frontend:** React (Vite), JavaScript
* **Web3 Integration:** Ethers.js
* **Wallet:** MetaMask

## System Workflow

1. Manufacturer registers product on blockchain
2. Product data is stored immutably with a unique identifier
3. Users verify product authenticity using Product ID or QR code
4. Ownership is transferred across supply chain entities
5. Complete ownership history is maintained and viewable

## Project Objective

To provide a decentralized, tamper-proof solution for product authentication and supply chain transparency, eliminating reliance on centralized systems vulnerable to manipulation.

## Future Enhancements

* IPFS integration for storing product images/documents
* Role-based dashboards (manufacturer, distributor, consumer)
* Deployment on public testnets (Sepolia/Polygon)
* Mobile app integration for QR-based verification

---

This project demonstrates practical application of blockchain in real-world supply chain and anti-counterfeiting scenarios.
