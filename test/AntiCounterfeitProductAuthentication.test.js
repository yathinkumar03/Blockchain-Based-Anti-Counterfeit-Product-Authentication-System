const { expect } = require("chai");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { ethers } = require("hardhat");

describe("AntiCounterfeitProductAuthentication", function () {
  async function deployFixture() {
    const [admin, manufacturer, distributor, retailer, consumer] =
      await ethers.getSigners();

    const factory = await ethers.getContractFactory(
      "AntiCounterfeitProductAuthentication"
    );
    const contract = await factory.deploy();
    await contract.waitForDeployment();

    return { contract, admin, manufacturer, distributor, retailer, consumer };
  }

  function buildHash(productId, productName, batchNumber, manufacturingDate) {
    return ethers.keccak256(
      ethers.solidityPacked(
        ["string", "string", "string", "string"],
        [productId, productName, batchNumber, manufacturingDate]
      )
    );
  }

  it("allows admin to add and remove a manufacturer", async function () {
    const { contract, manufacturer } = await deployFixture();

    await expect(contract.addManufacturer(manufacturer.address, "Acme Labs"))
      .to.emit(contract, "ManufacturerAdded")
      .withArgs(manufacturer.address, "Acme Labs", anyValue);

    expect(await contract.isManufacturerAuthorized(manufacturer.address)).to.equal(true);

    await expect(contract.removeManufacturer(manufacturer.address))
      .to.emit(contract, "ManufacturerRemoved")
      .withArgs(manufacturer.address, anyValue);

    expect(await contract.isManufacturerAuthorized(manufacturer.address)).to.equal(false);
  });

  it("prevents unauthorized wallets from registering products", async function () {
    const { contract, consumer } = await deployFixture();
    const hash = buildHash("P001", "Medicine Kit", "BATCH-01", "2026-01-10");

    await expect(
      contract
        .connect(consumer)
        .registerProduct("P001", "Medicine Kit", "BATCH-01", "2026-01-10", hash)
    ).to.be.revertedWithCustomError(contract, "UnauthorizedManufacturer");
  });

  it("registers a product and returns authentic verification details", async function () {
    const { contract, manufacturer, consumer } = await deployFixture();
    const productId = "P001";
    const productName = "Medicine Kit";
    const batchNumber = "BATCH-01";
    const manufacturingDate = "2026-01-10";
    const hash = buildHash(productId, productName, batchNumber, manufacturingDate);

    await contract.addManufacturer(manufacturer.address, "Acme Labs");
    await expect(
      contract
        .connect(manufacturer)
        .registerProduct(productId, productName, batchNumber, manufacturingDate, hash)
    )
      .to.emit(contract, "ProductRegistered")
      .withArgs(productId, hash, manufacturer.address, anyValue);

    const result = await contract.connect(consumer).verifyProduct(productId);
    expect(result[0]).to.equal(true);
    expect(result[1]).to.equal(manufacturer.address);
    expect(result[2]).to.equal(hash);
  });

  it("prevents duplicate product ids", async function () {
    const { contract, manufacturer } = await deployFixture();
    const hash = buildHash("P001", "Medicine Kit", "BATCH-01", "2026-01-10");

    await contract.addManufacturer(manufacturer.address, "Acme Labs");
    await contract
      .connect(manufacturer)
      .registerProduct("P001", "Medicine Kit", "BATCH-01", "2026-01-10", hash);

    await expect(
      contract
        .connect(manufacturer)
        .registerProduct("P001", "Medicine Kit", "BATCH-01", "2026-01-10", hash)
    ).to.be.revertedWithCustomError(contract, "DuplicateProduct");
  });

  it("tracks ownership transfers across the supply chain", async function () {
    const { contract, manufacturer, distributor, retailer } = await deployFixture();
    const hash = buildHash("P001", "Medicine Kit", "BATCH-01", "2026-01-10");

    await contract.addManufacturer(manufacturer.address, "Acme Labs");
    await contract
      .connect(manufacturer)
      .registerProduct("P001", "Medicine Kit", "BATCH-01", "2026-01-10", hash);

    await contract
      .connect(manufacturer)
      .transferOwnership("P001", distributor.address, "Distributor");
    await contract
      .connect(distributor)
      .transferOwnership("P001", retailer.address, "Retailer");

    const history = await contract.getProductHistory("P001");
    expect(history).to.have.lengthOf(3);
    expect(history[1].to).to.equal(distributor.address);
    expect(history[2].to).to.equal(retailer.address);
  });

  it("returns false for unknown products during verification", async function () {
    const { contract, consumer } = await deployFixture();
    const result = await contract.connect(consumer).verifyProduct("UNKNOWN");
    expect(result[0]).to.equal(false);
  });
});
