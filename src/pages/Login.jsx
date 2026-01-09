import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";

    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const data = response.data;

      Cookies.set("token", data.token, { expires: 1 });
      navigate("/dashboard");
      toast.success("Login successfully!");
    } catch (error) {
      console.error("login is failed", error);
      toast.error("somthing went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3f1ff] px-4 text-[#4b4b4b]">
      <div className="text-center rounded w-full max-w-3xl shadow-lg flex overflow-hidden">
        <div className="lg:w-1/2 md:w-1/2 sm:w-full w-full p-5 bg-white">
          <h1 className="text-3xl font-bold mb-5 text-gray-800 capitalize">
            Sign In
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col text-sm my-12">
            <div className="text-start flex flex-col mb-4">
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full text-gray-600 border-b border-gray-200 py-1 bg-white appearance-none focus:outline-none focus:ring-0 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="text-start flex flex-col relative mb-4">
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full text-gray-600 border-b border-gray-200 py-1 bg-white appearance-none focus:outline-none focus:ring-0  ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 bottom-1 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 text-start">
                {errors.password}
              </p>
            )}

            <div className="text-right pt-3">
              <Link
                to="/forgotpassword"
                className="text-gray-500 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 my-1 border-solid border-2 border-[#b02b2b] font-bold text-white transition-all duration-200 rounded ${
                loading
                  ? "bg-custom-radial cursor-not-allowed opacity-70"
                  : "bg-custom-radial hover:brightness-110 active:brightness-95"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="my-3 text-gray-400 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-bold text-gray-600 ml-1">
              Sign Up
            </Link>
          </p>

          <p className="text-gray-400 text-xs mt-2">
            By continuing, you agree to our Privacy Policy.
          </p>
        </div>
        <div className="w-1/2 lg:flex md:flex sm:hidden hidden border-solid border-2 border-[#b02b2b] font-bold text-white bg-custom-radial items-center h-auto flex-col justify-center">
          <div className="w-32 h-32">
            <img
              src="/nail-polish_01.gif"
              alt="makup-icons"
              className="mix-blend-multiply"
            />
          </div>
          <p className="text-2xl">Glamify</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
