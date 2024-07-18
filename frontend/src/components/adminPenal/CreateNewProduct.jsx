import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import axios from "axios";
import apiUrls from "../../common/apiUrls";

function CreateNewProduct() {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    Productimage: null,
  });

  useEffect(() => {
    const isLogedIn = Cookies.get("isLogedIn");
    if (!isLogedIn || isLogedIn === "false") {
      navigator("/login");
      return;
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("FileReader result:", reader.result); // Log the FileReader result
        setFormData({ ...formData, Productimage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData); // Log the formData to check if Productimage is being set correctly

    const loading = toast.loading("Fetching data, Please wait...", {
      position: "bottom-center",
    });
    try {
      const axiosInstance = axios.create({ withCredentials: true });
      const response = await axiosInstance.post(apiUrls.createProduct.url, formData);
      toast.dismiss(loading.current);
      if (response.data.error) {
        toast.error(response.data.message, { position: "bottom-center" });
        throw new Error(response.data.message);
      }
      toast.success(response.data.message, { position: "bottom-center" });
    } catch (error) {
      toast.dismiss(loading.current);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center p-16 w-full pt-4">
        <div className="w-full bg-white rounded-lg shadow border xl:p-0 mb-10">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-[#f29221] md:text-2xl">
              Create a Product
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <label htmlFor="Productimage" className="mb-6">
                {formData.Productimage ? (
                  <div className="flex items-center justify-center cursor-pointer">
                    <img
                      className="w-20 h-20 rounded-full cursor-pointer"
                      src={formData.Productimage}
                      alt="Product"
                    />
                  </div>
                ) : (
                  <div className="rounded-full text-5xl flex items-center justify-center cursor-pointer">
                    <div className="w-28 h-28 border-2 border-[#f29221] rounded-full p-1 flex items-center justify-center">
                      <span className="text-gray-500">Logo</span>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  name="Productimage"
                  id="Productimage"
                  onChange={(e) => handleImageChange(e)}
                  accept="image/*"
                  className="hidden"
                />
                <div className="my-2 flex justify-center items-center text-sm font-medium text-gray-900">
                  Upload Product Picture
                </div>
              </label>

              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-2 focus:ring-primary-300"
                  placeholder="Enter product title"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-2 focus:ring-primary-300"
                  placeholder="Enter product price"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-primary-300"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500">
                    I accept the{" "}
                    <a
                      className="font-medium text-[#f29221] hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                className="relative flex p-2.5 rounded-lg w-full items-center justify-center overflow-hidden bg-[#f29221] font-medium text-white shadow-2xl 
                transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear
                hover:bg-white hover:text-[#f29221] hover:shadow-[#f29221] hover:before:border-[25px]"
              >
                <span className="relative z-10">Save</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateNewProduct;
