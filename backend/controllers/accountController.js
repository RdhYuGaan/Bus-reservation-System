
const User = require("../models/User");
const mongoose = require("mongoose");

// Fetch all accounts
const getAllAccounts = async (req, res) => {
  try {
    const accounts = await User.find(); // Fetch all user accounts
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch accounts", error: err.message });
  }
};

// Delete a specific account
const deleteAccount = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid account ID" });
  }

  try {
    const deletedAccount = await User.findByIdAndDelete(id);

    if (!deletedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete account", error: err.message });
  }
};

module.exports = { getAllAccounts, deleteAccount };
