import { motion, AnimatePresence } from 'motion/react'
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineArrowPath
} from 'react-icons/hi2'

import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
  FaGooglePay
} from 'react-icons/fa'

import { HiArrowUp } from 'react-icons/hi2'
import { FaHeart } from 'react-icons/fa'

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter
} from 'react-icons/fa6'

import { HiOutlinePaperAirplane } from 'react-icons/hi2'
import { useEffect, useState } from 'react'

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <footer className="mt-16 sm:mt-20">
      {/* Top Section */}

      <div className="relative isolate overflow-hidden border-y border-white/10 bg-slate-900">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-0 -z-10 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-96 w-96 rounded-full bg-blue-500/15 blur-[110px]" />
        <div className="relative mx-auto w-11/12 px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo */}

              <h2 className="text-4xl font-black tracking-tight text-white">
                Avenza
                <span className="text-cyan-300"> SHOP</span>
              </h2>

              <p className="mt-6 max-w-xl leading-8 text-slate-300">
                Discover premium products at unbeatable prices. From electronics
                and fashion to home essentials, Avenza delivers quality, fast
                shipping, and secure shopping—all in one place.
              </p>

              {/* Social */}

              <div className="flex flex-wrap gap-4 mt-8">
                {[
                  [FaFacebookF, 'Facebook'],
                  [FaInstagram, 'Instagram'],
                  [FaXTwitter, 'X'],
                  [FaLinkedinIn, 'LinkedIn'],
                  [FaYoutube, 'YouTube']
                ].map(([Icon, network]) => (
                  <motion.a
                    key={network}
                    href="#"
                    aria-label={`Follow Avenza on ${network}`}
                    whileHover={{
                      scale: 1.15,
                      rotate: 5
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white text-xl text-white backdrop-blur-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-cyan-300 hover:text-slate-950"
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* RIGHT */}

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:p-8"
            >
              <h3 className="text-3xl font-bold text-white">
                Subscribe Newsletter
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                Get exclusive discounts, flash sales, and the latest product
                updates delivered directly to your inbox.
              </p>

              {/* Form */}

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-14 flex-1 rounded-xl border border-white/10 bg-slate-950/60 px-5 text-white outline-none placeholder:text-slate-400 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
                />

                <motion.button
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}
                  className="flex h-14 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-8 font-bold text-slate-950 transition hover:bg-cyan-200"
                >
                  Subscribe
                  <HiOutlinePaperAirplane size={22} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="bg-slate-900">
        <div className="w-11/12 mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Quick Links */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-6 text-2xl font-bold text-slate-100">
                Quick Links
              </h3>

              <ul className="space-y-4 text-gray-400">
                {[
                  'Home',
                  'Shop',
                  'About Us',
                  'Best Sellers',
                  'New Arrivals',
                  'Flash Sale',
                  'Blog',
                  'Contact Us'
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="inline-flex transition-all duration-300 hover:translate-x-1.5 hover:text-cyan-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Categories */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Categories</h3>
              <ul className="space-y-4 text-gray-400">
                {[
                  'Electronics',
                  'Smartphones',
                  'Laptops',
                  'Gaming',
                  'Fashion',
                  'Accessories',
                  'Home Appliances',
                  'Cameras'
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="inline-flex text-slate-300 transition-all duration-300 hover:translate-x-1.5 hover:text-cyan-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Customer Service */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Customer Service
              </h3>

              <ul className="space-y-4 text-gray-400">
                {[
                  'Help Center',
                  'Track Order',
                  'Shipping',
                  'Returns',
                  'Refund Policy',
                  'Terms & Conditions',
                  'Privacy Policy',
                  'FAQs'
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="inline-flex text-slate-300 transition-all duration-300 hover:translate-x-1.5 hover:text-cyan-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* My Account */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">My Account</h3>
              <ul className="space-y-4 text-gray-400">
                {[
                  'My Profile',
                  'My Orders',
                  'Wishlist',
                  'Shopping Cart',
                  'Checkout',
                  'Saved Items',
                  'Notifications',
                  'Account Settings'
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="inline-flex text-slate-300 transition-all duration-300 hover:translate-x-1.5 hover:text-cyan-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 bg-slate-900">
        <div className="w-11/12 mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact */}

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-8">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <HiOutlineMapPin className="text-cyan-400" size={24} />
                  </div>

                  <div>
                    <h4 className="text-white font-semibold">Office Address</h4>
                    <p className="mt-1 text-slate-300">Chattogram, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <HiOutlinePhone className="text-cyan-400" size={24} />
                  </div>

                  <div>
                    <h4 className="text-white font-semibold">Phone</h4>
                    <p className="mt-1 text-slate-300">+880 1234-567890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <HiOutlineEnvelope className="text-cyan-400" size={24} />
                  </div>

                  <div>
                    <h4 className="text-white font-semibold">Email</h4>
                    <p className="mt-1 text-slate-300">support@mystore.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <HiOutlineClock className="text-cyan-400" size={24} />
                  </div>

                  <div>
                    <h4 className="text-white font-semibold">Business Hours</h4>

                    <p className="mt-1 text-slate-300">
                      Mon - Sat : 9:00 AM - 9:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust & Payment */}

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-8">
                Why Shop With Us
              </h3>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <HiOutlineTruck className="text-cyan-400 mt-1" size={28} />

                  <div>
                    <h4 className="text-white font-semibold">Free Shipping</h4>

                    <p className="text-slate-300">
                      Free delivery on orders over $100.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <HiOutlineShieldCheck
                    className="text-cyan-400 mt-1"
                    size={28}
                  />

                  <div>
                    <h4 className="text-white font-semibold">
                      Secure Payments
                    </h4>
                    <p className="text-slate-300">
                      100% protected checkout with SSL encryption.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <HiOutlineArrowPath
                    className="text-cyan-400 mt-1"
                    size={28}
                  />

                  <div>
                    <h4 className="text-white font-semibold">Easy Returns</h4>
                    <p className="text-slate-300">
                      Hassle-free returns within 30 days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment */}

              <div className="mt-10">
                <h4 className="text-white text-xl font-semibold mb-5">
                  Accepted Payments
                </h4>

                <div className="flex flex-wrap gap-4">
                  {[
                    FaCcVisa,
                    FaCcMastercard,
                    FaCcPaypal,
                    FaCcApplePay,
                    FaGooglePay
                  ].map((Icon, index) => (
                    <motion.div
                      key={index}
                      whileHover={{
                        scale: 1.1,
                        y: -4
                      }}
                      className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-4xl text-slate-100 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
                    >
                      <Icon />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="w-11/12 mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Copyright */}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <p className="text-sm leading-7 text-slate-300">
                © {new Date().getFullYear()}{' '}
                <span className="font-semibold text-white">Avenza Shop</span>. All
                Rights Reserved.
              </p>

              <p className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-400 lg:justify-start">
                Built with
                <FaHeart className="text-red-500" />
                React, Tailwind CSS & Motion
              </p>
            </motion.div>

            {/* Language & Currency */}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <select className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-200 outline-none transition hover:border-cyan-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10">
                <option>🌐 English</option>
                <option>🇧🇩 বাংলা</option>
              </select>

              <select className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-200 outline-none transition hover:border-cyan-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10">
                <option>USD ($)</option>
                <option>BDT (৳)</option>
                <option>EUR (€)</option>
              </select>
            </motion.div>

            {/* Back To Top */}

            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    y: 50
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    y: 50
                  }}
                  transition={{
                    duration: 0.25
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -4
                  }}
                  whileTap={{
                    scale: 0.95
                  }}
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    })
                  }
                  className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 text-2xl text-white shadow-xl transition-all duration-300 hover:shadow-cyan-500/40"
                >
                  <HiArrowUp />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
