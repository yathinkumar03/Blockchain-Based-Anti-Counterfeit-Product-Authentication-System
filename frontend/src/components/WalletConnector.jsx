import { useWallet } from "../utils/WalletContext";

function WalletConnector() {
  const { account, networkName, isConnecting, connectWallet } = useWallet();

  return (
    <div className="wallet-card">
      <div>
        <span className="eyebrow">Wallet</span>
        <p className="wallet-address">
          {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Not connected"}
        </p>
        <p className="wallet-network">{networkName || "MetaMask required"}</p>
      </div>
      <button className="primary-button" onClick={connectWallet} disabled={isConnecting}>
        {isConnecting ? "Connecting..." : account ? "Reconnect" : "Connect Wallet"}
      </button>
    </div>
  );
}

export default WalletConnector;
