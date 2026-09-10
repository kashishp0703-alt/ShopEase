import { Link } from "react-router-dom";

function Orders() {
  const savedOrders = localStorage.getItem("shopEaseOrders");

  const orders = savedOrders
    ? JSON.parse(savedOrders)
    : [];

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] bg-gray-50 px-6 py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-2xl bg-white px-6 py-16 text-center shadow-sm">

          <div className="mb-5 text-6xl">
            📦
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            No Orders Yet
          </h1>

          <p className="mt-3 text-gray-500">
            You haven't placed any orders yet.
          </p>

          <Link
            to="/shop"
            className="mt-7 rounded-xl bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Start Shopping
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            ShopEase
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500">
            View your previous orders and order details.
          </p>

        </div>

        {/* Orders */}
        <div className="space-y-6">

          {[...orders].reverse().map((order) => (

            <div
              key={order.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >

              {/* Order Header */}
              <div className="flex flex-col gap-3 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <p className="font-bold text-gray-900">
                    {order.id}
                  </p>

                </div>

                <div className="sm:text-right">

                  <p className="text-sm text-gray-500">
                    Order Date
                  </p>

                  <p className="font-medium text-gray-900">
                    {order.date}
                  </p>

                </div>

              </div>

              {/* Products */}
              <div className="mt-5 space-y-4">

                {order.products.map((product) => (

                  <div
                    key={product.id}
                    className="flex gap-4"
                  >

                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-20 w-20 rounded-lg bg-gray-50 object-contain p-2"
                    />

                    <div className="min-w-0 flex-1">

                      <h3 className="line-clamp-2 font-semibold text-gray-900">
                        {product.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {product.quantity}
                      </p>

                      <p className="mt-1 font-semibold text-gray-900">
                        ₹{(product.price * product.quantity).toFixed(0)}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

              {/* Order Bottom */}
              <div className="mt-6 border-t border-gray-200 pt-5">

                <div className="grid gap-4 sm:grid-cols-3">

                  {/* Payment */}
                  <div>

                    <p className="text-sm text-gray-500">
                      Payment
                    </p>

                    <p className="font-semibold text-gray-900">
                      {order.payment}
                    </p>

                  </div>

                  {/* Address */}
                  <div>

                    <p className="text-sm text-gray-500">
                      Delivery Address
                    </p>

                    <p className="font-semibold text-gray-900">
                      {order.address.city},{" "}
                      {order.address.state}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.address.pincode}
                    </p>

                  </div>

                  {/* Total */}
                  <div className="sm:text-right">

                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="text-2xl font-bold text-gray-900">
                      ₹{Number(order.total).toFixed(0)}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">

          <Link
            to="/shop"
            className="inline-block rounded-xl bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Orders;
