import StatusBadge from "./StatusBadge";

function ProductSummaryCard({ product, statusLabel = "Registered" }) {
  if (!product) {
    return null;
  }

  return (
    <div className="result-grid">
      <div>
        <span className="eyebrow">Status</span>
        <div className="status-row">
          <StatusBadge variant="success">{statusLabel}</StatusBadge>
        </div>
      </div>
      <div>
        <span className="eyebrow">Product ID</span>
        <p>{product.productId}</p>
      </div>
      <div>
        <span className="eyebrow">Product Name</span>
        <p>{product.productName}</p>
      </div>
      <div>
        <span className="eyebrow">Batch Number</span>
        <p>{product.batchNumber}</p>
      </div>
      <div>
        <span className="eyebrow">Manufacturing Date</span>
        <p>{product.manufacturingDate}</p>
      </div>
      <div>
        <span className="eyebrow">Manufacturer</span>
        <p>{product.manufacturer}</p>
      </div>
      <div>
        <span className="eyebrow">Current Owner</span>
        <p>{product.currentOwner}</p>
      </div>
      <div>
        <span className="eyebrow">Product Hash</span>
        <p className="mono-text">{product.productHash}</p>
      </div>
      <div>
        <span className="eyebrow">Registered At</span>
        <p>{product.registeredAt}</p>
      </div>
    </div>
  );
}

export default ProductSummaryCard;
