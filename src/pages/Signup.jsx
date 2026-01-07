import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Account created successfully!");
        navigate("/login");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3f1ff] px-4">
      <div className="bg-white shadow-lg rounded w-full max-w-lg p-5 text-[#4b4b4b]">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-700">
          Sign Up
        </h1>

        <form onSubmit={handleSignup} className="flex flex-col gap-2 text-sm">
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
              <p className="text-red-500 text-xs">{errors.firstName}</p>
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
              <p className="text-red-500 text-xs">{errors.lastName}</p>
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
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          <div className="relative mb-2">
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
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 mt-2 border-solid border-2 border-[#b02b2b] font-bold text-white transition-all duration-200 rounded ${
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
    </div>
  );
};

export default Signup;
