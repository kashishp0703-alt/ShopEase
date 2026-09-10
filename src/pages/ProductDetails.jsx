import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();

  // ==========================================
  // CART
  // ==========================================

  const { cart, addToCart } = useCart();

  // ==========================================
  // WISHLIST
  // ==========================================

  const { wishlist, toggleWishlist } = useWishlist();

  // ==========================================
  // STATES
  // ==========================================

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Local wishlist UI state
  const [wishlistActive, setWishlistActive] = useState(false);

  // ==========================================
  // FETCH PRODUCT
  // ==========================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
        setQuantity(1);
      } catch (err) {
        console.error("Product fetch error:", err);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ==========================================
  // SYNC WISHLIST STATE
  // ==========================================

  useEffect(() => {
    if (!product) return;

    const exists = wishlist.some(
      (item) => item.id === product.id
    );

    setWishlistActive(exists);
  }, [product, wishlist]);

  // ==========================================
  // CART STATE
  // ==========================================

  const isAddedToCart = product
    ? cart.some((item) => item.id === product.id)
    : false;

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, quantity);
  };

  // ==========================================
  // TOGGLE WISHLIST
  // ==========================================

  const handleWishlist = () => {
    if (!product) return;

    // Change heart immediately
    setWishlistActive((current) => !current);

    // Add/remove product from WishlistContext
    toggleWishlist(product);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />

          <p className="mt-5 text-sm font-semibold text-gray-600">
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 text-center">
        <div className="text-7xl">😕</div>

        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
          Product Not Found
        </h1>

        <p className="mt-3 max-w-md text-gray-500">
          {error ||
            "The product you are looking for does not exist."}
        </p>

        <Link
          to="/shop"
          className="mt-7 rounded-xl bg-gray-900 px-7 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
        >
          ← Back to Shop
        </Link>
      </main>
    );
  }

  // ==========================================
  // PRICE
  // ==========================================

  const price = Math.round(product.price * 85);

  const originalPrice = Math.round(price * 1.2);

  const discount = Math.round(
    ((originalPrice - price) / originalPrice) * 100
  );

  // ==========================================
  // PRODUCT DETAILS
  // ==========================================

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10 lg:px-16 lg:py-14">
      <div className="mx-auto max-w-7xl">

        {/* ======================================
            BACK TO SHOP
        ====================================== */}

        <Link
          to="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-orange-500"
        >
          ← Back to Shop
        </Link>

        {/* ======================================
            PRODUCT CARD
        ====================================== */}

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">

            {/* ==================================
                IMAGE SECTION
            ================================== */}

            <div className="relative flex min-h-screen items-center justify-center bg-gray-50 p-8 sm:min-h-136 lg:p-14">

              {/* CATEGORY */}

              <span className="absolute left-6 top-6 z-10 rounded-full bg-gray-900 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
                {product.category}
              </span>

              {/* ==================================
                  WISHLIST BUTTON
              ================================== */}

              <button
                type="button"
                onClick={handleWishlist}
                className={`absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-3xl shadow-md transition-all duration-200 hover:scale-110 ${
                  wishlistActive
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
                aria-label={
                  wishlistActive
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                title={
                  wishlistActive
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                {wishlistActive ? "♥" : "♡"}
              </button>

              {/* PRODUCT IMAGE */}

              <div className="flex h-full w-full items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-120 w-full object-contain transition duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* ==================================
                INFORMATION SECTION
            ================================== */}

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">

              {/* CATEGORY */}

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
                {product.category}
              </p>

              {/* TITLE */}

              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                {product.title}
              </h1>

              {/* ==================================
                  RATING
              ================================== */}

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 rounded-lg bg-orange-50 px-3 py-2">
                  <span className="text-orange-500">
                    ⭐
                  </span>

                  <span className="font-bold text-gray-900">
                    {product.rating?.rate || 0}
                  </span>
                </div>

                <span className="text-sm text-gray-500">
                  {product.rating?.count || 0} customer reviews
                </span>
              </div>

              {/* ==================================
                  PRICE
              ================================== */}

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="text-4xl font-extrabold text-gray-900">
                  ₹{price.toLocaleString("en-IN")}
                </span>

                <span className="text-lg text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>

                <span className="rounded-lg bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  {discount}% OFF
                </span>
              </div>

              <p className="mt-2 text-sm text-green-600">
                Inclusive of all taxes
              </p>

              <div className="my-7 h-px bg-gray-200" />

              {/* ==================================
                  DESCRIPTION
              ================================== */}

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                  Product Description
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {product.description}
                </p>
              </div>

              {/* ==================================
                  QUANTITY
              ================================== */}

              <div className="mt-8">
                <p className="mb-3 text-sm font-bold text-gray-900">
                  Quantity
                </p>

                <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-300 bg-white">

                  {/* DECREASE */}

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        Math.max(1, quantity - 1)
                      )
                    }
                    className="flex h-12 w-12 items-center justify-center text-xl font-bold text-gray-700 transition hover:bg-gray-100"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  {/* QUANTITY */}

                  <span className="flex h-12 w-14 items-center justify-center border-x border-gray-300 font-bold text-gray-900">
                    {quantity}
                  </span>

                  {/* INCREASE */}

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                    className="flex h-12 w-12 items-center justify-center text-xl font-bold text-gray-700 transition hover:bg-gray-100"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ==================================
                  ADD TO CART
              ================================== */}

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAddedToCart}
                className={`mt-8 w-full rounded-xl px-6 py-4 text-sm font-bold text-white transition duration-300 ${
                  isAddedToCart
                    ? "cursor-default bg-green-600"
                    : "bg-gray-900 hover:bg-orange-500"
                }`}
              >
                {isAddedToCart
                  ? "✓ Added to Cart"
                  : "🛒 Add to Cart"}
              </button>

              {/* ==================================
                  VIEW CART
              ================================== */}

              {isAddedToCart && (
                <Link
                  to="/cart"
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-6 py-3 text-sm font-bold text-gray-700 transition hover:border-orange-500 hover:text-orange-500"
                >
                  View Cart →
                </Link>
              )}

              {/* ==================================
                  DELIVERY INFORMATION
              ================================== */}

              <div className="mt-8 grid gap-4 sm:grid-cols-3">

                {/* DELIVERY */}

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
                  <div className="text-2xl">
                    🚚
                  </div>

                  <p className="mt-2 text-xs font-bold text-gray-900">
                    Fast Delivery
                  </p>

                  <p className="mt-1 text-[11px] text-gray-500">
                    Quick doorstep delivery
                  </p>
                </div>

                {/* PAYMENT */}

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
                  <div className="text-2xl">
                    🔒
                  </div>

                  <p className="mt-2 text-xs font-bold text-gray-900">
                    Secure Payment
                  </p>

                  <p className="mt-1 text-[11px] text-gray-500">
                    Safe & secure checkout
                  </p>
                </div>

                {/* RETURNS */}

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
                  <div className="text-2xl">
                    ↩️
                  </div>

                  <p className="mt-2 text-xs font-bold text-gray-900">
                    Easy Returns
                  </p>

                  <p className="mt-1 text-[11px] text-gray-500">
                    Hassle-free returns
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ======================================
            TRUST SECTION
        ====================================== */}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* QUALITY */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-xl">
                ✓
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Quality Guaranteed
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Carefully selected products
                </p>
              </div>

            </div>
          </div>

          {/* SECURITY */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-xl">
                🔐
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Secure Shopping
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Your information stays protected
                </p>
              </div>

            </div>
          </div>

          {/* SUPPORT */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-xl">
                💬
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Customer Support
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  We're here whenever you need us
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default ProductDetails;