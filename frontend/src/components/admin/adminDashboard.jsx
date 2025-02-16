import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DriversList from "./DriversList";
import AccountsList from "./AccountsList";
import AddBus from "../driver/AddBus";
import FeedbakList from "./FeedbakList.jsx";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("drivers");

  const renderContent = () => {
    switch (activeComponent) {
      case "drivers":
        return <DriversList />;
      case "accounts":
        return <AccountsList />;
      case "addBus":
        return <AddBus />;
      case "feedbacks":
        return <FeedbakList/>
      default:
        return <p>Select an option from the sidebar</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar setActiveComponent={setActiveComponent} activeComponent={activeComponent} />

      {/* Main Content */}
      <main className="flex-1 bg-white rounded-lg shadow-md m-6 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
