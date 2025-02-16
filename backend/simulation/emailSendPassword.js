const generateEmailTemplateforDriver = ({ email, password }) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            background: #4caf50;
            color: white;
            padding: 15px 0;
            border-radius: 8px 8px 0 0;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 20px;
            color: #333333;
          }
          .content p {
            margin: 10px 0;
            font-size: 16px;
          }
          .credentials {
            margin: 20px 0;
            padding: 15px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          .credentials p {
            margin: 5px 0;
            font-size: 15px;
            color: #555;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #888888;
            margin-top: 20px;
          }
          .footer p {
            margin: 5px 0;
          }
          .footer a {
            color: #4caf50;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Welcome to Our System!</h1>
          </div>
          <div class="content">
            <p>Dear <strong>${email}</strong>,</p>
            <p>We are excited to inform you that your account has been successfully created. You can now log in using the following credentials:</p>
            <div class="credentials">
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Password:</strong> ${password}</p>
            </div>
            <p>For your security, we recommend changing your password after logging in for the first time.</p>
          </div>
          <div class="footer">
            <p>Thank you for joining us!</p>
            <p>If you have any questions or need assistance, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};

module.exports = generateEmailTemplateforDriver;
