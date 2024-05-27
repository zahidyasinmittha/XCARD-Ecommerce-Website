import React from "react";
import { logo } from "../assest";
import { Link } from "react-router-dom";

function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="bg-white text-[#f29221] p-10 font-sans tracking-wide">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="lg:flex lg:items-center">
          <a href="/">
            <img src={logo} alt="logo" className="w-52" />
          </a>
        </div>

        <div className="lg:flex lg:items-center">
          <ul className="flex space-x-6">
            {/* Social Media Icons */}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
          <ul className="space-y-4">
            <li>
              <a href="/" className="text-black hover:text-[#f29221] text-sm">Email</a>
            </li>
            <li>
              <a href="/" className="text-black hover:text-[#f29221] text-sm">Phone</a>
            </li>
            <li>
              <a href="/" className="text-black hover:text-[#f29221] text-sm">Address</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6 text-[#f29221]">Information</h4>
          <ul className="space-y-4">
            <li>
              <a href="/" className="text-black hover:text-[#f29221]">About Us</a>
            </li>
            <li>
              <a href="/" className="text-black hover:text-[#f29221]">Terms &amp; Conditions</a>
            </li>
            <li>
              <a href="/" className="text-black hover:text-[#f29221]">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-[#f29221] text-sm mt-10">
        © {getCurrentYear()} <Link to="" className="hover:underline mx-1">XCARD</Link> All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
