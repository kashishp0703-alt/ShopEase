import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Shop() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";
  const urlSearch = searchParams.get("search") || "";

  const { cart, addToCart } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();

  // -----------------------------------------------------
  // SYNC SEARCH WITH URL
  // -----------------------------------------------------

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  // -----------------------------------------------------
  // FETCH PRODUCTS
  // -----------------------------------------------------

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setAllProducts(data);
      } catch (err) {
        console.error("Product fetch error:", err);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // -----------------------------------------------------
  // FILTER + SEARCH + SORT
  // -----------------------------------------------------

  const products = useMemo(() => {
    let result = [...allProducts];

    // CATEGORY FILTER
    if (selectedCategory) {
      result = result.filter(
        (product) =>
          product.category === selectedCategory
      );
    }

    // SEARCH
    if (search.trim() !== "") {
      const searchText = search
        .toLowerCase()
        .trim()
        .replace(/[-_]/g, " ");

      result = result.filter((product) => {
        const title = (product.title || "")
          .toLowerCase()
          .replace(/[-_]/g, " ");

        const category = (product.category || "")
          .toLowerCase()
          .replace(/[-_]/g, " ");

        const description = (product.description || "")
          .toLowerCase()
          .replace(/[-_]/g, " ");

        return (
          title.includes(searchText) ||
          category.includes(searchText) ||
          description.includes(searchText)
        );
      });
    }

    // SORT: LOW TO HIGH
    if (sort === "price-low") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    // SORT: HIGH TO LOW
    if (sort === "price-high") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    // SORT: RATING
    if (sort === "rating") {
      result.sort(
        (a, b) =>
          (b.rating?.rate || 0) -
          (a.rating?.rate || 0)
      );
    }

    return result;
  }, [
    allProducts,
    selectedCategory,
    search,
    sort,
  ]);

  // -----------------------------------------------------
  // ADD TO CART
  // -----------------------------------------------------

  const handleAddToCart = (product) => {
    const alreadyInCart = cart.some(
      (item) => item.id === product.id
    );

    if (alreadyInCart) {
      return;
    }

    addToCart(product, 1);
  };

  // -----------------------------------------------------
  // CHECK CART
  // -----------------------------------------------------

  const isInCart = (productId) => {
    return cart.some(
      (item) => item.id === productId
    );
  };

  // -----------------------------------------------------
  // WISHLIST
  // -----------------------------------------------------

  const handleWishlist = (product) => {
    toggleWishlist(product);
  };

  // -----------------------------------------------------
  // CLEAR FILTERS
  // -----------------------------------------------------

  const clearFilters = () => {
    setSearch("");
    setSort("");
  };

  // -----------------------------------------------------
  // LOADING
  // -----------------------------------------------------

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-5 py-16">
        <div className="flex min-h-125 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />

            <p className="mt-5 text-sm font-semibold text-gray-600">
              Loading products...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // -----------------------------------------------------
  // ERROR
  // -----------------------------------------------------

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
        <div className="max-w-md text-center">
          <div className="text-5xl">⚠️</div>

          <h1 className="mt-5 text-2xl font-extrabold text-gray-900">
            Something went wrong
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-7 rounded-xl bg-gray-900 px-7 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-md"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // -----------------------------------------------------
  // MAIN SHOP PAGE
  // -----------------------------------------------------

  return (
    <main className="min-h-screen bg-gray-50">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <section className="px-5 pb-10 pt-14 sm:pb-12 sm:pt-16 lg:px-16 lg:pt-20">
        <div className="mx-auto max-w-4xl text-center">

          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-orange-500">
            Shop Our Collection
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {selectedCategory
              ? selectedCategory
              : "Explore Our Collection"}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            {selectedCategory
              ? "Explore our " +
                selectedCategory +
                " collection and find something you love."
              : "Discover quality products selected especially for you."}
          </p>

        </div>
      </section>

      {/* =================================================
          SEARCH + SORT
      ================================================= */}

      <section className="px-5 pb-10 lg:px-16">
        <div className="mx-auto max-w-350 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            {/* SEARCH */}

            <div className="relative flex-1">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-50"
              />

            </div>

            {/* SORT */}

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              aria-label="Sort products"
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-semibold text-gray-700 outline-none transition-all duration-200 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-50"
            >
              <option value="">
                Sort Products
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>
            </select>

            {/* CLEAR */}

            {(search || sort) && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-bold text-gray-700 transition-all duration-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
              >
                Clear Filters
              </button>
            )}

          </div>

        </div>
      </section>

      {/* =================================================
          PRODUCTS
      ================================================= */}

      <section className="px-5 pb-20 lg:px-16">

        <div className="mx-auto max-w-350">

          {/* TOP INFORMATION */}

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <h2 className="text-2xl font-black capitalize text-gray-900 sm:text-3xl">
                  {selectedCategory
                    ? selectedCategory +
                      " Products"
                    : "All Products"}
                </h2>

                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                  {products.length}{" "}
                  {products.length === 1
                    ? "Product"
                    : "Products"}
                </span>

              </div>

              <p className="mt-2 text-sm text-gray-500">
                Find the perfect product for you.
              </p>

            </div>

            {/* VIEW ALL */}

            {selectedCategory && (
              <Link
                to="/shop"
                className="w-fit rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-md"
              >
                View All Products →
              </Link>
            )}

          </div>

          {/* =================================================
              NO PRODUCTS
          ================================================= */}

          {products.length === 0 ? (

            <div className="rounded-3xl border border-gray-200 bg-white px-5 py-20 text-center shadow-sm">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl">
                🔍
              </div>

              <h2 className="mt-6 text-2xl font-black text-gray-900">
                No products found
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                We couldn't find any products matching your search. Try another keyword.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-7 rounded-xl bg-gray-900 px-7 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-md"
              >
                Clear Search
              </button>

            </div>

          ) : (

            /* =================================================
               PRODUCT GRID
            ================================================= */

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {products.map((product) => {

                const productInCart =
                  isInCart(product.id);

                const productInWishlist =
                  isInWishlist(product.id);

                const price = Math.round(
                  product.price * 85
                );

                const originalPrice =
                  Math.round(price * 1.2);

                const discount =
                  Math.round(
                    ((originalPrice - price) /
                      originalPrice) *
                      100
                  );

                return (

                  <article
                    key={product.id}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gray-300 hover:shadow-xl"
                  >

                    {/* =================================================
                        PRODUCT IMAGE
                    ================================================= */}

                    <div className="relative">

                      {/* DISCOUNT */}

                      <span className="absolute left-4 top-4 z-10 rounded-full bg-green-100 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-green-700">
                        {discount}% OFF
                      </span>

                      {/* WISHLIST */}

                      <button
                        type="button"
                        onClick={() =>
                          handleWishlist(product)
                        }
                        className={`absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl shadow-md transition-all duration-200 hover:scale-110 ${
                          productInWishlist
                            ? "text-red-500"
                            : "text-gray-500 hover:text-red-500"
                        }`}
                        aria-label={
                          productInWishlist
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                        title={
                          productInWishlist
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        {productInWishlist
                          ? "♥"
                          : "♡"}
                      </button>

                      {/* IMAGE LINK */}

                      <Link
                        to={
                          "/product/" +
                          product.id
                        }
                        className="flex h-72 items-center justify-center overflow-hidden bg-gray-50 p-8 sm:h-80"
                      >

                        <img
                          src={product.image}
                          alt={product.title}
                          loading="lazy"
                          className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                        />

                      </Link>

                    </div>

                    {/* =================================================
                        PRODUCT INFORMATION
                    ================================================= */}

                    <div className="flex flex-1 flex-col p-5">

                      {/* CATEGORY */}

                      <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-orange-500">
                        {product.category}
                      </p>

                      {/* TITLE */}

                      <Link
                        to={
                          "/product/" +
                          product.id
                        }
                        className="mt-2 block min-h-12 text-base font-extrabold leading-6 text-gray-900 transition-colors duration-200 hover:text-orange-500"
                      >
                        {product.title}
                      </Link>

                      {/* RATING */}

                      <div className="mt-3 flex items-center gap-2">

                        <span className="inline-flex items-center gap-1 rounded-lg bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-600">
                          ⭐
                          {product.rating?.rate ||
                            0}
                        </span>

                        <span className="text-xs text-gray-400">
                          {product.rating?.count ||
                            0}{" "}
                          reviews
                        </span>

                      </div>

                      {/* PRICE */}

                      <div className="mt-4 flex items-center gap-2">

                        <span className="text-xl font-black text-gray-900">
                          ₹
                          {price.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        <span className="text-sm font-medium text-gray-400 line-through">
                          ₹
                          {originalPrice.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>

                      {/* ADD TO CART */}

                      <button
                        type="button"
                        onClick={() =>
                          handleAddToCart(product)
                        }
                        disabled={productInCart}
                        className={`mt-5 w-full rounded-xl px-5 py-3.5 text-sm font-extrabold transition-all duration-300 ${
                          productInCart
                            ? "cursor-default bg-green-600 text-white"
                            : "bg-gray-900 text-white shadow-sm hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-md"
                        }`}
                      >
                        {productInCart
                          ? "✓ Added to Cart"
                          : "🛒 Add to Cart"}
                      </button>

                      {/* VIEW CART */}

                      {productInCart && (
                        <Link
                          to="/cart"
                          className="mt-2.5 block text-center text-xs font-bold text-gray-500 transition-colors hover:text-orange-500"
                        >
                          View Cart →
                        </Link>
                      )}

                    </div>

                  </article>

                );
              })}

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default Shop;