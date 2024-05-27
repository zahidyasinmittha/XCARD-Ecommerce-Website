import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinGif } from "../assest";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";
import apiUrls from "../common/apiUrls";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { fetchUser } from '../redux/slice/userSlice';

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    try{
      const response = await axios.post(apiUrls.login.url, formData, { withCredentials: true });
      if (response.data.success === true){
        dispatch(fetchUser())
        navigate("/")
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
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="flex flex-col items-center px-6 py-4 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center flex-col items-center">
              <img src={signinGif} className="w-36 h-36" alt="Sign In" />
              <h1 className="text-center text-xl font-bold text-[#f29221] md:text-2xl">
                Login Your account
              </h1>
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-2 focus:ring-primary-300"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-2 focus:ring-primary-300 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute top-[2.6rem] right-0 pr-3 text-base text-[#f29221]"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>
              <button
                className="relative flex p-2.5 rounded-lg w-full items-center justify-center overflow-hidden bg-[#f29221] font-medium text-white shadow-2xl 
                 transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear
               hover:bg-white hover:text-[#f29221] hover:shadow-[#f29221] hover:before:border-[25px]"
              >
                <span className="relative z-10">Login</span>
              </button>
              <p className="text-sm font-light text-gray-500">
                Forgot your password?{" "}
                <Link
                  to="/ForgotPassword"
                  className="font-medium text-[#f29221] text-primary-600 hover:underline"
                >
                  Reset Password
                </Link>
              </p>
              <p className="text-sm font-light text-gray-500">
                Not a member?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-[#f29221] text-primary-600 hover:underline"
                >
                  Sign Up Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
