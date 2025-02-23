const QRCode = require("qrcode");

exports.generateQRCode = async (req, res) => {
  try {
    const { tableId } = req.body;

    if (!tableId) {
      return res.status(400).json({ error: "Table ID is required" });
    }

    const qrData = `https://9085-2409-4041-6e98-bd86-8199-1a3c-6c21-39f8.ngrok-free.app/menu/${tableId}`; // Replace with your actual URL
    const qrCode = await QRCode.toDataURL(qrData);

    res.status(200).json({ tableId, qrCode });
  } catch (error) {
    console.error("❌ Error generating QR Code:", error);
    res.status(500).json({ error: "Failed to generate QR Code" });
  }
};
