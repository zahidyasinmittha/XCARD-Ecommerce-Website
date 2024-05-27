import { useState } from "react";
import { MdError } from "react-icons/md";
import { Link , useNavigate } from "react-router-dom";
import { signupAvatar } from "../assest";
import apiUrls from "../common/apiUrls";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    ProfileImage: null,
  });
  const [confirmPassword, setconfirmPassword] = useState("");
  const [checkEqual, setCheckEqual] = useState(false);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, ProfileImage: reader.result });
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
    setCheckEqual(false);
    if (formData.password !== confirmPassword) {
      setCheckEqual(true);
      return;
    }
    try{
      const response = await axios.post(apiUrls.signUp.url, formData);
      if (response.data.success === true){
        toast.success(response.data.message, {
          position: "bottom-center"
        });
        navigate('/login')
      }
      if(response.data.error){
        toast.error(response.data.message, {
            position: "bottom-center"
          })
        }
    }
    catch(err){
      toast.error("Something went wrong", {
        position: "bottom-center"
      })
    }
    }

  return (
    <section className="bg-gray-100 pt-8">
      <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto lg:py-0 ">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 mb-10">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-[#f29221] md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <label htmlFor="image" className="mb-6">
                {formData.ProfileImage ? (
                  <div className="flex items-center justify-center cursor-pointer">
                    <img
                      className="w-20 h-20 rounded-full cursor-pointer"
                      src={formData.ProfileImage}
                      alt="profile"
                    />
                  </div>
                ) : (
                  <div className="rounded-ful text-5xl flex items-center justify-center cursor-pointer">
                    <img
                      src={signupAvatar}
                      alt="Avatar"
                      className="w-28 h-28 border-2 border-[#f29221] rounded-full p-1"
                    />
                  </div>
                )}
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <div className="my-2 flex justify-center items-center text-sm font-medium text-gray-900">
                  Upload Profile Picture
                </div>
              </label>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-2 focus:ring-primary-300"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-2 focus:ring-primary-300"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-2 focus:ring-primary-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-2 focus:ring-primary-300"
                  required
                />
                {checkEqual && (
                  <span className="block text-sm font-medium text-red-500 pt-2.5 pl-4">
                    <MdError className="inline text-lg mr-1 mb-1" />
                    Both Passwords Don't Match{" "}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phone"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-2 focus:ring-primary-300"
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
                <span className="relative z-10">Create an account</span>
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#f29221] text-primary-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
