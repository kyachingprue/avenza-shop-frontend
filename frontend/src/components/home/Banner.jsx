import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slides = [
  {
    eyebrow: 'A better way to shop',
    title: 'Find your next',
    accent: 'favorite thing.',
    description: 'Explore thoughtful finds for work, home and everywhere in between—all in one place.',
    image: 'https://i.ibb.co.com/Mxx1f0mf/c-d-x-PDX-a-82obo-unsplash.jpg?w=1800',
    imageAlt: 'Modern workspace with a laptop',
    category: 'Smartphones',
    categoryLabel: 'Tech worth discovering',
    number: '01'
  },
  {
    eyebrow: 'Made for everyday moments',
    title: 'A little more',
    accent: 'you, every day.',
    description: 'Refresh your everyday style with comfortable, considered picks made for wherever life takes you.',
    image: 'https://i.ibb.co.com/MxhghPr7/clark-street-mercantile-qn-Kh-ZJPKFD8-unsplash.jpg',
    imageAlt: 'A curated fashion collection',
    category: 'Fashion',
    categoryLabel: 'Your style, your way',
    number: '02'
  },
  {
    eyebrow: 'Make room for good ideas',
    title: 'Small upgrades,',
    accent: 'big difference.',
    description: 'Discover clever home and lifestyle essentials that make your spaces feel a little more like you.',
    image: 'https://i.ibb.co.com/Mxt6nkWg/sebastian-bednarek-Lxcn2wr-M6-UY-unsplash.jpg?w=1800',
    imageAlt: 'A bright, thoughtfully styled living space',
    category: 'Home Appliances',
    categoryLabel: 'Make yourself at home',
    number: '03'
  }
]

export default function Banner() {
  return (
    <section aria-label="Featured collections" className="mx-auto w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false }}
        loop
        navigation
        pagination={{ clickable: true }}
        speed={650}
        className="home-hero overflow-hidden shadow-2xl shadow-slate-950/15"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.number}>
            <article className="relative isolate flex min-h-142.5 items-center overflow-hidden bg-slate-950 text-white sm:min-h-147.5 lg:min-h-155">
              <img
                src={slide.image}
                alt={slide.imageAlt}
                className="absolute inset-0 -z-20 h-full w-full object-cover"
                fetchPriority={slide.number === '01' ? 'high' : 'auto'}
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-slate-950 via-slate-950/85 to-slate-950/15 sm:via-slate-950/70 sm:to-slate-950/20" />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-slate-950/50 via-transparent to-slate-950/10" />
              <div aria-hidden="true" className="absolute -left-28 -bottom-72 -z-10 h-120 w-120 rounded-full border border-white/10" />

              <div className="mx-auto grid w-full max-w-330 grid-cols-1 items-center gap-8 px-6 py-16 sm:px-10 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.65fr)] md:px-14 lg:gap-12 lg:px-20">
                <div className="max-w-2xl">
                  <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100 backdrop-blur-md sm:px-4 sm:text-xs">
                    <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
                    <span className="truncate">{slide.eyebrow}</span>
                  </span>

                  <h1 className="mt-6 max-w-[12ch] text-4xl font-black leading-[1.06] tracking-tight sm:mt-7 sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl">
                    {slide.title}
                    <span className="mt-1 block bg-linear-to-r from-cyan-200 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                      {slide.accent}
                    </span>
                  </h1>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
                    {slide.description}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4">
                    <Link
                      to={`/products?category=${encodeURIComponent(slide.category)}`}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:px-6"
                    >
                      Shop the collection
                      <span aria-hidden="true" className="text-lg">→</span>
                    </Link>
                    <Link
                      to="/products"
                      className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:border-white/60 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200 sm:px-6"
                    >
                      Explore all
                    </Link>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-200 sm:mt-10 sm:gap-x-7 sm:text-sm">
                    <span className="inline-flex items-center gap-2"><span className="text-cyan-300">✓</span> Curated finds</span>
                    <span className="inline-flex items-center gap-2"><span className="text-cyan-300">✓</span> Easy checkout</span>
                    <span className="inline-flex items-center gap-2"><span className="text-cyan-300">✓</span> Something for everyone</span>
                  </div>
                </div>

                <div className="hidden justify-self-end md:block">
                  <div className="relative w-56 rounded-3xl border border-white/25 bg-white/10 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl lg:w-72 lg:p-6">
                    <div aria-hidden="true" className="absolute -right-4 -top-4 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300 text-xl text-slate-950 shadow-lg shadow-cyan-950/30 lg:h-14 lg:w-14">
                      ✦
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100 lg:text-xs">Avenza picks</p>
                    <p className="mt-3 text-xl font-black leading-snug text-white lg:text-2xl">{slide.categoryLabel}</p>
                    <div className="my-5 h-px bg-white/20 lg:my-6" />
                    <div className="flex items-center justify-between gap-3 text-xs text-slate-200 lg:text-sm">
                      <span>Discover something new</span>
                      <span className="font-bold text-cyan-200">{slide.number} / 03</span>
                    </div>
                  </div>
                </div>
              </div>

              <span className="absolute bottom-5 right-6 hidden font-mono text-xs tracking-[0.2em] text-white/60 sm:block md:right-10 lg:bottom-7 lg:right-14">
                AVENZA / SHOP
              </span>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .home-hero .swiper-button-prev,
        .home-hero .swiper-button-next {
          top: auto;
          right: 24px;
          bottom: 24px;
          left: auto;
          z-index: 5;
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 1px solid rgb(255 255 255 / 28%);
          border-radius: 9999px;
          background: rgb(15 23 42 / 45%);
          color: white;
          backdrop-filter: blur(12px);
          transition: background-color 180ms ease, border-color 180ms ease;
        }
        .home-hero .swiper-button-prev { right: 74px; }
        .home-hero .swiper-button-prev:hover,
        .home-hero .swiper-button-next:hover {
          border-color: rgb(103 232 249 / 75%);
          background: rgb(8 145 178 / 75%);
        }
        .home-hero .swiper-button-prev::after,
        .home-hero .swiper-button-next::after {
          font-size: 13px;
          font-weight: 800;
        }
        .home-hero .swiper-pagination {
          right: auto !important;
          bottom: 36px !important;
          left: 24px !important;
          width: auto !important;
          text-align: left;
        }
        .home-hero .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          margin: 0 5px !important;
          background: white;
          opacity: 0.55;
          transition: width 180ms ease, opacity 180ms ease, background-color 180ms ease;
        }
        .home-hero .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 9999px;
          background: rgb(103 232 249);
          opacity: 1;
        }
        @media (min-width: 640px) {
          .home-hero .swiper-button-prev,
          .home-hero .swiper-button-next { right: 36px; bottom: 28px; }
          .home-hero .swiper-button-prev { right: 88px; }
          .home-hero .swiper-pagination { bottom: 43px !important; left: 36px !important; }
        }
        @media (max-width: 639px) {
          .home-hero .swiper-button-prev,
          .home-hero .swiper-button-next { display: none; }
          .home-hero .swiper-pagination { bottom: 25px !important; left: 19px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .home-hero .swiper-pagination-bullet,
          .home-hero .swiper-button-prev,
          .home-hero .swiper-button-next { transition: none; }
        }
      `}</style>
    </section>
  )
}
