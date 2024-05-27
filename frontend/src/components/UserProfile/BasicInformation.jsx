import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { updateUserBasicDetails } from "../../redux/slice/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import apiUrls from "../../common/apiUrls";
import {useNavigate} from 'react-router-dom'

function BasicInformation() {
  const navigator = useNavigate()
  const userDetail = useSelector((state) => state.userDetail.userDetail);
  const dispatch = useDispatch();
  const [verificationCode, setverificationCode] = useState('');
  const [localUserDetail, setLocalUserDetail] = useState({
    name: "",
    location: "",
    email: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    if (userDetail?.data) {
      setLocalUserDetail({
        name: userDetail.data.name || "",
        location: userDetail.data.location || "",
        email: userDetail.data.email || "",
        phone: userDetail.data.phoneNumber || "",
        gender: userDetail.data.gender || "",
      });
    }
    else{
        navigator('/login')
    }
  }, [userDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUserDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleReset = () => {
    if (userDetail?.data) {
      setLocalUserDetail({
        name: userDetail.data.name || "",
        location: userDetail.data.location || "",
        email: userDetail.data.email || "",
        phone: userDetail.data.phoneNumber || "",
        gender: userDetail.data.gender || "",
      });
    }
  };
  const validateVerificationCode = async(e) =>{
    e.preventDefault();
    const formData = {
      email: localUserDetail.email,
      verificationCode:verificationCode,
    };
    const loading = toast.loading("Verifying Code, Please wait...", {
      position: "bottom-center",
    });
    const response = await axios.post(apiUrls.validatecode.url, formData);
    toast.dismiss(loading.current);
    if (response.data.success === true) {
      toast.success(response.data.message, {
        position: "bottom-center",
      });
    }
    if (response.data.error) {
      toast.error(response.data.message, {
        position: "bottom-center",
      });
    }
  }

  const handleSave = () => {
    dispatch(updateUserBasicDetails(localUserDetail));
  };
  return (
    <div className="space-y-6 p-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-[#f29221]">Basic Information</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-sm font-medium text-[#f29221]">Name</label>
        <input
          type="text"
          name="name"
          value={localUserDetail.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="block w-full mt-1 text-black p-1 border-2 border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <label className="block text-sm font-medium text-[#f29221]">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={localUserDetail.location}
          onChange={handleChange}
          placeholder="Enter your location"
          className="block w-full mt-1 p-1 text-black border-2 border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label className="block text-sm font-medium text-[#f29221]">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={localUserDetail.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="block w-full mt-1 p-1 text-black border-2 border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
        />
      </motion.div>

      {(userDetail?.msg?.codeSend) &&
      <div>
      <label className="block text-sm font-medium text-[#f29221]">
        verification code
      </label>
      <input
        type="email"
        name="email"
        value={verificationCode}
        onChange={(e) => setverificationCode(e.target.value)}
        placeholder="Enter your email"
        className="mr-3 mt-1 p-1 text-black border-2 border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
      />
      <button
        onClick={validateVerificationCode}
        className="px-3 py-2 bg-[#f29221] text-white rounded-md shadow-sm hover:bg-[#e07b1b] transition duration-300"
      >
        submit code
      </button>
      </div> 
      }

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <label className="block text-sm font-medium text-[#f29221]">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          value={localUserDetail.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="block w-full mt-1 p-1 text-black border-2 border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div>
          <label className="block text-sm font-medium text-[#f29221] mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={localUserDetail.gender}
            onChange={handleChange}
            placeholder="Select your gender"
            className="block w-full px-3 py-2 text-black border-2 border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-end space-x-4"
      >
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-700 text-white rounded-md shadow-sm hover:bg-gray-600 transition duration-300"
        >
          Reset
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#f29221] text-white rounded-md shadow-sm hover:bg-[#e07b1b] transition duration-300"
        >
          Save
        </button>
      </motion.div>
    </div>
  );
}

export default BasicInformation;
