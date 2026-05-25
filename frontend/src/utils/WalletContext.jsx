import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BrowserProvider } from "ethers";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [account, setAccount] = useState("");
  const [networkName, setNetworkName] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  async function syncWallet(provider) {
    const signer = await provider.getSigner();
    const network = await provider.getNetwork();
    setAccount(await signer.getAddress());
    setNetworkName(network.name);
  }

  async function connectWallet() {
    if (!window.ethereum) {
      toast.error("Install MetaMask to use this application.");
      return;
    }

    setIsConnecting(true);

    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      await syncWallet(provider);
      toast.success("Wallet connected.");
    } catch (error) {
      toast.error(error.shortMessage || error.message || "Unable to connect wallet.");
    } finally {
      setIsConnecting(false);
    }
  }

  useEffect(() => {
    if (!window.ethereum) {
      return undefined;
    }

    const handleAccountsChanged = (accounts) => {
      setAccount(accounts[0] || "");
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{
        account,
        networkName,
        isConnecting,
        connectWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
