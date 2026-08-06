import LocomotiveScroll from 'locomotive-scroll'
import { motion } from 'motion/react'
import { useEffect } from 'react'
import {
  FaEnvelope,
  FaLocationDot,
  FaPhone,
  FaPaperPlane
} from 'react-icons/fa6'

const contactInfo = [
  {
    id: 1,
    icon: <FaLocationDot />,
    title: 'Our Location',
    description: 'Chattogram, Bangladesh'
  },
  {
    id: 2,
    icon: <FaPhone />,
    title: 'Phone Number',
    description: '+880 1234-567890'
  },
  {
    id: 3,
    icon: <FaEnvelope />,
    title: 'Email Address',
    description: 'support@shopmart.com'
  }
]

const ContactSection = () => {
   useEffect(() => {
     const locomotiveScroll = new LocomotiveScroll()

     return () => {
       locomotiveScroll.destroy()
     }
   }, [])
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="font-semibold uppercase tracking-[4px] text-sky-600">
            Contact Us
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
            We'd Love To Hear From You
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Have a question about an order, product, or partnership? Send us a
            message and our team will get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900">
              Let's Start a Conversation
            </h3>

            <p className="mt-5 leading-8 text-gray-600">
              Whether you need help with your purchase, product information, or
              shipping updates, our support team is always here to assist you.
            </p>

            <div className="mt-10 space-y-6">
              {contactInfo.map(item => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center border border-gray-400 gap-5 rounded-2xl bg-white p-6 shadow-lg"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-2xl text-sky-600">
                    {item.icon}
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h4>

                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side Form */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-white p-8 border border-gray-400 shadow-xl"
          >
            <h3 className="mb-8 text-3xl font-bold text-gray-900">
              Send Message
            </h3>

            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-xl border border-gray-300 p-4 outline-none transition focus:border-sky-500"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-xl border border-gray-300 p-4 outline-none transition focus:border-sky-500"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-sky-500"
              />

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full resize-none rounded-xl border border-gray-300 p-4 outline-none transition focus:border-sky-500"
              ></textarea>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-3 rounded-xl bg-sky-600 px-8 py-4 font-semibold text-white transition hover:bg-sky-700"
              >
                Send Message
                <FaPaperPlane />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
