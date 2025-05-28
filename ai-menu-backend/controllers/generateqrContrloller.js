const QRCode = require("qrcode");

exports.generateQRCode = async (req, res) => {
  try {
    const { tableId } = req.body;

    if (!tableId) {
      return res.status(400).json({ error: "Table ID is required" });
    }

    const qrData = `https://ai-menu-omega.vercel.app/menu/${tableId}`; // Development URL
    // const qrData = `http://localhost:3000/menu/${tableId}`; // Production URL
    const qrCode = await QRCode.toDataURL(qrData);
    console.log();
    res.status(200).json({ tableId, qrCode });
  } catch (error) {
    console.error("❌ Error generating QR Code:", error);
    res.status(500).json({ error: "Failed to generate QR Code" });
  }
};
