import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import {
  FaStar,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa6";
import LocomotiveScroll from "locomotive-scroll";

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/products.json')
        const data = await response.json()
        const singleProduct = data.find(item => item.id === Number(id))
        setProduct(singleProduct)
        if (singleProduct) {
          setSelectedImage(singleProduct.thumbnail)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchProduct()
  }, [id])

   useEffect(() => {
     const locomotiveScroll = new LocomotiveScroll()

     return () => {
       locomotiveScroll.destroy()
     }
   }, [])

  const handleBack = () => {
    navigate(-1)
  }

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center text-3xl font-bold">
        Product Not Found
      </div>
    )
  }
  return (
    <main className="bg-linear-to-r from-blue-50 to-white">
      <section className="max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto px-5 pt-20 pb-10">
        <div className="mt-4">
          <button
            onClick={handleBack}
            className="mb-5 flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700 transition"
          >
            <FaArrowLeft /> Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT */}

          <div>
            {/* Main Image */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-137.5 object-cover"
              />
            </div>

            {/* Gallery */}

            <div className="grid grid-cols-4 gap-4 mt-5">
              {[product.thumbnail, ...product.images].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  onClick={() => setSelectedImage(image)}
                  className={`h-28 w-full object-cover rounded-xl cursor-pointer border-4 transition
                ${
                  selectedImage === image
                    ? 'border-cyan-500'
                    : 'border-gray-200'
                }`}
                />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-2xl md:mt-10"
            >
              {/* Background Image */}
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=80"
                alt="Advertisement"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-cyan-900/90 via-sky-800/70 to-blue-700/50" />

              {/* Content */}
              <div className="relative z-10 flex h-72 flex-col justify-between p-8">
                <div>
                  <span className="inline-block rounded-full bg-red-500 px-4 py-1 text-xs font-bold uppercase text-white">
                    Up to 40% OFF
                  </span>

                  <h2 className="mt-4 text-3xl font-black text-white">
                    Summer Sale
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-cyan-100">
                    Save big on electronics, accessories, headphones, gaming and
                    more.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-cyan-100">Limited Time Offer</p>

                    <h3 className="text-2xl font-bold text-white">
                      Shop Today
                    </h3>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-cyan-600 shadow-lg"
                  >
                    <GoArrowRight className="text-xl" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
          {/* RIGHT */}

          <div>
            <span className="rounded-full bg-cyan-100 px-4 py-2 text-cyan-700 font-semibold">
              {product.category}
            </span>

            <h1 className="mt-5 text-5xl font-black">{product.name}</h1>

            <p className="mt-4 text-lg text-gray-500">
              Brand:
              <span className="font-semibold text-black ml-2">
                {product.brand}
              </span>
            </p>

            <div className="mt-6 flex items-center gap-3">
              <FaStar className="text-yellow-500" />

              <span className="font-semibold">{product.rating}</span>

              <span className="text-gray-500">({product.reviews} Reviews)</span>
            </div>

            <div className="mt-8 flex items-center gap-5">
              <h2 className="text-5xl font-black text-cyan-600">
                ${product.price}
              </h2>

              <del className="text-2xl text-gray-400">${product.oldPrice}</del>

              <span className="rounded bg-red-500 px-3 py-1 text-white">
                -{product.discount}%
              </span>
            </div>

            <p className="mt-8 leading-8 text-gray-600">
              {product.description}
            </p>
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-4">Features</h3>

              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500" />

                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-4">Specifications</h3>

              <div className="rounded-xl border border-gray-400">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b border-gray-400 p-4 last:border-none"
                  >
                    <span className="font-semibold">{key}</span>

                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 space-y-3">
              <p>
                SKU :<span className="font-semibold ml-2">{product.sku}</span>
              </p>

              <p>
                Stock :
                <span className="ml-2 text-green-600 font-bold">
                  {product.stock}
                </span>
              </p>

              {product.freeShipping && (
                <div className="flex items-center gap-2 text-cyan-600">
                  <FaTruck />

                  <span>Free Shipping Available</span>
                </div>
              )}
            </div>
            <div className="mt-12 flex gap-5">
              <button className="flex-1 rounded-xl bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 py-4 text-xl font-bold text-white hover:scale-105 transition">
                Add To Cart
              </button>

              <button className="flex-1 rounded-xl border-2 border-cyan-500 py-4 text-xl font-bold text-cyan-600 hover:bg-cyan-500 hover:text-white transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductDetails
