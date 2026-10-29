import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    product: 'Everyday essentials',
    initials: 'SJ',
    tone: 'from-cyan-500 to-blue-600',
    review: 'Finding what I needed was simple, and everything arrived just as described. The whole experience felt smooth from browsing to delivery.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    product: 'Wireless headphones',
    initials: 'MC',
    tone: 'from-violet-500 to-indigo-600',
    review: 'The product details made it easy to compare my options. I found a great pair of headphones without spending ages searching.'
  },
  {
    id: 3,
    name: 'Amara Williams',
    product: 'Home & lifestyle',
    initials: 'AW',
    tone: 'from-rose-500 to-orange-500',
    review: 'I love how easy it is to explore different categories. Checkout was straightforward, and I’m already browsing for my next find.'
  },
  {
    id: 4,
    name: 'Daniel Rivera',
    product: 'Tech accessories',
    initials: 'DR',
    tone: 'from-emerald-500 to-teal-600',
    review: 'Clear product information and a clean shopping experience made choosing the right accessory so much easier.'
  },
  {
    id: 5,
    name: 'Priya Patel',
    product: 'Style & accessories',
    initials: 'PP',
    tone: 'from-fuchsia-500 to-purple-600',
    review: 'The site is easy to navigate on my phone, and I found exactly what I was looking for in just a few minutes.'
  },
  {
    id: 6,
    name: 'Noah Thompson',
    product: 'Smart home',
    initials: 'NT',
    tone: 'from-amber-500 to-orange-600',
    review: 'A refreshing way to shop online. The category browsing and product pages gave me the details I needed to decide.'
  }
]

export default function Testimonials() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-12 -z-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-[100px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-blue-600/20 blur-[110px]" />

      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="mb-10 flex flex-col gap-7 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-cyan-300" />
              The Avenza experience
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              A little love from
              <span className="block bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400 bg-clip-text text-transparent">our customers</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Discover what shoppers enjoy about finding their next favorite thing at Avenza.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous customer reviews"
              className="testimonials-prev grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5 text-xl text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10 hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              aria-label="Next customer reviews"
              className="testimonials-next grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5 text-xl text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10 hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: '.testimonials-prev',
            nextEl: '.testimonials-next'
          }}
          pagination={{ clickable: true }}
          spaceBetween={18}
          slidesPerView={1.08}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 22 },
            1024: { slidesPerView: 3, spaceBetween: 24 }
          }}
          className="testimonials-swiper !pb-14"
        >
          {testimonials.map(item => (
            <SwiperSlide key={item.id} className="!h-auto">
              <article className="group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.09] sm:p-7">
                <div aria-hidden="true" className="absolute right-5 top-2 font-serif text-7xl leading-none text-cyan-300/15 transition group-hover:text-cyan-300/25">“</div>

                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex gap-1 text-amber-300" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index} aria-hidden="true">★</span>
                    ))}
                  </div>
                  <span className="rounded-full border border-emerald-300/15 bg-emerald-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                    Customer story
                  </span>
                </div>

                <blockquote className="relative mt-7 flex-1 text-[15px] leading-7 text-slate-200">
                  “{item.review}”
                </blockquote>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${item.tone} text-sm font-black text-white shadow-lg ring-2 ring-white/10`}>
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-white">{item.name}</p>
                      <p className="mt-1 truncate text-xs text-slate-400">{item.product}</p>
                    </div>
                    <span aria-hidden="true" className="ml-auto text-cyan-300/70">✦</span>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .testimonials-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: rgb(148 163 184);
          opacity: 0.6;
          transition: width 180ms ease, background-color 180ms ease, opacity 180ms ease;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 999px;
          background: rgb(103 232 249);
          opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonials-swiper .swiper-pagination-bullet {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
