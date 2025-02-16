import { useLocation, useNavigate } from "react-router-dom";

const QRCodePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { qrCode, reservation } = location.state || {}; // Get data passed from PassengerInfoPage

  if (!qrCode || !reservation) {
    return <p>No QR code or reservation data available. Please complete your reservation first.</p>;
  }
  console.log(reservation);

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-10 text-center max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Reservation Confirmed!</h2>
        <p className="text-gray-600 mb-4">Your booking has been confirmed. Show the QR code below to the bus staff for verification.</p>
        <img src={qrCode} alt="Reservation QR Code" className="w-48 h-48 mx-auto mb-4" />
        <p className="text-lg font-bold">Booking Details</p>
        <p>
          <strong>Bus:</strong> {reservation[0].busRoute} ({reservation[0].busNumber})
        </p>
        <p>

          <p><strong>Seats:</strong> {reservation.map(r => r.seatNumber).join(", ")}</p>
        </p>
        <p>
          <strong>Total Amount:</strong> Rs. {reservation[0].totalAmount}
        </p>
        <button
          onClick={() => navigate("/buses")}
          className="w-full mt-6 py-2 px-4 rounded-md text-white bg-gray-900 rounded-xl hover:bg-gray-700"
        >
          Back to Bus List
        </button>
      </div>
    </div>
  );
};

export default QRCodePage;
