import { useState } from "react";
import toast from "react-hot-toast";
import ProductSummaryCard from "../components/ProductSummaryCard";
import QRCodePanel from "../components/QRCodePanel";
import SectionCard from "../components/SectionCard";
import { getSignerContract } from "../utils/contract";

const initialFormState = {
  productId: "",
  productName: "",
  batchNumber: "",
  manufacturingDate: "",
  imageUrl: ""
};

function ProductRegistrationPage() {

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [registeredProduct, setRegisteredProduct] = useState(null);

  async function handleSubmit(event) {

    event.preventDefault();
    setLoading(true);

    try {

      const contract = await getSignerContract();

      toast.loading(
        "Registering product on blockchain...",
        {
          id: "register-product"
        }
      );

      const tx = await contract.registerProduct(
        formData.productId.trim(),
        formData.productName.trim(),
        formData.batchNumber.trim(),
        formData.manufacturingDate.trim(),
        formData.imageUrl.trim()
      );

      await tx.wait();

      const result = await contract.getProduct(
        formData.productId.trim()
      );

      const productData = {
        productId: result.productId,
        productName: result.productName,
        batchNumber: result.batchNumber,
        manufacturingDate: result.manufacturingDate,
        imageUrl: result.imageUrl,
        manufacturer: result.manufacturer,
        currentOwner: result.currentOwner,
        productHash: result.productHash
      };

      setRegisteredProduct(productData);

      toast.success(
        "Product registered successfully.",
        {
          id: "register-product"
        }
      );

      setFormData(initialFormState);

    } catch (error) {

      console.error(error);

      toast.error(
        error.shortMessage ||
        error.message ||
        "Product registration failed.",
        {
          id: "register-product"
        }
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">

      <SectionCard
        title="Product Registration"
        subtitle="Authorized manufacturers can securely register product records and generate QR codes."
      >

        <form
          className="form-grid"
          onSubmit={handleSubmit}
        >

          <label>
            Product ID

            <input
              type="text"
              value={formData.productId}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  productId: e.target.value
                }))
              }
              required
              placeholder="P001"
            />
          </label>

          <label>
            Product Name

            <input
              type="text"
              value={formData.productName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  productName: e.target.value
                }))
              }
              required
              placeholder="Medicine Kit"
            />
          </label>

          <label>
            Batch Number

            <input
              type="text"
              value={formData.batchNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  batchNumber: e.target.value
                }))
              }
              required
              placeholder="BATCH-001"
            />
          </label>

          <label>
            Manufacturing Date

            <input
              type="date"
              value={formData.manufacturingDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  manufacturingDate: e.target.value
                }))
              }
              required
            />
          </label>

          <label>
            Product Image URL

            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  imageUrl: e.target.value
                }))
              }
              required
              placeholder="https://example.com/image.jpg"
            />
          </label>

          <button
            className="primary-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Register Product"}
          </button>

        </form>

      </SectionCard>

      {registeredProduct && (

        <div className="grid-two">

          <SectionCard
            title="Registration Result"
            subtitle="Stored blockchain record"
          >

            {registeredProduct.imageUrl && (
              <img
                src={registeredProduct.imageUrl}
                alt={registeredProduct.productName}
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  borderRadius: "12px",
                  marginBottom: "1rem"
                }}
              />
            )}

            <ProductSummaryCard
              product={registeredProduct}
            />

          </SectionCard>

          <SectionCard
            title="Product QR Code"
            subtitle="Scan to verify product instantly"
          >

            <QRCodePanel
              value={JSON.stringify({
                productId:
                  registeredProduct.productId
              })}
            />

          </SectionCard>

        </div>

      )}

    </div>
  );
}

export default ProductRegistrationPage;