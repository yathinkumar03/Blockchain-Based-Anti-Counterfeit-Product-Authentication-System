// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProductAuth {

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    // -----------------------------
    // STRUCTS
    // -----------------------------

    struct Manufacturer {
        bool isAuthorized;
        string name;
    }

    struct OwnershipRecord {
        address owner;
        uint256 timestamp;
    }

    struct Product {
        string productId;
        string productName;
        string batchNumber;
        string manufacturingDate;
        bytes32 productHash;
        address manufacturer;
        address currentOwner;
        uint256 registeredAt;
        bool exists;
    }

    // -----------------------------
    // STATE VARIABLES
    // -----------------------------

    mapping(address => Manufacturer) public manufacturers;
    mapping(string => Product) private products;
    mapping(string => OwnershipRecord[]) private ownershipHistory;

    // -----------------------------
    // EVENTS
    // -----------------------------

    event ManufacturerAdded(address indexed manufacturer, string name);
    event ManufacturerRemoved(address indexed manufacturer);

    event ProductRegistered(
        string indexed productId,
        address indexed manufacturer,
        uint256 timestamp
    );

    event OwnershipTransferred(
        string indexed productId,
        address indexed from,
        address indexed to,
        uint256 timestamp
    );

    // -----------------------------
    // MODIFIERS
    // -----------------------------

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyManufacturer() {
        require(
            manufacturers[msg.sender].isAuthorized,
            "Not an authorized manufacturer"
        );
        _;
    }

    modifier productExists(string memory _productId) {
        require(products[_productId].exists, "Product does not exist");
        _;
    }

    // -----------------------------
    // ADMIN FUNCTIONS
    // -----------------------------

    function addManufacturer(address _manufacturer, string memory _name)
        public
        onlyAdmin
    {
        manufacturers[_manufacturer] = Manufacturer(true, _name);
        emit ManufacturerAdded(_manufacturer, _name);
    }

    function removeManufacturer(address _manufacturer)
        public
        onlyAdmin
    {
        manufacturers[_manufacturer].isAuthorized = false;
        emit ManufacturerRemoved(_manufacturer);
    }

    // -----------------------------
    // PRODUCT FUNCTIONS
    // -----------------------------

    function registerProduct(
        string memory _productId,
        string memory _productName,
        string memory _batchNumber,
        string memory _manufacturingDate
    )
        public
        onlyManufacturer
    {
        require(!products[_productId].exists, "Product already registered");

        bytes32 generatedHash = keccak256(
            abi.encodePacked(
                _productId,
                _productName,
                _batchNumber,
                _manufacturingDate,
                msg.sender,
                block.timestamp
            )
        );

        products[_productId] = Product({
            productId: _productId,
            productName: _productName,
            batchNumber: _batchNumber,
            manufacturingDate: _manufacturingDate,
            productHash: generatedHash,
            manufacturer: msg.sender,
            currentOwner: msg.sender,
            registeredAt: block.timestamp,
            exists: true
        });

        ownershipHistory[_productId].push(
            OwnershipRecord(msg.sender, block.timestamp)
        );

        emit ProductRegistered(_productId, msg.sender, block.timestamp);
    }

    function verifyProduct(string memory _productId)
        public
        view
        productExists(_productId)
        returns (
            string memory,
            string memory,
            string memory,
            address,
            address,
            bytes32
        )
    {
        Product memory p = products[_productId];

        return (
            p.productName,
            p.batchNumber,
            p.manufacturingDate,
            p.manufacturer,
            p.currentOwner,
            p.productHash
        );
    }

    function transferOwnership(
        string memory _productId,
        address _newOwner
    )
        public
        productExists(_productId)
    {
        require(
            msg.sender == products[_productId].currentOwner,
            "Only current owner can transfer ownership"
        );

        address previousOwner = products[_productId].currentOwner;
        products[_productId].currentOwner = _newOwner;

        ownershipHistory[_productId].push(
            OwnershipRecord(_newOwner, block.timestamp)
        );

        emit OwnershipTransferred(
            _productId,
            previousOwner,
            _newOwner,
            block.timestamp
        );
    }

    function getOwnershipHistory(string memory _productId)
        public
        view
        productExists(_productId)
        returns (OwnershipRecord[] memory)
    {
        return ownershipHistory[_productId];
    }
}