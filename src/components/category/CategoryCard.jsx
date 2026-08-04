import { useState } from "react"

const images = {
  Smartphones:
    'https://i.ibb.co.com/qYVr1x5d/kuaileqie-re-Nv-M9-V3m-Lr-Ks-unsplash.jpg',

  Headphones:
    'https://i.ibb.co.com/4gwjhtQh/kiran-ck-RZmi-DOpv1l-M-unsplash.jpg',

  Laptops: 'https://i.ibb.co.com/6RPmpChg/dell-Gi3i-UJ1-Fwx-I-unsplash.jpg',

  'Smart Watches':
    'https://i.ibb.co.com/tps1qR2G/indra-projects-Xq-CPROi-O7-Fw-unsplash.jpg',

  Accessories:
    'https://i.ibb.co.com/YTWqw7PK/faizur-rehman-iwd-99q-V7-Uk-unsplash.jpg',

  Cameras:
    'https://i.ibb.co.com/DhpSPZH/christian-wiediger-g-Vb-OF8md-E3-U-unsplash.jpg',

  Shoes: 'https://i.ibb.co.com/Q7vw0VTS/ryan-waring-164-6w-VEHf-I-unsplash.jpg',

  Fashion: 'https://i.ibb.co.com/7dCR7t5s/freestocks-3-Q3ts-J01nc-unsplash.jpg',

  Speakers:
    'https://i.ibb.co.com/VWFfW49J/habib-dadkhah-S0-B-pm-Gjd-VA-unsplash.jpg',

  Gaming:
    'https://i.ibb.co.com/1YJ9z30D/jeshoots-com-e-Cktz-Gj-C-i-U-unsplash.jpg',

  'Home Appliances':
    'https://i.ibb.co.com/xKm2ncGn/planetcare-23co-Wmk-TNSg-unsplash.jpg',

  Kitchen: 'https://i.ibb.co.com/VccD7kYD/cat-han-Vgy-N-CWXQVM-unsplash.jpg',

  Television:
    'https://i.ibb.co.com/Vp36NDmy/jens-kreuter-ng-Mts-E5r9e-I-unsplash.jpg',

  Tablets:
    'https://i.ibb.co.com/S7RGrDD5/myriam-zilles-Klto-LK6-Mk-g-unsplash.jpg',

  Drones: 'https://i.ibb.co.com/pBC9hZ4F/iewek-gnos-Zlk-Rrz-Jl20-Q-unsplash.jpg'
}

const CategoryCard = ({ category }) => {
   const [loading, setLoading] = useState(true)
  return (
    <div className="group relative overflow-hidden rounded-3xl shadow-lg">
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
