// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AntiCounterfeitProductAuthentication {

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
        string imageUrl;
        bytes32 productHash;
        address manufacturer;
        address currentOwner;
        uint256 registeredAt;
        bool exists;
    }

    // -----------------------------
    // STORAGE
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

    function addManufacturer(
        address _manufacturer,
        string memory _name
    )
        public
        onlyAdmin
    {
        manufacturers[_manufacturer] = Manufacturer({
            isAuthorized: true,
            name: _name
        });

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
    // PRODUCT REGISTRATION
    // -----------------------------

    function registerProduct(
        string memory _productId,
        string memory _productName,
        string memory _batchNumber,
        string memory _manufacturingDate,
        string memory _imageUrl
    )
        public
        onlyManufacturer
    {
        require(
            !products[_productId].exists,
            "Product already registered"
        );

        bytes32 generatedHash = keccak256(
            abi.encodePacked(
                _productId,
                _productName,
                _batchNumber,
                _manufacturingDate,
                _imageUrl,
                msg.sender,
                block.timestamp
            )
        );

        products[_productId] = Product({
            productId: _productId,
            productName: _productName,
            batchNumber: _batchNumber,
            manufacturingDate: _manufacturingDate,
            imageUrl: _imageUrl,
            productHash: generatedHash,
            manufacturer: msg.sender,
            currentOwner: msg.sender,
            registeredAt: block.timestamp,
            exists: true
        });

        ownershipHistory[_productId].push(
            OwnershipRecord({
                owner: msg.sender,
                timestamp: block.timestamp
            })
        );

        emit ProductRegistered(
            _productId,
            msg.sender,
            block.timestamp
        );
    }

    // -----------------------------
    // PRODUCT VERIFICATION
    // -----------------------------

    function verifyProduct(string memory _productId)
        public
        view
        productExists(_productId)
        returns (
            string memory,
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
            p.imageUrl,
            p.manufacturer,
            p.currentOwner,
            p.productHash
        );
    }

    // -----------------------------
    // GET PRODUCT DETAILS
    // -----------------------------

    function getProduct(string memory _productId)
        public
        view
        productExists(_productId)
        returns (Product memory)
    {
        return products[_productId];
    }

    // -----------------------------
    // OWNERSHIP TRANSFER
    // -----------------------------

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
            OwnershipRecord({
                owner: _newOwner,
                timestamp: block.timestamp
            })
        );

        emit OwnershipTransferred(
            _productId,
            previousOwner,
            _newOwner,
            block.timestamp
        );
    }

    // -----------------------------
    // GET OWNERSHIP HISTORY
    // -----------------------------

    function getOwnershipHistory(string memory _productId)
        public
        view
        productExists(_productId)
        returns (OwnershipRecord[] memory)
    {
        return ownershipHistory[_productId];
    }
}