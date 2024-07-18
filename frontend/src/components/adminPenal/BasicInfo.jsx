import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import apiUrls from "../../common/apiUrls";
import {useNavigate} from 'react-router-dom';
import { CreateUpdateStore } from "../../redux/slice/storeSlice";
import Cookies from 'js-cookie';

function BasicInfo() {
  const navigator = useNavigate()
  const store = useSelector((state) => state.store.Store);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    storeName: "",
    tagline: "",
    description: "",
    storeLogo: null,
    bannerImage: null,
  });

  useEffect(() => {
    const isLogedIn = Cookies.get('isLogedIn');

    if (!isLogedIn || isLogedIn === 'false') {
      navigator('/login');
      return;
    }

    if (store) {
      setFormData({
        storeName: store?.data?.storeName || '',
        tagline: store?.data?.tagline || '',
        description: store?.data?.description || '',
        storeLogo: store?.data?.storeLogo || '',
        bannerImage: store?.data?.bannerImage || '',
      });
    }
    }, [store]);

  const handleImageChange = (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [imageType]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CreateUpdateStore({ url: apiUrls.createOrUpdateStore.url, info:formData  }));
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center p-16 w-full pt-4">
        <div className="w-full bg-white rounded-lg shadow border xl:p-0 mb-10">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-[#f29221] md:text-2xl">
              Create an eCommerce Store
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <label htmlFor="storeLogo" className="mb-6">
                {formData.storeLogo ? (
                  <div className="flex items-center justify-center cursor-pointer">
                    <img
                      className="w-20 h-20 rounded-full cursor-pointer"
                      src={formData.storeLogo}
                      alt="Store Logo"
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
                  name="storeLogo"
                  id="storeLogo"
                  onChange={(e) => handleImageChange(e, 'storeLogo')}
                  accept="image/*"
                  className="hidden"
                />
                <div className="my-2 flex justify-center items-center text-sm font-medium text-gray-900">
                  Upload Store Logo
                </div>
              </label>

              <label htmlFor="bannerImage" className="mb-6">
                {formData.bannerImage ? (
                  <div className="flex items-center justify-center cursor-pointer border-2 border-[#f29221] mt-4">
                    <img
                      className="w-full border-[#f29221] h-40 object-cover cursor-pointer"
                      src={formData.bannerImage}
                      alt="Banner Image"
                    />
                  </div>
                ) : (
                  <div className="w-full h-40 border-2 border-[#f29221] mt-4 rounded-lg p-1 flex items-center justify-center cursor-pointer">
                    <span className="text-gray-500">Banner Image</span>
                  </div>
                )}
                <input
                  type="file"
                  name="bannerImage"
                  id="bannerImage"
                  onChange={(e) => handleImageChange(e, 'bannerImage')}
                  accept="image/*"
                  className="hidden"
                />
                <div className="my-2 flex justify-center items-center text-sm font-medium text-gray-900">
                  Upload Banner Image
                </div>
              </label>

              <div>
                <label
                  htmlFor="storeName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Store Name
                </label>
                <input
                  type="text"
                  name="storeName"
                  id="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-2 focus:ring-primary-300"
                  placeholder="Enter your store name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="tagline"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tag Line
                </label>
                <input
                  type="text"
                  name="tagline"
                  id="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-2 focus:ring-primary-300"
                  placeholder="Enter your tag line"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-gray-50 border h-32 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-2 focus:ring-primary-300"
                  placeholder="Enter your store description"
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

export default BasicInfo;
