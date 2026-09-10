import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-16 bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold">
                Shop<span className="text-blue-400">Ease</span>
              </h2>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              Your one-stop destination for fashion, accessories,
              jewellery and more. Shop easily and enjoy a better
              shopping experience.
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition hover:text-white"
              >
                Facebook
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition hover:text-white"
              >
                Instagram
              </a>

              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition hover:text-white"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/shop"
                  className="text-gray-400 transition hover:text-white"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  to="/categories"
                  className="text-gray-400 transition hover:text-white"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-gray-400 transition hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 transition hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Customer
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  to="/cart"
                  className="text-gray-400 transition hover:text-white"
                >
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  className="text-gray-400 transition hover:text-white"
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  to="/shop"
                  className="text-gray-400 transition hover:text-white"
                >
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link
                  to="/categories"
                  className="text-gray-400 transition hover:text-white"
                >
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Stay Connected
            </h3>

            <p className="mt-5 text-sm leading-6 text-gray-400">
              Subscribe to get the latest updates, offers and new
              products.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing!");
              }}
              className="mt-5"
            >
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-blue-400"
                />

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ShopEase. All rights reserved.
            </p>

            <div className="flex gap-5 text-sm">
              <button
                type="button"
                onClick={() => alert("Privacy Policy coming soon.")}
                className="text-gray-500 transition hover:text-white"
              >
                Privacy Policy
              </button>

              <button
                type="button"
                onClick={() => alert("Terms & Conditions coming soon.")}
                className="text-gray-500 transition hover:text-white"
              >
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
