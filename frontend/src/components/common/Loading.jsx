import { motion } from 'motion/react'
import { HiOutlineShoppingBag } from 'react-icons/hi2'

const Loading = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-linear-to-br from-cyan-50 via-sky-100 to-blue-100">
      {/* Background Blur */}
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-cyan-400/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative flex flex-col items-center">
        {/* Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-cyan-200 border-t-cyan-600"
        >
          {/* Shopping Bag */}

          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, -8, 8, 0]
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity
            }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 text-white shadow-xl"
          >
            <HiOutlineShoppingBag size={34} />
          </motion.div>
        </motion.div>

        {/* Text */}

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6
          }}
          className="mt-8 text-3xl font-black text-gray-800"
        >
          MyStore
        </motion.h2>

        <p className="mt-2 text-gray-600">Loading amazing products...</p>

        {/* Animated Dots */}

        <div className="mt-6 flex gap-2">
          {[0, 1, 2].map(item => (
            <motion.span
              key={item}
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: item * 0.2
              }}
              className="h-3 w-3 rounded-full bg-cyan-600"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading
