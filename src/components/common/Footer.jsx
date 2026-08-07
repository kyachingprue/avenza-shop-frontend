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
import LocomotiveScroll from 'locomotive-scroll'

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

   useEffect(() => {
     const locomotiveScroll = new LocomotiveScroll()

     return () => {
       locomotiveScroll.destroy()
     }
   }, [])
  return (
    <footer className="mt-24">
      {/* Top Section */}

      <div className="bg-linear-to-r from-cyan-600 via-sky-600 to-blue-700">
        <div className="w-11/12 mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo */}

              <h2 className="text-4xl font-black text-white">
                My
                <span className="text-cyan-200">Store</span>
              </h2>

              <p className="text-cyan-100 leading-8 mt-6 max-w-xl">
                Discover premium products at unbeatable prices. From electronics
                and fashion to home essentials, MyStore delivers quality, fast
                shipping, and secure shopping—all in one place.
              </p>

              {/* Social */}

              <div className="flex flex-wrap gap-4 mt-8">
                {[
                  FaFacebookF,
                  FaInstagram,
                  FaXTwitter,
                  FaLinkedinIn,
                  FaYoutube
                ].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{
                      scale: 1.15,
                      rotate: 5
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-lg flex items-center justify-center text-white text-xl hover:bg-white hover:text-cyan-600 transition-all duration-300"
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
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
            >
              <h3 className="text-3xl font-bold text-white">
                Subscribe Newsletter
              </h3>

              <p className="text-cyan-100 mt-3 leading-7">
                Get exclusive discounts, flash sales, and the latest product
                updates delivered directly to your inbox.
              </p>

              {/* Form */}

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 h-14 rounded-xl px-5 outline-none bg-white
                  text-gray-700"
                />

                <motion.button
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}
                  className="h-14 px-8 rounded-xl bg-white text-cyan-700 font-semibold flex items-center justify-center gap-2 hover:bg-cyan-100 transition"
                >
                  Subscribe
                  <HiOutlinePaperAirplane size={22} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="bg-slate-950">
        <div className="w-11/12 mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Quick Links */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Quick Links
              </h3>

              <ul className="space-y-4">
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
                      className="text-gray-400 hover:text-cyan-400 hover:translate-x-2 duration-300 inline-flex transition-all"
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
              <ul className="space-y-4">
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
                      className="text-gray-400 hover:text-cyan-400 hover:translate-x-2 duration-300 inline-flex transition-all"
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

              <ul className="space-y-4">
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
                      className="text-gray-400 hover:text-cyan-400 hover:translate-x-2 duration-300 inline-flex transition-all"
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
              <ul className="space-y-4">
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
                      className=" text-gray-400 hover:text-cyan-400 hover:translate-x-2 duration-300 inline-flex transition-all"
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
      <div className="bg-slate-900 border-t border-slate-800">
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
                    <p className="text-gray-400 mt-1">Chattogram, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <HiOutlinePhone className="text-cyan-400" size={24} />
                  </div>

                  <div>
                    <h4 className="text-white font-semibold">Phone</h4>
                    <p className="text-gray-400 mt-1">+880 1234-567890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <HiOutlineEnvelope className="text-cyan-400" size={24} />
                  </div>

                  <div>
                    <h4 className="text-white font-semibold">Email</h4>
                    <p className="text-gray-400 mt-1">support@mystore.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <HiOutlineClock className="text-cyan-400" size={24} />
                  </div>

                  <div>
                    <h4 className="text-white font-semibold">Business Hours</h4>

                    <p className="text-gray-400 mt-1">
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

                    <p className="text-gray-400">
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
                    <p className="text-gray-400">
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
                    <p className="text-gray-400">
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
                      className=" w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-4xl text-white cursor-pointer"
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
      <div className="bg-black border-t border-slate-800">
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
              <p className="text-gray-400 text-sm leading-7">
                © {new Date().getFullYear()}{' '}
                <span className="font-semibold text-white">MyStore</span>. All
                Rights Reserved.
              </p>

              <p className="flex flex-wrap justify-center lg:justify-start items-center gap-2 mt-2 text-sm text-gray-500">
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
              <select className=" bg-slate-900 border border-slate-700 text-gray-300 rounded-lg px-4 py-2 outline-none hover:border-cyan-500 transition">
                <option>🌐 English</option>
                <option>🇧🇩 বাংলা</option>
              </select>

              <select className=" bg-slate-900 border border-slate-700 text-gray-300 rounded-lg px-4 py-2 outline-none hover:border-cyan-500 transition">
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
