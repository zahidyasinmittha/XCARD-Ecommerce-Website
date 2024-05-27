import { useState } from "react";
import { MdError } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordAvatar } from "../assest";
import axios from "axios";
import { toast } from "react-toastify";
import apiUrls from "../common/apiUrls";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkEqual, setCheckEqual] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const navigate = useNavigate()

  const handleResetPassword =async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setCheckEqual(true);
      return;
    }
    const formData = {
      email,
      password,
    };
    const loading = toast.loading("Verifying Code, Please wait...", {
      position: "bottom-center",
    });
    const response = await axios.post(apiUrls.resetPassword.url, formData);
    toast.dismiss(loading.current);
    if (response.data.success === true) {
      toast.success(response.data.message, {
        position: "bottom-center",
      });
      navigate("/login")
    }
    if (response.data.error) {
      toast.error(response.data.message, {
        position: "bottom-center",
      });
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setVerificationCode('')
      setCodeSent(false)
      setShowPasswordFields(false)
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    const formData = {
      email,
    };
    const loading = toast.loading("Sending Verification Code, Please wait...", {
      position: "bottom-center",
    });
    const response = await axios.post(apiUrls.sendcode.url, formData);
    toast.dismiss(loading.current);
    if (response.data.success === true) {
      toast.success(response.data.message, {
        position: "bottom-center",
      });
      setCodeSent(true);
    }
    if (response.data.error) {
      toast.error(response.data.message, {
        position: "bottom-center",
      });
    }
  };
  const handleValidateCode = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      verificationCode,
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
      setShowPasswordFields(true);
    }
    if (response.data.error) {
      toast.error(response.data.message, {
        position: "bottom-center",
      });
    }
  };
  return (
    <section className="bg-gray-100 py-12">
      <div className="flex flex-col items-center px-6 py-4 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center flex-col items-center">
              <img
                src={forgotPasswordAvatar}
                alt="ForgotPasswordAvatar"
                className="w-36 h-36"
              />
              <h1 className="text-center text-xl font-bold text-[#f29221] md:text-2xl">
                Forgot Password
              </h1>
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSendCode}>
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

              {!codeSent && (
                <button
                  type="submit"
                  className="w-full text-white bg-[#f29221] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Send Verification Code
                </button>
              )}
            </form>

            {codeSent && (
              <>
                <div>
                  <label
                    htmlFor="verification-code"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Verification Code
                  </label>
                  <input
                    type="text"
                    name="verification-code"
                    id="verification-code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-2 focus:ring-primary-300"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleValidateCode}
                  className="w-full text-white bg-[#f29221] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Verify Code
                </button>
              </>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={handleResetPassword}>
              {showPasswordFields && (
                <>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <button
                    type="submit"
                    className="w-full text-white bg-[#f29221] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Reset Password
                  </button>
                </>
              )}
              <p className="text-sm font-light text-gray-500">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#f29221] text-primary-600 hover:underline"
                >
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
