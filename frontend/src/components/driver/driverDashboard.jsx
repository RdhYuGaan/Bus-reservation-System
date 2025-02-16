import { useState } from "react";
import AddBus from "./AddBus";
import VerifyQRCode from "./VerifyQRCode";
import BusList from "./BusList";
import Reservations from "./Reservations";

const DriverDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("busList"); // Active component state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  const renderContent = () => {
    switch (activeComponent) {
      case "verifyQR":
        return <VerifyQRCode />;
      case "addBus":
        return <AddBus />;
      case "busList":
        return <BusList />;
      case "Reservations":
        return <Reservations />;
      default:
        return <p>Select an option from the sidebar</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Section */}
      <aside
        className={`md:relative fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out bg-gray-600 w-64 text-white flex-shrink-0 p-6`}
      >
        <h1 className="text-2xl font-bold mb-6">Driver Dashboard</h1>
        <nav className="space-y-4">
          <button
            className={`w-full text-left px-4 py-2 rounded-lg ${activeComponent === "busList"
              ? "bg-gray-900"
              : "hover:bg-gray-700"
              }`}
            onClick={() => {
              setActiveComponent("busList");
              setIsSidebarOpen(false); // Close sidebar on mobile after selection
            }}
          >
            Verify QR Codes
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg ${activeComponent === "Reservations"
              ? "bg-gray-900"
              : "hover:bg-gray-700"
              }`}
            onClick={() => {
              setActiveComponent("Reservations");
              setIsSidebarOpen(false); // Close sidebar on mobile after selection
            }}
          >
            Reservations
          </button>
        </nav>
      </aside>

      {/* Main Content Section */}
      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <header className="bg-gray-600 text-white p-4 flex items-center justify-between md:hidden">
          <h1 className="text-xl font-bold">Driver Dashboard</h1>
          <button
            className="text-white bg-gray-700 p-2 rounded-lg"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "Close" : "Menu"}
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-lg shadow-md m-6 p-6 relative">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DriverDashboard;
