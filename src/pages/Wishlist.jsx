import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  const { cart, addToCart } = useCart();

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = (product) => {
    const alreadyInCart = cart.some(
      (item) => item.id === product.id
    );

    // Don't add again if already in cart
    if (alreadyInCart) {
      return;
    }

    addToCart(product, 1);
  };

  // ==========================================
  // EMPTY WISHLIST
  // ==========================================

  if (wishlist.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-5 py-16 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-7xl">♡</div>

          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Your Wishlist is Empty
          </h1>

          <p className="mt-3 text-gray-500">
            Save your favorite products here and come back
            whenever you are ready to shop.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-xl bg-gray-900 px-7 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  // ==========================================
  // WISHLIST
  // ==========================================

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-12 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[3px] text-orange-500">
            YOUR FAVORITES
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-gray-900">
            My Wishlist
          </h1>

          <p className="mt-2 text-gray-500">
            {wishlist.length} product
            {wishlist.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        {/* PRODUCTS */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {wishlist.map((product) => {

            // Check if this wishlist product is already in cart
            const isInCart = cart.some(
              (item) => item.id === product.id
            );

            return (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* IMAGE */}

                <div className="relative flex h-72 items-center justify-center bg-gray-50 p-8">

                  <Link
                    to={"/product/" + product.id}
                    className="h-full w-full"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-contain"
                    />
                  </Link>

                  {/* REMOVE FROM WISHLIST */}

                  <button
                    type="button"
                    onClick={() =>
                      removeFromWishlist(product.id)
                    }
                    className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl text-red-500 shadow-md transition hover:scale-110"
                    aria-label="Remove from wishlist"
                    title="Remove from wishlist"
                  >
                    ❤️
                  </button>
                </div>

                {/* INFO */}

                <div className="p-5">

                  {/* CATEGORY */}

                  <p className="text-xs font-bold uppercase tracking-wide text-orange-500">
                    {product.category}
                  </p>

                  {/* TITLE */}

                  <Link
                    to={"/product/" + product.id}
                    className="mt-2 block min-h-12 text-base font-bold leading-6 text-gray-900 transition hover:text-orange-500"
                  >
                    {product.title}
                  </Link>

                  {/* RATING */}

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-orange-500">
                      ⭐ {product.rating?.rate || 0}
                    </span>

                    <span className="text-xs text-gray-400">
                      ({product.rating?.count || 0})
                    </span>
                  </div>

                  {/* PRICE */}

                  <p className="mt-4 text-xl font-extrabold text-gray-900">
                    ₹
                    {Math.round(
                      product.price * 85
                    ).toLocaleString("en-IN")}
                  </p>

                  {/* ADD TO CART */}

                  <button
                    type="button"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                    disabled={isInCart}
                    className={`mt-5 w-full rounded-xl px-5 py-3 text-sm font-bold text-white transition ${
                      isInCart
                        ? "cursor-default bg-green-600"
                        : "bg-gray-900 hover:bg-orange-500"
                    }`}
                  >
                    {isInCart
                      ? "✓ Added to Cart"
                      : "🛒 Add to Cart"}
                  </button>

                  {/* VIEW CART */}

                  {isInCart && (
                    <Link
                      to="/cart"
                      className="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-orange-500 hover:text-orange-500"
                    >
                      View Cart →
                    </Link>
                  )}

                </div>
              </article>
            );
          })}

        </div>
      </div>
    </main>
  );
}

export default Wishlist;
