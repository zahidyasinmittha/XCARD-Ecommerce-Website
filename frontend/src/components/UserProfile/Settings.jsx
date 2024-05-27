import React, { useState } from "react";
import { motion } from "framer-motion";

const Settings = () => {
  const [isSeller, setIsSeller] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleBecomeSeller = () => {
    setIsSeller(!isSeller);
  };

  const handleDeleteAccount = () => {
    // Add logic for deleting the account
    alert("Account deleted.");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    setPasswordError("");
    // Implement change password functionality, e.g., API call
    console.log("Password changed:", { currentPassword, newPassword });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-bold text-[#f29221]">Settings</h2>

      <form onSubmit={handleChangePassword} className="space-y-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <label className="block text-sm font-medium text-[#f29221]">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-[#f29221]">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-[#f29221]">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-end space-x-4"
        >
          <button
            type="submit"
            className="px-4 py-2 bg-[#f29221] text-white rounded-md shadow-sm hover:bg-[#e07b1b] transition duration-300"
          >
            Save
          </button>
        </motion.div>
      </form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-[#f29221]">Become a Seller</label>
          <button
            onClick={handleBecomeSeller}
            className={`block w-full mt-1 px-4 py-2 ${isSeller ? "bg-green-700" : "bg-gray-700"} text-white border border-gray-700 rounded-md shadow-sm hover:${isSeller ? "bg-green-600" : "bg-gray-600"} transition duration-300`}
          >
            {isSeller ? "You are a Seller" : "Become a Seller"}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#f29221]">Delete Account</label>
          <button
            onClick={handleDeleteAccount}
            className="block w-full mt-1 px-4 py-2 bg-red-600 text-white border border-gray-700 rounded-md shadow-sm hover:bg-red-500 transition duration-300"
          >
            Delete Account
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
