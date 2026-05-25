import { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalProducts: 12,
    totalTransfers: 28,
    connectedWallet: "",
    role: "Manufacturer"
  });

  useEffect(() => {

    async function loadData() {

      if (window.ethereum) {

        const accounts =
          await window.ethereum.request({
            method: "eth_accounts"
          });

        setStats((prev) => ({
          ...prev,
          connectedWallet:
            accounts[0] || "Not Connected"
        }));
      }
    }

    loadData();

  }, []);

  return (

    <div className="stack">

      <SectionCard
        title="Admin Dashboard"
        subtitle="Blockchain analytics overview"
      >

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h3>Total Products</h3>
            <p>{stats.totalProducts}</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Transfers</h3>
            <p>{stats.totalTransfers}</p>
          </div>

          <div className="dashboard-card">
            <h3>User Role</h3>
            <p>{stats.role}</p>
          </div>

          <div className="dashboard-card">
            <h3>Connected Wallet</h3>

            <p
              style={{
                wordBreak: "break-word"
              }}
            >
              {stats.connectedWallet}
            </p>
          </div>

        </div>

      </SectionCard>

    </div>
  );
}

export default AdminDashboard;