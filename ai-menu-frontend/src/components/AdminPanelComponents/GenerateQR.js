import { useState } from "react";
import axios from "axios";

const QRCodeGenerator = () => {
  const [tableId, setTableId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQR = async () => {
    if (!tableId) {
      setError("Please enter a Table ID");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      // const response = await axios.post("https://ai-menu-0xwb.onrender.com/generate-qr", { tableId });
      const response = await axios.post("http://localhost:5500/generate-qr", { tableId });
      setQrCode(response.data.qrCode);
    } catch (err) {
      setError("Failed to generate QR Code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 mt-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">QR Code Generator</h2>
        <input
          type="text"
          placeholder="Enter Table ID"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-3 hover:bg-blue-600 transition"
          onClick={generateQR}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate QR Code"}
        </button>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {qrCode && (
          <div className="mt-4 flex flex-col items-center">
            <img src={qrCode} alt="QR Code" className="w-40 h-40 border p-2" />
            <a
              href={qrCode}
              download={`table-${tableId}.png`}
              className="mt-2 text-blue-500 hover:underline"
            >
              Download QR Code
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;