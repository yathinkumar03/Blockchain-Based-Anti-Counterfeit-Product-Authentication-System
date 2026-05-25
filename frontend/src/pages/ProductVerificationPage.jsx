import { useState } from "react";
import toast from "react-hot-toast";
import ProductSummaryCard from "../components/ProductSummaryCard";
import QRScanner from "../components/QRScanner";
import SectionCard from "../components/SectionCard";
import { getReadContract } from "../utils/contract";

function ProductVerificationPage() {
  const [productId, setProductId] = useState("");
  const [verificationState, setVerificationState] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  async function verifyById(event) {
    event?.preventDefault();

    if (!productId.trim()) {
      toast.error("Enter a Product ID first.");
      return;
    }

    try {
      const contract = await getReadContract();

      const result = await contract.verifyProduct(
        productId.trim()
      );

      // Product exists check
      if (!result || !result[0]) {
        setVerificationState({
          status: "not-found"
        });

        return;
      }

      setVerificationState({
        status: "authentic",
        product: {
          productId: productId.trim(),
          productName: result[0],
          batchNumber: result[1],
          manufacturingDate: result[2],
          manufacturer: result[3],
          currentOwner: result[4],
          productHash: result[5]
        }
      });

    } catch (error) {
      console.error(error);

      setVerificationState({
        status: "counterfeit"
      });

      toast.error(
        error.shortMessage ||
        error.message ||
        "Verification failed."
      );
    }
  }

  function renderResult() {
    if (!verificationState) return null;

    // PRODUCT NOT FOUND
    if (verificationState.status === "not-found") {
      return (
        <div
          style={{
            background: "#fef3c7",
            color: "#92400e",
            padding: "12px",
            borderRadius: "10px",
            fontWeight: "bold"
          }}
        >
          ⚠ Product Not Found
        </div>
      );
    }

    // COUNTERFEIT
    if (verificationState.status === "counterfeit") {
      return (
        <div
          style={{
            background: "#fee2e2",
            color: "#991b1b",
            padding: "12px",
            borderRadius: "10px",
            fontWeight: "bold"
          }}
        >
          ✖ Counterfeit Product
        </div>
      );
    }

    // AUTHENTIC
    return (
      <div className="stack-tight">

        <div
          style={{
            background: "#d1fae5",
            color: "#065f46",
            padding: "12px",
            borderRadius: "10px",
            fontWeight: "bold",
            marginBottom: "10px"
          }}
        >
          ✔ Authentic Product
        </div>

        <ProductSummaryCard
          product={verificationState.product}
          statusLabel="Verified On-Chain"
        />
      </div>
    );
  }

  return (
    <div className="stack">

      <SectionCard
        title="Verify Product"
        subtitle="Consumers can validate authenticity using Product ID or QR."
        actions={
          <button
            className="secondary-button"
            onClick={() =>
              setShowScanner((current) => !current)
            }
          >
            {showScanner ? "Hide Scanner" : "Open QR Scanner"}
          </button>
        }
      >

        <form className="form-inline" onSubmit={verifyById}>

          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter Product ID"
          />

          <button className="primary-button" type="submit">
            Verify
          </button>

        </form>

        {showScanner && (
          <QRScanner
            onScan={(data) => {
              try {
                const parsed = JSON.parse(data);
                setProductId(parsed.productId);
              } catch {
                setProductId(data);
              }
            }}
          />
        )}

      </SectionCard>

      <SectionCard
        title="Verification Result"
        subtitle="Authenticity outcome from blockchain data"
      >
        {renderResult()}
      </SectionCard>

    </div>
  );
}

export default ProductVerificationPage;