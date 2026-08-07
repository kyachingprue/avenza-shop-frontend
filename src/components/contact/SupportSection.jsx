import LocomotiveScroll from 'locomotive-scroll'
import { motion } from 'motion/react'
import { useEffect } from 'react'
import {
  FaHeadset,
  FaComments,
  FaBoxOpen,
  FaUndoAlt,
  FaQuestionCircle,
  FaArrowRight
} from 'react-icons/fa'

const supportData = [
  {
    id: 1,
    icon: <FaHeadset />,
    title: '24/7 Customer Support',
    description:
      'Our dedicated support team is available anytime to assist with your shopping experience.'
  },
  {
    id: 2,
    icon: <FaComments />,
    title: 'Live Chat',
    description:
      'Get instant answers from our support specialists through live chat.'
  },
  {
    id: 3,
    icon: <FaBoxOpen />,
    title: 'Track Your Orders',
    description:
      'Monitor your order status and delivery progress with real-time updates.'
  },
  {
    id: 4,
    icon: <FaUndoAlt />,
    title: 'Easy Returns',
    description:
      'Not satisfied? Return eligible products quickly with our hassle-free return policy.'
  }
]

const SupportSection = () => {
   useEffect(() => {
     const locomotiveScroll = new LocomotiveScroll()

     return () => {
       locomotiveScroll.destroy()
     }
   }, [])
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto w-11/12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="font-semibold uppercase tracking-[4px] text-sky-600">
            Customer Support
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
            We're Here Whenever You Need Help
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            From placing your first order to tracking deliveries and processing
            returns, our support team is always ready to help.
          </p>
        </motion.div>

        {/* Support Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {supportData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8
              }}
              className="rounded-3xl bg-white p-8 shadow-lg transition"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-3xl text-sky-600">
                {item.icon}
              </div>

              <h3 className="mb-4 text-xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="leading-7 text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 overflow-hidden rounded-3xl bg-linear-to-r from-sky-600 to-blue-700 p-10 text-white lg:p-14"
        >
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div>
              <h3 className="text-3xl font-bold">Need Immediate Assistance?</h3>

              <p className="mt-4 max-w-2xl text-sky-100 leading-8">
                Our customer care specialists are ready to answer your
                questions, resolve issues, and help you shop with confidence.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-sky-700 transition"
              >
                <FaComments />
                Live Chat
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-xl border border-white px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-sky-700"
              >
                <FaQuestionCircle />
                FAQ Center
                <FaArrowRight />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SupportSection
