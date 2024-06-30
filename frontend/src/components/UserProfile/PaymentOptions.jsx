import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCcVisa, FaCcMastercard, FaCcDiscover } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { useSelector, useDispatch } from "react-redux";
import { UpdateInfo } from "../../redux/slice/userSlice";
import apiUrls from "../../common/apiUrls";
// import { setUserDetail } from "../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PaymentOptions = () => {
  const navigate = useNavigate();
  const userDetail = useSelector((state) => state.userDetail.userDetail);
  const dispatch = useDispatch();
  const [localPaymentDetail, setLocalPaymentDetail] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardType: "Visa",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const isLogedIn = Cookies.get("isLogedIn");

    if (!isLogedIn || isLogedIn === "false") {
      navigate("/login");
      return;
    }

    if (userDetail?.data) {
      console.log(userDetail?.data)
      setLocalPaymentDetail({
        cardNumber: userDetail.data.paymentInfo.cardNumber || "",
        expiryDate: userDetail.data.paymentInfo.expiryDate || "",
        cvv: userDetail.data.paymentInfo.cvv || "",
        cardType: userDetail.data.paymentInfo.cardType || "Visa",
      });
    }
  }, [userDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalPaymentDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleReset = () => {
    
    if (userDetail?.data) {
      setLocalPaymentDetail({
        cardNumber: userDetail.data.paymentInfo.cardNumber || "",
        expiryDate: userDetail.data.paymentInfo.expiryDate || "",
        cvv: userDetail.data.paymentInfo.cvv || "",
        cardType: userDetail.data.paymentInfo.cardType || "Visa",
      });
      setErrors({});
    }
  };

  const handleSave = (e) => {
    const validationErrors = validate(localPaymentDetail);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const url = apiUrls.paymentOptionUpdate.url;
      // console.log({ url: url, userDetail: localPaymentDetail });
      dispatch(UpdateInfo({ url: url, userDetail: localPaymentDetail }));
    }
  };

  const validate = (values) => {
    const errors = {};
    const cardNumberRegex = /^[0-9]{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    const cvvRegex = /^[0-9]{3,4}$/;

    if (!cardNumberRegex.test(values.cardNumber.replace(/\s+/g, ""))) {
      errors.cardNumber = "Card number must be 16 digits.";
    }
    if (!expiryDateRegex.test(values.expiryDate)) {
      errors.expiryDate = "Expiry date must be in MM/YY format.";
    }
    if (!cvvRegex.test(values.cvv)) {
      errors.cvv = "CVV must be 3 or 4 digits.";
    }

    return errors;
  };

  const getCardLogo = () => {
    switch (localPaymentDetail.cardType) {
      case "Visa":
        return <FaCcVisa className="w-10 h-10 mt-1 text-blue-700" />;
      case "MasterCard":
        return <FaCcMastercard className="w-10 h-10 mt-1 text-red-500" />;
      case "American Express":
        return <SiAmericanexpress className="w-10 h-10 mt-1 text-blue-700" />;
      case "Discover":
        return <FaCcDiscover className="w-10 h-10 mt-1 text-orange-800" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-bold text-[#f29221]">Payment Options</h2>
      <div>
        <label className="block text-sm font-medium text-[#f29221]">
          Card Type
        </label>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          {getCardLogo()}
          <select
            name="cardType"
            value={localPaymentDetail.cardType}
            onChange={handleChange}
            className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
            required
          >
            <option value="Visa">Visa</option>
            <option value="MasterCard">Mastercard</option>
            <option value="American Express">American Express</option>
            <option value="Discover">Discover</option>
          </select>
        </motion.div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#f29221]">
          Card Number
        </label>
        <motion.input
          type="text"
          name="cardNumber"
          value={localPaymentDetail.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          required
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-sm">{errors.cardNumber}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-[#f29221]">
          Expiry Date
        </label>
        <motion.input
          type="text"
          name="expiryDate"
          value={localPaymentDetail.expiryDate}
          onChange={handleChange}
          placeholder="MM/YY"
          className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          required
        />
        {errors.expiryDate && (
          <p className="text-red-500 text-sm">{errors.expiryDate}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-[#f29221]">CVV</label>
        <motion.input
          type="text"
          name="cvv"
          value={localPaymentDetail.cvv}
          onChange={handleChange}
          placeholder="123"
          className="block w-full mt-1 px-3 py-2 bg-white text-black border border-gray-700 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          required
        />
        {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
      </div>
      <div className="flex justify-end space-x-4">
        <motion.button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-700 text-white rounded-md shadow-sm hover:bg-gray-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset
        </motion.button>
        <motion.button
          onClick={handleSave}
          className="px-4 py-2 bg-[#f29221] text-white rounded-md shadow-sm hover:bg-[#e07b1b] transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PaymentOptions;
