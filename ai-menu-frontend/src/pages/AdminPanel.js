import { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
    const [tableId, setTableId] = useState("");
    const [qrCode, setQrCode] = useState("");

    const generateQRCode = async () => {
        if (!tableId) return alert("Please enter a Table ID");

        try {
            const response = await axios.post("https://ai-menu-0xwb.onrender.com/generate-qr", { tableId })
            console.log("response",response)
            setQrCode(response.data.qrCode);
        } catch (error) {
            console.error("Error generating QR code:", error);
        }
    };

    return (
        <div>
            <h2>Generate Table QR Code</h2>
            <input 
                type="number" 
                value={tableId} 
                onChange={(e) => setTableId(e.target.value)} 
                placeholder="Enter Table ID"
            />
            <button onClick={generateQRCode}>Generate QR</button>

            {qrCode && (
                <div>
                    <h3>QR Code for Table {tableId}</h3>
                    <img src={qrCode} alt="QR Code" />
                    <a href={qrCode} download={`table_${tableId}.png`}>
                        <button>Download QR Code</button>
                    </a>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
