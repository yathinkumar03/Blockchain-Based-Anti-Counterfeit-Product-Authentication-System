import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function QRScanner({ onScan }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    const elementId = "qr-reader";
    scannerRef.current = new Html5QrcodeScanner(
      elementId,
      {
        fps: 10,
        qrbox: { width: 220, height: 220 }
      },
      false
    );

    scannerRef.current.render(
      (decodedText) => {
        onScan(decodedText);
      },
      () => {}
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, [onScan]);

  return <div id="qr-reader" className="qr-reader" />;
}

export default QRScanner;
