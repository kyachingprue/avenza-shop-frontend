import { FaAward, FaHeadset, FaShippingFast, FaShieldAlt } from 'react-icons/fa'

const features = [
  {
    id: 1,
    icon: <FaShippingFast size={28} />,
    title: 'Fast Delivery',
    description:
      'Quick and reliable shipping with real-time order tracking across the country.'
  },
  {
    id: 2,
    icon: <FaShieldAlt size={28} />,
    title: 'Secure Payments',
    description:
      'Multiple trusted payment methods with advanced encryption for safe transactions.'
  },
  {
    id: 3,
    icon: <FaAward size={28} />,
    title: 'Premium Quality',
    description:
      'We carefully select authentic products from trusted brands and suppliers.'
  },
  {
    id: 4,
    icon: <FaHeadset size={28} />,
    title: '24/7 Support',
    description:
      'Our friendly support team is always ready to help before and after your purchase.'
  }
]

const AboutSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-[4px] text-sky-600">
            About Us
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
            Making Online Shopping
            <span className="text-sky-600"> Easy & Trusted</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            We believe everyone deserves access to high-quality products at
            affordable prices. Our mission is to provide a smooth, secure, and
            enjoyable shopping experience with thousands of products across
            electronics, fashion, accessories, home essentials, and more.
          </p>
        </div>

        {/* Main Section */}
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Image */}
          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000"
              alt="E-commerce"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900">
              Your Trusted Online Shopping Destination
            </h3>

            <p className="mt-6 text-gray-600 leading-8">
              Since our beginning, we've focused on delivering premium shopping
              experiences by combining quality products, competitive prices,
              fast shipping, and exceptional customer service. Whether you're
              shopping for the latest gadgets, stylish fashion, or everyday
              essentials, we've got everything in one place.
            </p>

            <p className="mt-5 text-gray-600 leading-8">
              Our growing community of happy customers inspires us to innovate
              every day and continuously improve our services.
            </p>

            {/* Statistics */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white p-6 shadow">
                <h3 className="text-4xl font-bold text-sky-600">50K+</h3>
                <p className="mt-2 text-gray-600">Happy Customers</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow">
                <h3 className="text-4xl font-bold text-sky-600">10K+</h3>
                <p className="mt-2 text-gray-600">Premium Products</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow">
                <h3 className="text-4xl font-bold text-sky-600">150+</h3>
                <p className="mt-2 text-gray-600">Trusted Brands</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow">
                <h3 className="text-4xl font-bold text-sky-600">99%</h3>
                <p className="mt-2 text-gray-600">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-24">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Why Shop With Us?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              We combine quality, affordability, and excellent customer service
              to deliver an outstanding shopping experience every time.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {features.map(feature => (
              <div
                key={feature.id}
                className="rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-5 inline-flex rounded-xl bg-sky-100 p-4 text-sky-600">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
