import React, { useState } from "react";
import { FaUser, FaAddressCard, FaCreditCard, FaCogs } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetail } from "../redux/slice/userSlice";

const UserProfilePage = () => {
  const userDatail = useSelector((state) => state.userDetail.userDetail)
  const dispatch = useDispatch()
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        dispatch(setUserDetail({ ...userDatail, data:{ ...userDatail.data, ProfileImage: event.target.result} }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row  text-black">
     <div className="sm:w-1/4 bg-slate-100 p-4 text-center sm:text-left shadow-lg">
        <div className="flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <label htmlFor="image" className="cursor-pointer">
              <img
                src={userDatail?.data?.ProfileImage}
                className="rounded-full w-48 h-48 sm:w-32 sm:h-32 border-4 border-white shadow-md"
              />
              <input
                id="image"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
              <div className="absolute inset-0 rounded-full flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Change Profile
              </div>
            </label>
          </div>
          <div className="mt-4">
            <h3 className="text-xl text-[#f29221] font-bold text-center">{userDatail?.data?.name}</h3>
            <p className="text-black text-center">{userDatail?.data?.role}</p>
          </div>
        </div>
        <nav className="mt-4 w-full">
          <div className="flex flex-col sm:flex-col gap-3">
            <NavLink
              end
              to=""
              className={({ isActive }) =>
                `${isActive ? "bg-[#f29221]" : "bg-transparent"} hover:bg-[#f29221] flex items-center p-3 rounded-xl transition-colors duration-300`
              }
              aria-label="Basic Info"
            >
              <FaUser className="inline-block mr-2" /> Basic Info
            </NavLink>
            <NavLink
              to="shippingaddress"
              className={({ isActive }) =>
                `${isActive ? "bg-[#f29221]" : "bg-transparent"} hover:bg-[#f29221] flex items-center p-3 rounded-xl transition-colors duration-300`
              }
              aria-label="Shipping Address"
            >
              <FaAddressCard className="inline-block mr-2" /> Shipping Address
            </NavLink>
            <NavLink
              to="paymentoptions"
              className={({ isActive }) =>
                `${isActive ? "bg-[#f29221]" : "bg-transparent"} hover:bg-[#f29221] flex items-center p-3 rounded-xl transition-colors duration-300`
              }
              aria-label="Payment Options"
            >
              <FaCreditCard className="inline-block mr-2" /> Payment Options
            </NavLink>
            <NavLink
              to="settings"
              className={({ isActive }) =>
                `${isActive ? "bg-[#f29221]" : "bg-transparent"} hover:bg-[#f29221] flex items-center p-3 rounded-xl transition-colors duration-300`
              }
              aria-label="Settings"
            >
              <FaCogs className="inline-block mr-2" /> Settings
            </NavLink>
          </div>
        </nav>
      </div>
      <div className="sm:w-3/4 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfilePage;
