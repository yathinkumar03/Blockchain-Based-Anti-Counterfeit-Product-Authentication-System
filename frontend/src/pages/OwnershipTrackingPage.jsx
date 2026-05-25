import { useState } from "react";
import toast from "react-hot-toast";
import SectionCard from "../components/SectionCard";
import { ethers } from "ethers";
import { getReadContract, getSignerContract } from "../utils/contract";

function OwnershipTrackingPage() {
  const [productId, setProductId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleTransfer(event) {
    event.preventDefault();

    if (!productId || !newOwner) {
      toast.error("Enter Product ID and New Owner Address");
      return;
    }

    if (!ethers.isAddress(newOwner)) {
      toast.error("Invalid wallet address");
      return;
    }

    try {
      setLoading(true);

      const contract = await getSignerContract();

      toast.loading("Transferring ownership...", { id: "transfer" });

      const tx = await contract.transferOwnership(
        productId.trim(),
        newOwner.trim()
      );

      await tx.wait();

      toast.success("Ownership transferred successfully", { id: "transfer" });

    } catch (error) {
      console.error(error);
      toast.error(
        error.shortMessage || error.message || "Transfer failed",
        { id: "transfer" }
      );
    } finally {
      setLoading(false);
    }
  }

  async function fetchHistory(event) {
    event.preventDefault();

    if (!productId) return;

    try {
      const contract = await getReadContract();

      const result = await contract.getOwnershipHistory(productId.trim());

      const formatted = result.map((entry, index) => ({
        owner: entry.owner,
        timestamp: new Date(
          Number(entry.timestamp) * 1000
        ).toLocaleString(),
        step: index + 1
      }));

      setHistory(formatted);

    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch ownership history");
    }
  }

  return (
    <div className="stack">

      <SectionCard
        title="Transfer Ownership"
        subtitle="Transfer product to next owner"
      >
        <form className="form-grid" onSubmit={handleTransfer}>
          <input
            type="text"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />

          <input
            type="text"
            placeholder="New Owner Address"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
          />

          <button className="primary-button" disabled={loading}>
            {loading ? "Processing..." : "Transfer Ownership"}
          </button>
        </form>
      </SectionCard>

      <SectionCard
        title="Ownership History"
        subtitle="View blockchain ownership trail"
      >
        <form onSubmit={fetchHistory} className="form-inline">
          <input
            type="text"
            placeholder="Enter Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />

          <button className="secondary-button">
            Get History
          </button>
        </form>

        <div className="timeline">
          {history.length === 0 ? (
            <p>No history yet</p>
          ) : (
            history.map((entry) => (
              <div key={entry.step} className="timeline-item">
                <strong>Step {entry.step}</strong>
                <p>Owner: {entry.owner}</p>
                <p>{entry.timestamp}</p>
              </div>
            ))
          )}
        </div>
      </SectionCard>

    </div>
  );
}

export default OwnershipTrackingPage;