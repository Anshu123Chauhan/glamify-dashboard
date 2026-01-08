import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axiosInstance from "../api/axiosInstance";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      response.data;

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3f1ff] px-4">
      <div className="text-center rounded w-full max-w-3xl shadow-lg flex overflow-hidden">
        <div className="lg:w-1/2 md:w-1/2 sm:w-full w-full p-5 bg-white">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-700">
            Sign Up
          </h1>

          <form
            onSubmit={handleSignup}
            className="flex flex-col gap-2 text-sm my-14"
          >
            <div className="mb-2">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full border-b py-2 focus:outline-none focus:ring-0 ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs text-start">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="mb-2">
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full border-b py-2 focus:outline-none focus:ring-0 ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs text-start">
                  {errors.lastName}
                </p>
              )}
            </div>

            <div className="mb-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border-b py-2 focus:outline-none focus:ring-0 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs text-start">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full border-b py-2 focus:outline-none focus:ring-0 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[70%] -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs text-start">
                {errors.password}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 mt-5 border-solid border-2 border-[#b02b2b] font-bold text-white transition-all duration-200 rounded ${
                loading
                  ? "bg-custom-radial cursor-not-allowed opacity-70"
                  : "bg-custom-radial hover:brightness-110 active:brightness-95"
              }`}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-gray-600">
              Login
            </Link>
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

export default Signup;
