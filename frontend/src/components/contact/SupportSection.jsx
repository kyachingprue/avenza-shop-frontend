import { motion } from 'motion/react'
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
                duration: 0.02,
                delay: index * 0
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
        transition={{
        duration: 0.9,
        delay: 0.2,
        ease: "easeOut",
        }}
        viewport={{ once: true }}
        className="group relative mt-20 rounded-3xl p-0.5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20"
       >
      {/* Animated gradient border */}
       <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-amber-400 via-orange-500 to-amber-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* CTA Content */}
      <div className="relative overflow-hidden rounded-[22px] bg-linear-to-r from-sky-100 to-blue-200 p-10 text-black transition-all duration-500 group-hover:from-sky-50 group-hover:to-blue-100 lg:p-14">

       {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-amber-300/30" />

        <div className="relative flex flex-col items-center justify-between gap-8 lg:flex-row">
         <div>
          <h3 className="text-3xl font-bold transition-colors duration-300 group-hover:text-sky-900">
          Need Immediate Assistance?
          </h3>

          <p className="mt-4 max-w-2xl leading-8 text-sky-800">
          Our customer care specialists are ready to answer your
          questions, resolve issues, and help you shop with confidence.
          </p>
         </div>

          <div className="flex flex-wrap gap-4">
           <motion.button
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-sky-700 shadow-sm transition-all duration-300 hover:bg-sky-700 hover:text-white hover:shadow-lg hover:shadow-sky-700/25"
           >
          <FaComments className="transition-transform duration-300 group-hover:rotate-6" />
          Live Chat
          </motion.button>

         <motion.button
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="group/faq flex items-center gap-2 rounded-xl border border-sky-300 bg-transparent px-7 py-4 font-semibold text-gray-700 transition-all duration-300 hover:border-sky-700 hover:bg-white hover:text-sky-700 hover:shadow-lg hover:shadow-sky-700/10"
         >
         <FaQuestionCircle />
          FAQ Center
          <FaArrowRight className="transition-transform duration-300 group-hover/faq:translate-x-1" />
          </motion.button>
         </div>
         </div>
        </div>
       </motion.div>
      </div>
    </section>
  )
}

export default SupportSection
