import { Link } from "react-router-dom";

const categories = [
  {
    name: "Men's Clothing",
    slug: "men's clothing",
    icon: "👕",
    description:
      "Upgrade your wardrobe with modern styles for every occasion.",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Women's Clothing",
    slug: "women's clothing",
    icon: "👗",
    description:
      "Explore stylish fashion designed for every mood and occasion.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Jewellery",
    slug: "jewelery",
    icon: "💎",
    description:
      "Add elegance to every look with beautiful jewellery pieces.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Electronics",
    slug: "electronics",
    icon: "💻",
    description:
      "Discover the latest gadgets, devices and everyday technology.",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=85",
  },
  
];

function Categories() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=85"
            alt="ShopEase collection"
            className="h-full w-full object-cover opacity-30"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center sm:py-24 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            ShopEase Collection
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Shop by Category
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
            Explore our carefully selected collections and find everything
            you need in one place.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">

        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Find what you love
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-gray-500 sm:text-right">
            Browse our collections and discover products selected for your
            everyday lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/shop?category=${encodeURIComponent(category.slug)}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/30" />

                <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/95 text-2xl shadow-lg backdrop-blur-sm">
                  {category.icon}
                </div>

                <div className="absolute bottom-5 left-5">
                  <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-900 shadow-md">
                    Explore Collection
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-extrabold text-gray-900 transition group-hover:text-orange-500">
                  {category.name}
                </h3>

                <p className="mt-3 min-h-12 text-sm leading-6 text-gray-500">
                  {category.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                  <span className="text-sm font-bold text-gray-900">
                    Shop Now
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg transition group-hover:bg-orange-500 group-hover:text-white">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotional Section */}
      <section className="mx-auto max-w-7xl px-6 pb-16 sm:pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gray-950 px-6 py-14 sm:px-12 sm:py-16">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />

          <div className="relative flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                Shop With Ease
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                Can't decide what you want?
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
                Explore our complete collection and discover something
                perfect for you.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-gray-950 transition hover:bg-orange-500 hover:text-white"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">

          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-xl">
              🚚
            </div>
            <h3 className="mt-4 font-bold text-gray-900">
              Fast Delivery
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Quick delivery right to your doorstep.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-xl">
              🔒
            </div>
            <h3 className="mt-4 font-bold text-gray-900">
              Secure Shopping
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Safe and secure shopping experience.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-xl">
              ↩️
            </div>
            <h3 className="mt-4 font-bold text-gray-900">
              Easy Returns
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Simple and hassle-free returns.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-xl">
              💬
            </div>
            <h3 className="mt-4 font-bold text-gray-900">
              Customer Support
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              We're here whenever you need help.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}

export default Categories;