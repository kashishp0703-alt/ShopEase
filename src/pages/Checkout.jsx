import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const statesAndCities = {
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Tirupati",
    "Nellore",
  ],
  "Arunachal Pradesh": [
    "Itanagar",
    "Tawang",
    "Naharlagun",
    "Pasighat",
  ],
  Assam: [
    "Guwahati",
    "Dibrugarh",
    "Silchar",
    "Jorhat",
    "Tezpur",
  ],
  Bihar: [
    "Patna",
    "Gaya",
    "Muzaffarpur",
    "Bhagalpur",
    "Darbhanga",
  ],
  Chhattisgarh: [
    "Raipur",
    "Bhilai",
    "Bilaspur",
    "Korba",
    "Durg",
  ],
  Goa: [
    "Panaji",
    "Vasco da Gama",
    "Margao",
    "Mapusa",
  ],
  Gujarat: [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Gandhinagar",
    "Bhavnagar",
  ],
  Haryana: [
    "Gurugram",
    "Faridabad",
    "Panipat",
    "Ambala",
    "Hisar",
    "Karnal",
  ],
  "Himachal Pradesh": [
    "Shimla",
    "Manali",
    "Dharamshala",
    "Solan",
    "Mandi",
  ],
  Jharkhand: [
    "Ranchi",
    "Jamshedpur",
    "Dhanbad",
    "Bokaro",
    "Deoghar",
  ],
  Karnataka: [
    "Bengaluru",
    "Mysuru",
    "Mangaluru",
    "Hubballi",
    "Belagavi",
    "Dharwad",
  ],
  Kerala: [
    "Thiruvananthapuram",
    "Kochi",
    "Kozhikode",
    "Thrissur",
    "Kollam",
    "Kannur",
  ],
  "Madhya Pradesh": [
    "Bhopal",
    "Indore",
    "Gwalior",
    "Jabalpur",
    "Ujjain",
    "Sagar",
  ],
  Maharashtra: [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Thane",
    "Aurangabad",
    "Kolhapur",
  ],
  Manipur: [
    "Imphal",
    "Thoubal",
    "Bishnupur",
    "Churachandpur",
  ],
  Meghalaya: [
    "Shillong",
    "Tura",
    "Nongpoh",
    "Jowai",
  ],
  Mizoram: [
    "Aizawl",
    "Lunglei",
    "Champhai",
    "Kolasib",
  ],
  Nagaland: [
    "Kohima",
    "Dimapur",
    "Mokokchung",
    "Tuensang",
  ],
  Odisha: [
    "Bhubaneswar",
    "Cuttack",
    "Rourkela",
    "Puri",
    "Sambalpur",
    "Berhampur",
  ],
  Punjab: [
    "Amritsar",
    "Ludhiana",
    "Jalandhar",
    "Patiala",
    "Bathinda",
    "Mohali",
  ],
  Rajasthan: [
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Kota",
    "Ajmer",
    "Bikaner",
    "Alwar",
  ],
  Sikkim: [
    "Gangtok",
    "Namchi",
    "Gyalshing",
    "Mangan",
  ],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Vellore",
  ],
  Telangana: [
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Karimnagar",
    "Khammam",
  ],
  Tripura: [
    "Agartala",
    "Udaipur",
    "Dharmanagar",
    "Kailashahar",
  ],
  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Noida",
    "Ghaziabad",
    "Agra",
    "Varanasi",
    "Prayagraj",
    "Meerut",
    "Gorakhpur",
  ],
  Uttarakhand: [
    "Dehradun",
    "Haridwar",
    "Rishikesh",
    "Nainital",
    "Haldwani",
    "Roorkee",
  ],
  "West Bengal": [
    "Kolkata",
    "Howrah",
    "Durgapur",
    "Siliguri",
    "Asansol",
    "Darjeeling",
  ],

  // Union Territories
  Delhi: [
    "New Delhi",
    "Delhi",
  ],
  "Jammu and Kashmir": [
    "Srinagar",
    "Jammu",
    "Anantnag",
    "Baramulla",
  ],
  Ladakh: [
    "Leh",
    "Kargil",
  ],
  Chandigarh: [
    "Chandigarh",
  ],
  Puducherry: [
    "Puducherry",
    "Karaikal",
    "Mahe",
    "Yanam",
  ],
  "Andaman and Nicobar Islands": [
    "Port Blair",
    "Diglipur",
  ],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Daman",
    "Diu",
    "Silvassa",
  ],
  Lakshadweep: [
    "Kavaratti",
    "Agatti",
    "Amini",
  ],
};

