import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const images = {
  Smartphones:
    'https://i.ibb.co.com/d43jJJ8z/smartphones-display-variety-stockcake.jpg',

  Headphones:
    'https://i.ibb.co.com/hRXdB4Q1/premium-photo-1679513691474-73102089c117.avif',

  Laptops: 'https://i.ibb.co.com/20SK2JMN/bestmobilelaptops.jpg',

  'Smart Watches':
    'https://i.ibb.co.com/hRCkS3hm/ai-generated-innovative-smart-watch-mockup-for-tech-marketing-ai-generated-photo.jpg',

  Accessories: 'https://i.ibb.co.com/BH9Q8Gvk/images.jpg',

  Cameras: 'https://i.ibb.co.com/JRNcMJYw/images-1.jpg',

  Shoes:
    'https://i.ibb.co.com/nqRR4r81/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image-14112954.png',

  Fashion:
    'https://i.ibb.co.com/ycLm3MwP/outdoor-fashion-portrait-glamour-sensual-young-stylish-woman-wearing-trendy-fall-outfit-black-hat-gr.avif',

  Speakers:
    'https://i.ibb.co.com/zT2LY3hp/portablebluetoothspeakers-2048px-9498-3x2-1.jpg',

  Gaming:
    'https://i.ibb.co.com/KzyVwmNd/young-gamer-having-fun-with-action-video-games-competition-playing-online-game-championship-caucasia.avif',

  'Home Appliances':
    'https://i.ibb.co.com/V01VPnSK/home-appliances-as-gift-group-white-refrigerator-washing-ma-home-appliances-as-gift-group-white-refr.png',

  Kitchen:
    'https://i.ibb.co.com/ZpwHB6xH/white-kitchen-tile-floor-663e73179c3c4.avif',

  Television:
    'https://i.ibb.co.com/9kTHbRbM/e37b612a54b87aef8ec42e354af14782.jpg',

  Tablets: 'https://i.ibb.co.com/sphJH4qN/images-2.jpg',

  Drones: 'https://i.ibb.co.com/7dhqr9M9/drone-medium.jpg'
}

const CategoryCard = ({ category }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
      delay: 2,
      offset: 100
    })
  }, [])
  return (
    <div
      data-aos="fade-up"
      className="group relative overflow-hidden rounded-3xl shadow-lg"
    >
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-gray-300"></div>
      )}

      <img
        src={images[category]}
        alt={category}
        loading="lazy"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        className={`h-72 w-full object-cover transition-opacity duration-500 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 w-full p-6">
        <h3 className="text-2xl font-bold text-white">{category}</h3>

        <button className="mt-4 rounded-full bg-sky-500 px-5 py-2 text-white transition hover:bg-sky-600">
          Shop Now
        </button>
      </div>
    </div>
  )
}

export default CategoryCard
