import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
  } = useCart();

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-5 py-12 sm:py-16 lg:px-16">

        <div className="mx-auto flex min-h-125 max-w-3xl flex-col items-center justify-center text-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-5xl shadow-sm">
            🛒
          </div>

          <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
            Shopping Cart
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your cart is empty
          </h1>

          <p className="mt-4 max-w-md text-sm leading-7 text-gray-500">
            You haven't added any products yet. Explore our collection
            and discover something you'll love.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-gray-900 px-8 py-4 text-sm font-bold text-white transition duration-300 hover:bg-orange-500"
          >
            ← Continue Shopping
          </Link>

        </div>

      </main>
    );
  }

  // ==========================================
  // CART PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10 sm:py-14 lg:px-16 lg:py-16">

      <div className="mx-auto max-w-7xl">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="mb-10">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
            Shopping Cart
          </p>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Your Cart
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                {cart.length}{" "}
                {cart.length === 1 ? "product" : "products"}{" "}
                in your shopping cart
              </p>

            </div>

            <button
              type="button"
              onClick={clearCart}
              className="w-fit rounded-lg px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-700"
            >
              🗑 Clear Cart
            </button>

          </div>

        </div>

        {/* ======================================
            MAIN LAYOUT
        ====================================== */}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">

          {/* ====================================
              CART PRODUCTS
          ==================================== */}

          <section className="space-y-4">

            {cart.map((item) => {

              const unitPrice = Math.round(
                item.price * 85
              );

              const itemTotal = Math.round(
                item.price * item.quantity * 85
              );

              return (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:shadow-md"
                >

                  <div className="flex flex-col gap-5 p-4 sm:flex-row sm:p-5">

                    {/* PRODUCT IMAGE */}

                    <Link
                      to={`/product/${item.id}`}
                      className="flex h-48 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:h-36 sm:w-36"
                    >

                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain p-5 transition duration-500 hover:scale-105"
                      />

                    </Link>

                    {/* PRODUCT INFORMATION */}

                    <div className="flex min-w-0 flex-1 flex-col">

                      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">

                        <div className="min-w-0">

                          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-orange-500">
                            {item.category}
                          </p>

                          <Link
                            to={`/product/${item.id}`}
                            className="block text-base font-bold leading-6 text-gray-900 transition hover:text-orange-500 sm:text-lg"
                          >
                            {item.title}
                          </Link>

                          {/* Rating */}

                          <div className="mt-2 flex items-center gap-2">

                            <span className="text-sm text-orange-500">
                              ⭐ {item.rating?.rate || 0}
                            </span>

                            <span className="text-xs text-gray-400">
                              ({item.rating?.count || 0})
                            </span>

                          </div>

                        </div>

                        {/* ITEM TOTAL */}

                        <div className="sm:text-right">

                          <p className="text-lg font-extrabold text-gray-900">
                            ₹{itemTotal.toLocaleString("en-IN")}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            ₹{unitPrice.toLocaleString("en-IN")} each
                          </p>

                        </div>

                      </div>

                      {/* PRODUCT ACTIONS */}

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 sm:mt-auto">

                        {/* QUANTITY */}

                        <div>

                          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-400">
                            Quantity
                          </p>

                          <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-300">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(item.id)
                              }
                              className="flex h-10 w-10 items-center justify-center text-lg font-bold text-gray-700 transition hover:bg-gray-100"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>

                            <span className="flex h-10 w-12 items-center justify-center border-x border-gray-300 text-sm font-bold text-gray-900">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(item.id)
                              }
                              className="flex h-10 w-10 items-center justify-center text-lg font-bold text-gray-700 transition hover:bg-gray-100"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>

                          </div>

                        </div>

                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="rounded-lg px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-700"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>

                </article>
              );
            })}

            {/* CONTINUE SHOPPING */}

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 pt-2 text-sm font-bold text-gray-600 transition hover:text-orange-500"
            >
              ← Continue Shopping
            </Link>

          </section>

          {/* ====================================
              ORDER SUMMARY
          ==================================== */}

          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-extrabold text-gray-900">
                Order Summary
              </h2>

              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-500">
                {cart.length}{" "}
                {cart.length === 1 ? "item" : "items"}
              </span>

            </div>

            {/* SUMMARY DETAILS */}

            <div className="mt-7 space-y-5">

              <div className="flex items-center justify-between text-sm">

                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-semibold text-gray-900">
                  ₹{Math.round(cartTotal).toLocaleString("en-IN")}
                </span>

              </div>

              <div className="flex items-center justify-between text-sm">

                <span className="text-gray-500">
                  Delivery
                </span>

                <span className="font-bold text-green-600">
                  FREE
                </span>

              </div>

              <div className="flex items-center justify-between text-sm">

                <span className="text-gray-500">
                  Tax
                </span>

                <span className="font-semibold text-gray-900">
                  Included
                </span>

              </div>

            </div>

            {/* DIVIDER */}

            <div className="my-6 h-px bg-gray-200" />

            {/* TOTAL */}

            <div className="flex items-center justify-between">

              <span className="text-base font-bold text-gray-900">
                Total
              </span>

              <span className="text-2xl font-extrabold text-gray-900">
                ₹{Math.round(cartTotal).toLocaleString("en-IN")}
              </span>

            </div>

            {/* CHECKOUT */}

            <Link
              to="/checkout"
              className="mt-7 flex w-full items-center justify-center rounded-xl bg-gray-900 px-6 py-4 text-sm font-bold text-white transition duration-300 hover:bg-orange-500"
            >
              Proceed to Checkout →
            </Link>

            {/* SECURE CHECKOUT */}

            <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4">

              <div className="flex gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-sm">
                  🔒
                </div>

                <div>

                  <p className="text-xs font-bold text-gray-900">
                    Secure Checkout
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-gray-500">
                    Your payment and personal information
                    are protected.
                  </p>

                </div>

              </div>

            </div>

            {/* BENEFITS */}

            <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">

              <div className="flex items-center gap-3">

                <span className="text-lg">
                  🚚
                </span>

                <span className="text-xs font-medium text-gray-600">
                  Fast and reliable delivery
                </span>

              </div>

              <div className="flex items-center gap-3">

                <span className="text-lg">
                  ↩️
                </span>

                <span className="text-xs font-medium text-gray-600">
                  Easy returns and support
                </span>

              </div>

              <div className="flex items-center gap-3">

                <span className="text-lg">
                  ✓
                </span>

                <span className="text-xs font-medium text-gray-600">
                  Quality products guaranteed
                </span>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}

export default Cart;
