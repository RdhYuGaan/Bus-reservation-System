const generateEmailTemplate = ({ fullName, busDetails, seats, totalAmount, qrCodeBase64 }) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; }
          .email-container { max-width: 600px; margin: 20px auto; background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
          .header { text-align: center; background: #4caf50; color: white; padding: 10px 0; border-radius: 8px 8px 0 0; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { padding: 20px; }
          .content p { margin: 10px 0; color: #333; }
          .content ul { list-style: none; padding: 0; }
          .content ul li { background: #f1f1f1; margin: 5px 0; padding: 10px; border-radius: 4px; color: #555; }
          .qr-container { text-align: center; margin: 20px 0; }
          .qr-container img { max-width: 200px; height: auto; }
          .footer { text-align: center; font-size: 12px; color: #888; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header"><h1>Reservation Confirmation</h1></div>
          <div class="content">
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Your reservation details are as follows:</p>
            <ul>
              <li><strong>Bus Route:</strong> ${busDetails.route}</li>
              <li><strong>Bus Number:</strong> ${busDetails.number}</li>
              <li><strong>Seats Reserved:</strong> ${seats.join(", ")}</li>
              <li><strong>Total Amount Paid:</strong> Rs. ${totalAmount}</li>
            </ul>
            <p>Please show the QR code below for verification:</p>
            <div class="qr-container">
              <img src="${qrCodeBase64}" alt="QR Code" />
            </div>
          </div>
          <div class="footer">
            <p>Thank you for choosing our service!</p>
            <p>Contact us at support@example.com for assistance.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  module.exports = generateEmailTemplate;
  