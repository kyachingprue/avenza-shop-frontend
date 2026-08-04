import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="relative h-175 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/Mxx1f0mf/c-d-x-PDX-a-82obo-unsplash.jpg?w=1800')"
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-12">
              <div className="max-w-xl text-white">
                <span className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium">
                  New Arrival 2026
                </span>

                <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">
                  Everything You Need,
                  <span className="block text-sky-400">All In One Store</span>
                </h1>

                <p className="mt-6 text-lg text-gray-200">
                  Shop the latest electronics, fashion, accessories, home
                  essentials, and more with premium quality, secure payment, and
                  fast delivery.
                </p>

                {/* Features */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div>✓ Premium Electronics</div>
                  <div>✓ Fashion Collection</div>
                  <div>✓ Fast Delivery</div>
                  <div>✓ Secure Checkout</div>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex gap-4">
                  <button className="rounded-lg bg-sky-500 px-8 py-3 font-semibold transition hover:bg-sky-600">
                    Shop Now
                  </button>

                  <button className="rounded-lg border border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-black">
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative h-175 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/Mxt6nkWg/sebastian-bednarek-Lxcn2wr-M6-UY-unsplash.jpg?w=1800')"
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-12">
              <div className="max-w-xl text-white">
                <span className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium">
                  New Arrival 2026
                </span>

                <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">
                  Everything You Need,
                  <span className="block text-sky-400">All In One Store</span>
                </h1>

                <p className="mt-6 text-lg text-gray-200">
                  Shop the latest electronics, fashion, accessories, home
                  essentials, and more with premium quality, secure payment, and
                  fast delivery.
                </p>

                {/* Features */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div>✓ Premium Electronics</div>
                  <div>✓ Fashion Collection</div>
                  <div>✓ Fast Delivery</div>
                  <div>✓ Secure Checkout</div>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex gap-4">
                  <button className="rounded-lg bg-sky-500 px-8 py-3 font-semibold transition hover:bg-sky-600">
                    Shop Now
                  </button>

                  <button className="rounded-lg border border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-black">
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative h-175 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/MxhghPr7/clark-street-mercantile-qn-Kh-ZJPKFD8-unsplash.jpg')"
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/55"></div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-12">
              <div className="max-w-xl text-white">
                <span className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium">
                  New Arrival 2026
                </span>

                <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">
                  Everything You Need,
                  <span className="block text-sky-400">All In One Store</span>
                </h1>

                <p className="mt-6 text-lg text-gray-200">
                  Shop the latest electronics, fashion, accessories, home
                  essentials, and more with premium quality, secure payment, and
                  fast delivery.
                </p>

                {/* Features */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div>✓ Premium Electronics</div>
                  <div>✓ Fashion Collection</div>
                  <div>✓ Fast Delivery</div>
                  <div>✓ Secure Checkout</div>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex gap-4">
                  <button className="rounded-lg bg-sky-500 px-8 py-3 font-semibold transition hover:bg-sky-600">
                    Shop Now
                  </button>

                  <button className="rounded-lg border border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-black">
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative h-175 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/k2t2cm4b/christopher-gower-m-HRf-Lhg-ABo-unsplash.jpg?w=1800')"
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/55"></div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-12">
              <div className="max-w-xl text-white">
                <span className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium">
                  New Arrival 2026
                </span>

                <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">
                  Everything You Need,
                  <span className="block text-sky-400">All In One Store</span>
                </h1>

                <p className="mt-6 text-lg text-gray-200">
                  Shop the latest electronics, fashion, accessories, home
                  essentials, and more with premium quality, secure payment, and
                  fast delivery.
                </p>

                {/* Features */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div>✓ Premium Electronics</div>
                  <div>✓ Fashion Collection</div>
                  <div>✓ Fast Delivery</div>
                  <div>✓ Secure Checkout</div>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex gap-4">
                  <button className="rounded-lg bg-sky-500 px-8 py-3 font-semibold transition hover:bg-sky-600">
                    Shop Now
                  </button>

                  <button className="rounded-lg border border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-black">
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative h-175 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/Q7fC0NsC/daria-nepriakhina-XR5rkpr-HQU-unsplash.jpg?w=1800')"
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-12">
              <div className="max-w-xl text-white">
                <span className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium">
                  New Arrival 2026
                </span>

                <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">
                  Everything You Need,
                  <span className="block text-sky-400">All In One Store</span>
                </h1>

                <p className="mt-6 text-lg text-gray-200">
                  Shop the latest electronics, fashion, accessories, home
                  essentials, and more with premium quality, secure payment, and
                  fast delivery.
                </p>

                {/* Features */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div>✓ Premium Electronics</div>
                  <div>✓ Fashion Collection</div>
                  <div>✓ Fast Delivery</div>
                  <div>✓ Secure Checkout</div>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex gap-4">
                  <button className="rounded-lg bg-sky-500 px-8 py-3 font-semibold transition hover:bg-sky-600">
                    Shop Now
                  </button>

                  <button className="rounded-lg border border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-black">
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative h-175 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/r2rz9wZS/rachit-tank-2c-FZ-FB08-UM-unsplash.jpg?w=1800')"
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-12">
              <div className="max-w-xl text-white">
                <span className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium">
                  New Arrival 2026
                </span>

                <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">
                  Everything You Need,
                  <span className="block text-sky-400">All In One Store</span>
                </h1>

                <p className="mt-6 text-lg text-gray-200">
                  Shop the latest electronics, fashion, accessories, home
                  essentials, and more with premium quality, secure payment, and
                  fast delivery.
                </p>

                {/* Features */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div>✓ Premium Electronics</div>
                  <div>✓ Fashion Collection</div>
                  <div>✓ Fast Delivery</div>
                  <div>✓ Secure Checkout</div>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex gap-4">
                  <button className="rounded-lg bg-sky-500 px-8 py-3 font-semibold transition hover:bg-sky-600">
                    Shop Now
                  </button>

                  <button className="rounded-lg border border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-black">
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative h-175 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/C5sFddBD/daniel-storek-JM-q-KEd1-GMI-unsplash.jpg?w=1800')"
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-12">
              <div className="max-w-xl text-white">
                <span className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium">
                  New Arrival 2026
                </span>

                <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">
                  Everything You Need,
                  <span className="block text-sky-400">All In One Store</span>
                </h1>

                <p className="mt-6 text-lg text-gray-200">
                  Shop the latest electronics, fashion, accessories, home
                  essentials, and more with premium quality, secure payment, and
                  fast delivery.
                </p>

                {/* Features */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div>✓ Premium Electronics</div>
                  <div>✓ Fashion Collection</div>
                  <div>✓ Fast Delivery</div>
                  <div>✓ Secure Checkout</div>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex gap-4">
                  <button className="rounded-lg bg-sky-500 px-8 py-3 font-semibold transition hover:bg-sky-600">
                    Shop Now
                  </button>

                  <button className="rounded-lg border border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-black">
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative h-175 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/xtXLkHW9/harper-sunday-5ad-Pow-Uq-h0-unsplash.jpg?w=1800')"
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-12">
              <div className="max-w-xl text-white">
                <span className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium">
                  New Arrival 2026
                </span>

                <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">
                  Everything You Need,
                  <span className="block text-sky-400">All In One Store</span>
                </h1>

                <p className="mt-6 text-lg text-gray-200">
                  Shop the latest electronics, fashion, accessories, home
                  essentials, and more with premium quality, secure payment, and
                  fast delivery.
                </p>

                {/* Features */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div>✓ Premium Electronics</div>
                  <div>✓ Fashion Collection</div>
                  <div>✓ Fast Delivery</div>
                  <div>✓ Secure Checkout</div>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex gap-4">
                  <button className="rounded-lg bg-sky-500 px-8 py-3 font-semibold transition hover:bg-sky-600">
                    Shop Now
                  </button>

                  <button className="rounded-lg border border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-black">
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative h-175 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/9HTLMN2v/daniel-romero-Ag-LMrojqj-AM-unsplash.jpg?w=1800')"
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-12">
              <div className="max-w-xl text-white">
                <span className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium">
                  New Arrival 2026
                </span>

                <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">
                  Everything You Need,
                  <span className="block text-sky-400">All In One Store</span>
                </h1>

                <p className="mt-6 text-lg text-gray-200">
                  Shop the latest electronics, fashion, accessories, home
                  essentials, and more with premium quality, secure payment, and
                  fast delivery.
                </p>

                {/* Features */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div>✓ Premium Electronics</div>
                  <div>✓ Fashion Collection</div>
                  <div>✓ Fast Delivery</div>
                  <div>✓ Secure Checkout</div>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex gap-4">
                  <button className="rounded-lg bg-sky-500 px-8 py-3 font-semibold transition hover:bg-sky-600">
                    Shop Now
                  </button>

                  <button className="rounded-lg border border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-black">
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default Banner
