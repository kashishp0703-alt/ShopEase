import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  // Handle login
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Check empty fields
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Get registered user
    const savedUser = JSON.parse(
      localStorage.getItem("shopEaseUser")
    );

    // Check if account exists
    if (!savedUser) {
      setError(
        "No account found. Please create an account first."
      );
      return;
    }

    // Check email and password
    if (
      savedUser.email !== email ||
      savedUser.password !== password
    ) {
      setError("Invalid email or password.");
      return;
    }

    // Save logged-in user
    localStorage.setItem(
      "shopEaseLoggedIn",
      JSON.stringify(savedUser)
    );

    setSuccess("Login successful!");

    // Go to home page
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-12">
      <div className="mx-auto max-w-md">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="text-3xl font-extrabold text-gray-900"
          >
            Shop<span className="text-orange-500">Ease</span>
          </Link>

          <h1 className="mt-8 text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to your ShopEase account.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="mb-5 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-600">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:bg-white"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:bg-white"
              />
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-orange-500"
            >
              Login
            </button>

          </form>

          {/* SIGNUP LINK */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-bold text-orange-500 hover:text-orange-600"
            >
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}

export default Login;
