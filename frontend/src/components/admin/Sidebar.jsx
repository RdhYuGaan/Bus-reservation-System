import React from "react";

const Sidebar = ({setActiveComponent, activeComponent}) => {
    const menuItems = [
        {key: "drivers", label: "Drivers"},
        {key: "accounts", label: "Accounts"},
        {key: "feedbacks", label: "Feedbacks"},
        // { key: "addBus", label: "Add Bus" },
    ];

    return (
        <aside className="w-64 bg-gray-600 text-white flex-shrink-0 p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <nav className="space-y-4">
                {menuItems.map((item) => (
                    <button
                        key={item.key}
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                            activeComponent === item.key ? "bg-gray-900" : "hover:bg-gray-700"
                        }`}
                        onClick={() => setActiveComponent(item.key)}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
