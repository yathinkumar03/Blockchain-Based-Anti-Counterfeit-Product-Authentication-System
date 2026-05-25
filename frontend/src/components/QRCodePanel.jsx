import { useEffect, useState } from "react";
import QRCode from "qrcode";

function QRCodePanel({ value }) {
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function generateCode() {
      if (!value) {
        setImageData("");
        return;
      }

      const url = await QRCode.toDataURL(value, {
        width: 220,
        margin: 1,
        color: {
          dark: "#132433",
          light: "#f7f5ef"
        }
      });

      if (isMounted) {
        setImageData(url);
      }
    }

    generateCode();

    return () => {
      isMounted = false;
    };
  }, [value]);

  if (!value || !imageData) {
    return null;
  }

  return (
    <div className="qr-panel">
      <img src={imageData} alt={`QR code for ${value}`} />
      <p>Scan to verify Product ID: {value}</p>
    </div>
  );
}

export default QRCodePanel;
