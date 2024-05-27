import React, { useState } from "react";
import { motion } from "framer-motion";

const ShippingAddress = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  const handleReset = () => {
    setAddress("");
    setCity("");
    setState("");
    setZipCode("");
    setCountry("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Implement save functionality, e.g., API call
    console.log("Shipping address saved:", { address, city, state, zipCode, country });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-bold text-[#f29221]">Shipping Address</h2>
      <form onSubmit={handleSave}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <label className="block text-sm font-medium text-[#f29221]">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St"
            className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-[#f29221]">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="New York"
            className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-[#f29221]">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="NY"
            className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-[#f29221]">Zip Code</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="10001"
            className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-[#f29221]">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="USA"
            className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          />
        </motion.div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-700 text-white rounded-md shadow-sm hover:bg-gray-600 transition duration-300"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#f29221] text-white rounded-md shadow-sm hover:bg-[#e07b1b] transition duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ShippingAddress;
