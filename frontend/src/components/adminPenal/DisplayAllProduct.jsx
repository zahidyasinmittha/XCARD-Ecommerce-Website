import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import apiUrls from "../../common/apiUrls";

function DisplayAllProduct() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const isLogedIn = Cookies.get("isLogedIn");
    if (!isLogedIn || isLogedIn === "false") {
      navigator("/login");
      return;
    }
  }, []);

  useEffect(() => {
    async function fatchProduct() {
        const loading = toast.loading("Fetching data, Please wait...", {
            position: "bottom-center",
          });
      try {
        const axiosInstance = axios.create({ withCredentials: true });
        const response = await axiosInstance(apiUrls.getAllProductsOfStore.url);
        toast.dismiss(loading.current);
        if (response.data.error) {
          toast.error(response.data.message, { position: "bottom-center" });
          throw new Error(response.data.message);
        }
        setProducts(response.data.data);
        toast.success(response.data.message, { position: "bottom-center" });
      } catch (error) {
        toast.dismiss(loading.current);
        toast.error(error.message, { position: "bottom-center" });
      }
    }
    fatchProduct()
  }, []);

  return (
    <div className="w-[92%] mx-auto">
    <div className=" my-8">
      <h2 className=" text-[#f29221] text-3xl mb-4 font-extrabold">Products</h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <a key={product.id} href="#" className="group bg-black p-4 rounded-lg">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={product.Productimage}
                alt="image"
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-[#f29221]">{product.title}</h3>
            <p className="mt-1 text-lg font-medium text-[#f29221]">${product.price}</p>
          </a>
        ))}
      </div>
    </div>
  </div>
  );
}

export default DisplayAllProduct;
