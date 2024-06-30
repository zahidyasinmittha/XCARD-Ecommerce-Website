import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import apiUrls from "../../common/apiUrls";
import { useDispatch, useSelector } from "react-redux";
import { UpdateInfo } from "../../redux/slice/userSlice";


const ShippingAddress = () => {
  const navigate = useNavigate();
  const userDetail = useSelector((state) => state.userDetail.userDetail);
  const dispatch = useDispatch();
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  useEffect(() => {
    const isLogedIn = Cookies.get("isLogedIn");

    if (!isLogedIn || isLogedIn === "false") {
      navigate("/login");
      return;
    }

    if (userDetail?.data) {
      setShippingAddress({
        address: userDetail.data.shippingAddress.address || "",
        city: userDetail.data.shippingAddress.city || "",
        state: userDetail.data.shippingAddress.state || "",
        zipCode: userDetail.data.shippingAddress.zipCode || "",
        country: userDetail.data.shippingAddress.country || "",
      });
    }
  }, [userDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setShippingAddress({
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(UpdateInfo({ url: apiUrls.shippingAddressUpdate.url, userDetail: shippingAddress }));
    console.log("Shipping address saved:", shippingAddress);
  };

  const { address, city, state, zipCode, country } = shippingAddress;

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
          <label className="block text-sm font-medium text-[#f29221]">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
            placeholder="123 Main St"
            className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-[#f29221]">
            City
          </label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={handleChange}
            placeholder="New York"
            className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-[#f29221]">
            State
          </label>
          <input
            type="text"
            name="state"
            value={state}
            onChange={handleChange}
            placeholder="NY"
            className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-[#f29221]">
            Zip Code
          </label>
          <input
            type="text"
            name="zipCode"
            value={zipCode}
            onChange={handleChange}
            placeholder="10001"
            className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-[#f29221]">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={country}
            onChange={handleChange}
            placeholder="USA"
            className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          />
        </motion.div>
        <div className="flex justify-end space-x-4 mt-4">
          <motion.button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-700 text-white rounded-md shadow-sm hover:bg-gray-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset
          </motion.button>
          <motion.button
            type="submit"
            className="px-4 py-2 bg-[#f29221] text-white rounded-md shadow-sm hover:bg-[#e07b1b] transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ShippingAddress;
