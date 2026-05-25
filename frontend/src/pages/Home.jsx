import { Link } from "react-router-dom";
import SectionCard from "../components/SectionCard";
import StatusBadge from "../components/StatusBadge";

function Home() {
  return (
    <div className="stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Anti-Counterfeit Platform</span>
          <h1>Trust every product with blockchain-backed authenticity records.</h1>
          <p>
            Register products on-chain, verify provenance in seconds, and follow supply-chain
            custody from manufacturer to retailer.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/register">
              Register a Product
            </Link>
            <Link className="secondary-button" to="/verify">
              Verify Authenticity
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="metric-card">
            <span className="eyebrow">Security</span>
            <h3>Immutable</h3>
            <p>Blockchain records prevent tampering and duplicate registration.</p>
          </div>
          <div className="metric-card">
            <span className="eyebrow">Supply Chain</span>
            <h3>Traceable</h3>
            <p>Ownership transfers provide a transparent audit trail for every product.</p>
          </div>
        </div>
      </section>

      <div className="grid-two">
        <SectionCard title="Core Verification Outcomes" subtitle="Designed for clear consumer feedback">
          <div className="status-demo">
            <StatusBadge variant="success">Authentic Product</StatusBadge>
            <StatusBadge variant="warning">Product Not Found</StatusBadge>
            <StatusBadge variant="danger">Counterfeit Product</StatusBadge>
          </div>
        </SectionCard>

        <SectionCard title="Workflow" subtitle="Simple operational flow for stakeholders">
          <ol className="ordered-list">
            <li>Admin authorizes manufacturer wallet addresses.</li>
            <li>Manufacturers register products and generate QR codes.</li>
            <li>Distributors and retailers receive custody through on-chain transfers.</li>
            <li>Consumers verify products by Product ID or QR scan.</li>
          </ol>
        </SectionCard>
      </div>
    </div>
  );
}

export default Home;
