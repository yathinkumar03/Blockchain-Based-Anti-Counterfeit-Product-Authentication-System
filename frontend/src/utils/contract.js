import { ethers } from "ethers";
import contractABI from "./contractABI.json";

export const CONTRACT_ADDRESS =
  "0xf3dD3EfC41b12E3D144f7e7dC9f70fD54599b388";

const getProvider = () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  return new ethers.BrowserProvider(window.ethereum);
};

export const getContract = async () => {
  await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider = getProvider();
  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    contractABI,
    signer
  );
};

export const getSignerContract = async () => {
  const provider = getProvider();
  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    contractABI,
    signer
  );
};

export const getReadContract = async () => {
  const provider = getProvider();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    contractABI,
    provider
  );
};
export const buildProductHash = (
  productId,
  productName,
  batchNumber,
  manufacturingDate,
  manufacturerAddress,
  timestamp
) => {
  return ethers.keccak256(
    ethers.solidityPacked(
      ["string", "string", "string", "string", "address", "uint256"],
      [
        productId,
        productName,
        batchNumber,
        manufacturingDate,
        manufacturerAddress,
        timestamp
      ]
    )
  );
};