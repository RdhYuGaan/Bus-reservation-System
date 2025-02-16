
import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api/api";
import { useLoader } from "../../context/LoaderContext";

const AccountsList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { startLoading, stopLoading } = useLoader();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        startLoading();
        const res = await api.get("/accounts");
        setAccounts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch accounts");
      } finally {
        setLoading(false);
        stopLoading();
      }
    };

    fetchAccounts();
  }, []);

  if (loading) return <p>Loading accounts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Accounts</h2>
      {accounts.length === 0 ? (
        <p>No accounts found.</p>
      ) : (
        <ul className="space-y-4">
          {accounts.map((account) => (
            <li key={account._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <p><strong>Name:</strong> {account.name}</p>
              <p><strong>Email:</strong> {account.email}</p>
              <p><strong>Role:</strong> {account.role}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AccountsList;
