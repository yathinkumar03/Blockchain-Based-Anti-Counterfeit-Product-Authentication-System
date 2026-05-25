import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SectionCard from "../components/SectionCard";
import StatusBadge from "../components/StatusBadge";
import { useWallet } from "../utils/WalletContext";
import { getReadContract, getSignerContract } from "../utils/contract";

function ManufacturerDashboard() {
  const { account } = useWallet();
  const [formData, setFormData] = useState({ address: "", name: "" });
  const [manufacturerRecord, setManufacturerRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStatus() {
      if (!account) {
        setManufacturerRecord(null);
        return;
      }

      try {
        const contract = getReadContract();
        const result = await contract.getManufacturer(account);
        setManufacturerRecord(result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStatus();
  }, [account]);

  async function handleAuthorize(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const contract = await getSignerContract();
      const tx = await contract.addManufacturer(formData.address, formData.name);
      toast.loading("Authorizing manufacturer...", { id: "authorize" });
      await tx.wait();
      toast.success("Manufacturer authorized successfully.", { id: "authorize" });
      setFormData({ address: "", name: "" });
    } catch (error) {
      toast.error(error.shortMessage || error.message || "Authorization failed.", {
        id: "authorize"
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <SectionCard
        title="Manufacturer Dashboard"
        subtitle="Admin can authorize manufacturer wallets and review current wallet privileges."
      >
        <div className="dashboard-grid">
          <div className="feature-card">
            <span className="eyebrow">Connected Wallet Status</span>
            <h3>{account || "Connect MetaMask to continue"}</h3>
            {manufacturerRecord?.isAuthorized ? (
              <StatusBadge variant="success">Authorized Manufacturer</StatusBadge>
            ) : (
              <StatusBadge variant="warning">Not Authorized</StatusBadge>
            )}
          </div>
          <div className="feature-card">
            <span className="eyebrow">Security Notes</span>
            <p>Only the contract owner can add or remove manufacturer addresses.</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Authorize Manufacturer"
        subtitle="Use the admin wallet connected in MetaMask to add manufacturer access."
      >
        <form className="form-grid" onSubmit={handleAuthorize}>
          <label>
            Manufacturer Wallet Address
            <input
              type="text"
              value={formData.address}
              onChange={(event) =>
                setFormData((current) => ({ ...current, address: event.target.value }))
              }
              required
              placeholder="0x..."
            />
          </label>
          <label>
            Manufacturer Name
            <input
              type="text"
              value={formData.name}
              onChange={(event) =>
                setFormData((current) => ({ ...current, name: event.target.value }))
              }
              required
              placeholder="Acme Labs"
            />
          </label>
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Authorize Manufacturer"}
          </button>
        </form>
      </SectionCard>
    </div>
  );
}

export default ManufacturerDashboard;
