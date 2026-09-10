import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  // Check logged-in user
  let loggedInUser = null;

  try {
    loggedInUser = JSON.parse(
      localStorage.getItem("shopEaseLoggedIn")
    );
  } catch (error) {
    console.error("Login data error:", error);
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("shopEaseLoggedIn");
    setMenuOpen(false);
    navigate("/");
  };

  // Close mobile menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Active navigation link
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* ==================================================
            LOGO
        ================================================== */}

        <Link
          to="/"
          onClick={closeMenu}
          className="shrink-0 text-2xl font-extrabold tracking-tight text-gray-900 transition hover:opacity-80 sm:text-3xl"
        >
          Shop<span className="text-orange-500">Ease</span>
        </Link>

        {/* ==================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <div className="hidden items-center gap-7 md:flex">

          <Link
            to="/"
            className={`relative py-2 text-sm font-semibold transition ${
              isActive("/")
                ? "text-orange-500"
                : "text-gray-700 hover:text-orange-500"
            }`}
          >
            Home

            {isActive("/") && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-orange-500" />
            )}
          </Link>

          <Link
            to="/shop"
            className={`relative py-2 text-sm font-semibold transition ${
              isActive("/shop")
                ? "text-orange-500"
                : "text-gray-700 hover:text-orange-500"
            }`}
          >
            Shop

            {isActive("/shop") && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-orange-500" />
            )}
          </Link>

          <Link
            to="/categories"
            className={`relative py-2 text-sm font-semibold transition ${
              isActive("/categories")
                ? "text-orange-500"
                : "text-gray-700 hover:text-orange-500"
            }`}
          >
            Categories

            {isActive("/categories") && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-orange-500" />
            )}
          </Link>

          <Link
            to="/about"
            className={`relative py-2 text-sm font-semibold transition ${
              isActive("/about")
                ? "text-orange-500"
                : "text-gray-700 hover:text-orange-500"
            }`}
          >
            About

            {isActive("/about") && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-orange-500" />
            )}
          </Link>

          <Link
            to="/contact"
            className={`relative py-2 text-sm font-semibold transition ${
              isActive("/contact")
                ? "text-orange-500"
                : "text-gray-700 hover:text-orange-500"
            }`}
          >
            Contact

            {isActive("/contact") && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-orange-500" />
            )}
          </Link>

        </div>

        {/* ==================================================
            RIGHT SIDE ACTIONS
        ================================================== */}

        <div className="flex items-center gap-1 sm:gap-2">

          {/* SEARCH */}

          <form
            onSubmit={(event) => {
              event.preventDefault();

              const searchInput =
                event.currentTarget.search.value.trim();

              if (searchInput) {
                navigate(
                  "/shop?search=" +
                    encodeURIComponent(searchInput)
                );

                event.currentTarget.reset();
                closeMenu();
              }
            }}
            className="hidden items-center lg:flex"
          >
            <div className="flex h-10 items-center rounded-full border border-gray-200 bg-gray-50 px-2 transition focus-within:border-orange-400 focus-within:bg-white">

              <input
                type="text"
                name="search"
                placeholder="Search products..."
                className="w-44 bg-transparent px-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 xl:w-52"
              />

              <button
                type="submit"
                aria-label="Search"
                className="flex h-8 w-8 items-center justify-center rounded-full text-base transition hover:bg-orange-100 hover:text-orange-500"
              >
                🔍
              </button>

            </div>
          </form>

          {/* MOBILE SEARCH */}

          <Link
            to="/shop"
            aria-label="Search products"
            className="flex h-10 w-10 items-center justify-center rounded-full text-lg transition hover:bg-gray-100 hover:text-orange-500 lg:hidden"
          >
            🔍
          </Link>

          {/* WISHLIST */}

          <Link
            to="/wishlist"
            onClick={closeMenu}
            aria-label="Wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-xl text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
          >
            ♡

            {wishlistCount > 0 && (
              <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* CART */}

          <Link
            to="/cart"
            onClick={closeMenu}
            aria-label="Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-lg text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* ==================================================
              DESKTOP ACCOUNT
          ================================================== */}

          {loggedInUser ? (
            <div className="hidden items-center gap-2 md:flex">

              <Link
                to="/account"
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-gray-700 transition hover:bg-gray-100 hover:text-orange-500"
              >
                <span className="text-base">
                  👤
                </span>

                Account
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-500"
              >
                Logout
              </button>

            </div>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="hidden rounded-full bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-500 md:block"
            >
              Login
            </Link>
          )}

          {/* ==================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-gray-700 transition hover:bg-gray-100 hover:text-orange-500 md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

      </div>

      {/* ==================================================
          MOBILE NAVIGATION
      ================================================== */}

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white shadow-lg md:hidden">

          <div className="mx-auto flex max-w-7xl flex-col px-5 py-5">

            <Link
              to="/"
              onClick={closeMenu}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive("/")
                  ? "bg-orange-50 text-orange-500"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>

            <Link
              to="/shop"
              onClick={closeMenu}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive("/shop")
                  ? "bg-orange-50 text-orange-500"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Shop
            </Link>

            <Link
              to="/categories"
              onClick={closeMenu}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive("/categories")
                  ? "bg-orange-50 text-orange-500"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Categories
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive("/about")
                  ? "bg-orange-50 text-orange-500"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={closeMenu}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive("/contact")
                  ? "bg-orange-50 text-orange-500"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Contact
            </Link>

            <div className="my-3 h-px bg-gray-100" />

            {/* Mobile Wishlist */}

            <Link
              to="/wishlist"
              onClick={closeMenu}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <span className="flex items-center gap-3">
                <span className="text-xl">
                  ♡
                </span>

                Wishlist
              </span>

              {wishlistCount > 0 && (
                <span className="rounded-full bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Mobile Cart */}

            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">
                  🛒
                </span>

                Cart
              </span>

              {cartCount > 0 && (
                <span className="rounded-full bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="my-3 h-px bg-gray-100" />

            {/* Mobile Account */}

            {loggedInUser ? (
              <>
                <Link
                  to="/account"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  👤 Account
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 rounded-xl bg-gray-900 px-4 py-3 text-left text-sm font-bold text-white transition hover:bg-orange-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="rounded-xl bg-gray-900 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-orange-500"
              >
                Login
              </Link>
            )}

          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;

