const QRCode = require("qrcode");

exports.generateQRCode = async (req, res) => {
  try {
    const { tableId } = req.body;

    if (!tableId) {
      return res.status(400).json({ error: "Table ID is required" });
    }

    const qrData = `https://f921-114-29-229-155.ngrok-free.app/menu/${tableId}`; // Replace with your actual URL
    const qrCode = await QRCode.toDataURL(qrData);
    console.log()
    res.status(200).json({ tableId, qrCode });
  } catch (error) {
    console.error("❌ Error generating QR Code:", error);
    res.status(500).json({ error: "Failed to generate QR Code" });
  }
};
