const QRCode = require("qrcode");

const generateQRCode = async (data) => {
  try {
    // Generate QR Code as a Buffer
    const qrCodeBuffer = await QRCode.toBuffer(JSON.stringify(data), {
      errorCorrectionLevel: "H",
      type: "image/png",
    });
    return qrCodeBuffer;
  } catch (err) {
    console.error("Error generating QR Code:", err);
    throw new Error("Failed to generate QR Code");
  }
};

module.exports = { generateQRCode };
