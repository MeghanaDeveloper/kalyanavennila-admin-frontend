import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { adminLoginData } from "../../services/adminApis";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await dispatch(adminLoginData(userName, password));
      if (response.success) {
        navigate("/admin/dashboard");
        setUserName("");
        setPassword("");
      }
    } catch (error) {
      return toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div
        className="pt-32 pb-16"
        style={{
          background:
            "linear-gradient(to bottom right, #f0fdfa, #b2ebf2, #f8bbd0, #c8e6c9)",
        }}
      >
        <div className="flex justify-center items-center flex-col">
          <div className="bg-lime-50 shadow-xl py-10 px-6 w-96 rounded-2xl">
            {loading && (
              <div className="absolute inset-0 bg-white/70 flex justify-center items-center z-10">
                <FaSpinner className="text-primary animate-spin text-4xl" />
              </div>
            )}

            <h2 className="text-2xl font-bold text-primary text-center py-2">
              Please Login !!
            </h2>

            <form
              className="px-5 py-3 relative"
              onSubmit={handleSubmit}
              method="POST"
            >
              <div className="pb-5">
                <label htmlFor="userName" className="label-styles">
                  UserName :
                </label>
                <div className="mt-2">
                  <input
                    required
                    id="userName"
                    name="userName"
                    type="text"
                    autoComplete="off"
                    className="textbox-styles"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="User Name"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="pb-12">
                <label htmlFor="password" className="label-styles">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="textbox-styles pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                    disabled={loading}
                  />
                  <span
                    className={`absolute top-3 right-3 cursor-pointer text-gray-600 ${
                      loading ? "opacity-50 pointer-events-none" : ""
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <p
                //   onClick={() => [
                //     setIsLoginOpen(false),
                //     setIsSignUpOpen(true),
                //     setStep(9),
                //   ]}
                className={`absolute right-5 top-[210px] text-primary text-md font-bold underline transition-effects ${
                  loading ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                Forgot Password?
              </p>

              <div className="mt-6 mb-3">
                <button
                  type="submit"
                  className={`button-styles flex justify-center items-center gap-2 ${
                    loading ? "opacity-50 pointer-events-none" : ""
                  }`}
                  disabled={loading}
                >
                  {loading && <FaSpinner className="animate-spin" />}
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
