import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/UserService";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      formData.password.length < 8 ||
      formData.password.length > 25 ||
      !/(?=.*[0-9])(?=.*[A-Z])(?=.*[\W_])/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one number, and one special character";
    }

    return newErrors;
  };

  // SignUp Component
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      try {
        await registerUser(formData);
        navigate("/signin"); // Navigate to SignIn on success
      } catch (err) {
        setErrors({ apiError: "Email already exists" });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      <div className="max-w-md w-full p-5 border border-gray-300 rounded-md bg-purple-200 shadow-md">
        <h2 className="text-2xl font-bold text-center mb-5">
          EventFinder Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleChange}
              value={formData.name}
              className={`border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } p-2 w-full rounded-md`}
            />
            {errors.name && (
              <div className="text-red-500 text-sm">{errors.name}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              onChange={handleChange}
              value={formData.email}
              className={`border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } p-2 w-full rounded-md`}
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={formData.password}
              className={`border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } p-2 w-full rounded-md`}
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>

          {errors.apiError && (
            <div
              className="error-message text-red-500 text-sm"
              data-testid="api-error"
            >
              {errors.apiError}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full font-medium bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <NavLink
              to="/signin"
              className="text-orange-500 font-medium hover:underline"
              data-testid="signin-link"
            >
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
