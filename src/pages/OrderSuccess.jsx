import { Link } from "react-router-dom";

function OrderSuccess() {
  const savedOrder = localStorage.getItem("shopEaseLastOrder");

  const order = savedOrder
    ? JSON.parse(savedOrder)
    : null;

  return (
    <div className="min-h-[75vh] bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">

        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <span className="text-4xl">✓</span>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">
          Order Successful! 🎉
        </h1>

        <p className="mt-3 text-gray-500">
          Thank you for your order. Your order has been placed successfully.
        </p>

        {/* Order Details */}
        {order && (
          <div className="mt-8 rounded-xl bg-gray-50 p-5 text-left">

            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-500">
                Order ID
              </span>

              <span className="font-semibold text-gray-900">
                {order.id}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 py-3">
              <span className="text-gray-500">
                Customer
              </span>

              <span className="font-semibold text-gray-900">
                {order.customer.name}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 py-3">
              <span className="text-gray-500">
                Payment
              </span>

              <span className="font-semibold text-gray-900">
                {order.payment}
              </span>
            </div>

            <div className="flex justify-between pt-3">
              <span className="text-gray-500">
                Total
              </span>

              <span className="text-lg font-bold text-gray-900">
                ₹{Number(order.total).toFixed(0)}
              </span>
            </div>

          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Link
            to="/shop"
            className="rounded-xl bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="rounded-xl border border-gray-300 bg-white px-7 py-3 font-semibold text-gray-900 transition hover:bg-gray-50"
          >
            My Orders
          </Link>

        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;