import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Men's Fashion",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Women's Fashion",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Jewellery",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1000&q=85",
  },
];

const slides = [
  {
    title: "Shop Smart.",
    highlight: "Live Better.",
    description:
      "Discover the latest fashion, electronics, jewellery and more. Find everything you love in one place.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=90",
    label: "Welcome to ShopEase",
    primaryText: "Shop Now",
    primaryLink: "/shop",
    secondaryText: "Explore Collection",
    secondaryLink: "/categories",
  },
  {
    title: "New Styles.",
    highlight: "New You.",
    description:
      "Refresh your wardrobe with stylish new arrivals designed for every occasion.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=90",
    label: "New Fashion Collection",
    primaryText: "Shop Fashion",
    primaryLink: "/shop",
    secondaryText: "View Categories",
    secondaryLink: "/categories",
  },
  {
    title: "Shine With",
    highlight: "Every Look.",
    description:
      "Discover elegant jewellery pieces that add the perfect finishing touch to your style.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=90",
    label: "Jewellery Collection",
    primaryText: "Shop Jewellery",
    primaryLink: "/shop",
    secondaryText: "Explore More",
    secondaryLink: "/categories",
  },
  {
    title: "Technology",
    highlight: "Made Simple.",
    description:
      "Upgrade your everyday life with modern electronics and smart technology.",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=2000&q=90",
    label: "Latest Electronics",
    primaryText: "Shop Electronics",
    primaryLink: "/shop",
    secondaryText: "Explore Collection",
    secondaryLink: "/categories",
  },
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // =========================
  // AUTOMATIC SLIDER
  // =========================

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrentSlide((previous) =>
        previous === slides.length - 1 ? 0 : previous + 1
      );
    }, 5000);

    return () => clearInterval(slider);
  }, []);

  // =========================
  // SLIDER CONTROLS
  // =========================

  const nextSlide = () => {
    setCurrentSlide((previous) =>
      previous === slides.length - 1 ? 0 : previous + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((previous) =>
      previous === 0 ? slides.length - 1 : previous - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full bg-white text-gray-900">

      {/* ================= HERO SMART SLIDER ================= */}

      <section className="relative min-h-162.5 overflow-hidden bg-gray-900 md:min-h-screen">

        {/* SLIDES */}

        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide
                ? "z-10 opacity-100"
                : "z-0 opacity-0"
            }`}
          >

            {/* Background Image */}

            <img
              src={slide.image}
              alt={slide.label}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark Overlay */}

            <div className="absolute inset-0 bg-black/50"></div>

            {/* Extra Gradient */}

            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/45 to-black/10"></div>

            {/* Content */}

            <div className="relative mx-auto flex min-h-162.5 max-w-7xl items-center px-6 py-20 lg:min-h-screen lg:px-8">

              <div
                className={`max-w-2xl text-white transition-all duration-1000 ${
                  index === currentSlide
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >

                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gray-200">
                  {slide.label}
                </p>

                <h1 className="text-5xl font-bold leading-tight sm:text-6xl md:text-7xl">
                  {slide.title}
                  <br />
                  <span className="text-gray-200">
                    {slide.highlight}
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-8 text-gray-200 sm:text-lg">
                  {slide.description}
                </p>

                {/* Buttons */}

                <div className="mt-8 flex flex-wrap gap-4">

                  <Link
                    to={slide.primaryLink}
                    className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 font-semibold text-gray-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-gray-100"
                  >
                    {slide.primaryText} →
                  </Link>

                  <Link
                    to={slide.secondaryLink}
                    className="inline-flex items-center justify-center rounded-lg border border-white/70 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-gray-900"
                  >
                    {slide.secondaryText}
                  </Link>

                </div>

              </div>

            </div>
          </div>
        ))}

        {/* ================= PREVIOUS BUTTON ================= */}

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-2xl text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-gray-900 sm:left-6"
        >
          ‹
        </button>

        {/* ================= NEXT BUTTON ================= */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-2xl text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-gray-900 sm:right-6"
        >
          ›
        </button>

        {/* ================= SLIDE INDICATORS ================= */}

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">

          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-9 bg-white"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}

        </div>

        {/* ================= SLIDE COUNTER ================= */}

        <div className="absolute bottom-8 right-6 z-20 hidden text-sm font-medium text-white/80 sm:block">
          {String(currentSlide + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </div>

      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="mb-10 flex items-center justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Shop by
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Categories
            </h2>

          </div>

          <Link
            to="/categories"
            className="view-all-btn hidden sm:inline-flex"
          >
            View All →
          </Link>

        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => (

            <Link
              to="/categories"
              className="category-card group relative block overflow-hidden rounded-2xl"
              key={category.name}
            >

              <img
                src={category.image}
                alt={category.name}
                className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/70 via-black/20 to-transparent p-6">

                <h3 className="text-2xl font-bold text-white">
                  {category.name}
                </h3>

                <span className="mt-2 text-sm font-medium text-white">
                  Shop Now →
                </span>

              </div>

            </Link>

          ))}

        </div>

        <Link
          to="/categories"
          className="view-all-btn mt-8 inline-flex sm:hidden"
        >
          View All →
        </Link>

      </section>

      {/* ================= SALE BANNER ================= */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-16 text-center text-white md:px-16">

          <div className="relative z-10 mx-auto max-w-2xl">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-300">
              Limited Time Offer
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Up to 50% Off
            </h2>

            <p className="mt-5 text-lg text-gray-300">
              Don't miss out on amazing deals across selected products.
              Shop your favourites before the sale ends.
            </p>

            <Link
              to="/shop"
              className="promo-btn mt-8 inline-flex items-center justify-center"
            >
              Shop Sale →
            </Link>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="border-t border-gray-100">

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">

          <div className="text-center">

            <div className="text-3xl">🚚</div>

            <h3 className="mt-4 font-semibold">
              Fast Delivery
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Quick and reliable delivery to your doorstep.
            </p>

          </div>

          <div className="text-center">

            <div className="text-3xl">🔒</div>

            <h3 className="mt-4 font-semibold">
              Secure Payment
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Your payment information is safe and secure.
            </p>

          </div>

          <div className="text-center">

            <div className="text-3xl">↩️</div>

            <h3 className="mt-4 font-semibold">
              Easy Returns
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Simple and hassle-free return process.
            </p>

          </div>

          <div className="text-center">

            <div className="text-3xl">💬</div>

            <h3 className="mt-4 font-semibold">
              Customer Support
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              We're here to help whenever you need us.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;