function Checkout() {
  const navigate = useNavigate();

  // Added clearCart here
  const { cart, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;

    setFormData((previous) => ({
      ...previous,
      state: selectedState,
      city: "",
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    if (!formData.address.trim()) {
      setError("Please enter your address.");
      return;
    }

    if (!formData.state) {
      setError("Please select your state.");
      return;
    }

    if (!formData.city) {
      setError("Please select your city.");
      return;
    }

    if (!formData.pincode.trim()) {
      setError("Please enter your pincode.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    const order = {
      id: "ORD-" + Date.now(),

      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },

      address: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },

      payment: formData.payment,

      products: cart,

      total: cartTotal,

      date: new Date().toLocaleString(),
    };

    // ==========================================
    // SAVE ALL ORDERS
    // ==========================================

    const existingOrders = JSON.parse(
      localStorage.getItem("shopEaseOrders") || "[]"
    );

    existingOrders.push(order);

    localStorage.setItem(
      "shopEaseOrders",
      JSON.stringify(existingOrders)
    );

    // ==========================================
    // SAVE LATEST ORDER
    // ==========================================

    localStorage.setItem(
      "shopEaseLastOrder",
      JSON.stringify(order)
    );

    // ==========================================
    // CLEAR CART
    // ==========================================

    clearCart();

    // ==========================================
    // GO TO ORDER SUCCESS
    // ==========================================

    navigate("/order-success");
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-gray-50 px-6 py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-2xl bg-white px-6 py-16 text-center shadow-sm">

          <div className="mb-5 text-6xl">
            🛒
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart Is Empty
          </h1>

          <p className="mt-3 text-gray-500">
            Add some products to your cart before going to checkout.
          </p>

          <Link
            to="/shop"
            className="mt-7 rounded-lg bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>

        </div>
      </div>
    );
  }

  const cities = formData.state
    ? statesAndCities[formData.state] || []
    : [];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Checkout
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Complete Your Order
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your information and choose your payment method.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid gap-8 lg:grid-cols-3">

            {/* LEFT SIDE */}
            <div className="space-y-6 lg:col-span-2">

              {/* Customer Information */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Customer Information
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit phone number"
                      maxLength="10"
                      inputMode="numeric"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    />
                  </div>

                </div>
              </div>

              {/* Shipping Address */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Shipping Address
                </h2>

                <div className="space-y-5">

                  {/* Address */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Full Address
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="4"
                      placeholder="House number, street, area..."
                      className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    />
                  </div>

                  {/* City State Pincode */}
                  <div className="grid gap-5 md:grid-cols-3">

                    {/* State */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        State
                      </label>

                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleStateChange}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                      >
                        <option value="">
                          Select State
                        </option>

                        {Object.keys(statesAndCities)
                          .sort()
                          .map((state) => (
                            <option
                              key={state}
                              value={state}
                            >
                              {state}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* City */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        City
                      </label>

                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!formData.state}
                        className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 ${
                          !formData.state
                            ? "cursor-not-allowed bg-gray-100 text-gray-400"
                            : ""
                        }`}
                      >
                        <option value="">
                          {formData.state
                            ? "Select City"
                            : "Select State First"}
                        </option>

                        {cities.map((city) => (
                          <option
                            key={city}
                            value={city}
                          >
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Pincode */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Pincode
                      </label>

                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="6-digit Pincode"
                        maxLength="6"
                        inputMode="numeric"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                      />
                    </div>

                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Payment Method
                </h2>

                <div className="space-y-3">

                  {/* COD */}
                  <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50">

                    <input
                      type="radio"
                      name="payment"
                      value="Cash on Delivery"
                      checked={
                        formData.payment === "Cash on Delivery"
                      }
                      onChange={handleChange}
                    />

                    <div>
                      <p className="font-semibold text-gray-900">
                        Cash on Delivery
                      </p>

                      <p className="text-sm text-gray-500">
                        Pay when your order arrives.
                      </p>
                    </div>

                  </label>

                  {/* UPI */}
                  <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50">

                    <input
                      type="radio"
                      name="payment"
                      value="UPI"
                      checked={formData.payment === "UPI"}
                      onChange={handleChange}
                    />

                    <div>
                      <p className="font-semibold text-gray-900">
                        UPI
                      </p>

                      <p className="text-sm text-gray-500">
                        Pay using your UPI app.
                      </p>
                    </div>

                  </label>

                  {/* Card */}
                  <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50">

                    <input
                      type="radio"
                      name="payment"
                      value="Credit / Debit Card"
                      checked={
                        formData.payment ===
                        "Credit / Debit Card"
                      }
                      onChange={handleChange}
                    />

                    <div>
                      <p className="font-semibold text-gray-900">
                        Credit / Debit Card
                      </p>

                      <p className="text-sm text-gray-500">
                        Secure card payment.
                      </p>
                    </div>

                  </label>

                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

            </div>

            {/* RIGHT SIDE */}
            <div>

              <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                {/* Products */}
                <div className="space-y-5">

                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3"
                    >

                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-16 w-16 rounded-lg bg-gray-50 object-contain p-2"
                      />

                      <div className="min-w-0 flex-1">

                        <p className="line-clamp-2 text-sm font-semibold text-gray-900">
                          {item.title}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>

                      </div>

                      <p className="text-sm font-semibold text-gray-900">
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </p>

                    </div>
                  ))}

                </div>

                <div className="my-6 border-t border-gray-200"></div>

                {/* Price */}
                <div className="space-y-4">

                  <div className="flex justify-between text-gray-600">
                    <span>
                      Subtotal
                    </span>

                    <span>
                      ₹{cartTotal.toFixed(0)}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>
                      Delivery
                    </span>

                    <span className="font-semibold text-green-600">
                      FREE
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">

                    <div className="flex justify-between text-xl font-bold text-gray-900">

                      <span>
                        Total
                      </span>

                      <span>
                        ₹{cartTotal.toFixed(0)}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Place Order */}
                <button
                  type="submit"
                  className="mt-6 w-full rounded-xl bg-gray-900 py-4 font-semibold text-white transition hover:bg-gray-800"
                >
                  Place Order →
                </button>

                <Link
                  to="/cart"
                  className="mt-4 block text-center text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  ← Back to Cart
                </Link>

              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
