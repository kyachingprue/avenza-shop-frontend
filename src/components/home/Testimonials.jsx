import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'


export default function Testimonials() {

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Heart Care Patient',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      rating: 5,
      review:
        'The doctors were compassionate and highly professional. The treatment process was smooth, and I felt supported from beginning to end.'
    },
    {
      id: 2,
      name: 'Michael Brown',
      role: 'Orthopedic Patient',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      review:
        'Excellent service with modern facilities. The staff answered all my questions patiently, and my recovery was faster than expected.'
    },
    {
      id: 3,
      name: 'Emily Wilson',
      role: 'Dental Patient',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      review:
        'I was nervous before my appointment, but the friendly doctors made me feel relaxed. Truly an outstanding healthcare experience.'
    },
    {
      id: 4,
      name: 'David Miller',
      role: 'General Checkup',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      rating: 5,
      review:
        'Very clean environment and experienced specialists. Booking an appointment was simple, and everything was handled professionally.'
    },
    {
      id: 5,
      name: 'Sophia Martinez',
      role: 'Pediatric Care Parent',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      rating: 5,
      review:
        'The pediatric team took wonderful care of my child. Their kindness and attention to detail exceeded our expectations.'
    },
    {
      id: 6,
      name: 'James Anderson',
      role: 'Cardiology Patient',
      image: 'https://randomuser.me/api/portraits/men/41.jpg',
      rating: 5,
      review:
        "From diagnosis to recovery, every doctor and nurse provided exceptional care. I couldn't have asked for a better medical experience."
    },
    {
      id: 7,
      name: 'Mical Jacsion',
      role: 'Cardiology Patient',
      image:
        'https://i.ibb.co.com/yFRpfQLg/ai-generated-a-happy-smiling-professional-man-light-blurry-office-background-closeup-view-photo.jpg',
      rating: 5,
      review:
        "From diagnosis to recovery, every doctor and nurse provided exceptional care. I couldn't have asked for a better medical experience."
    },
    {
      id: 8,
      name: 'Josh Gates',
      role: 'Cardiology Patient',
      image: 'https://i.ibb.co.com/yFKM3q0z/images.jpg',
      rating: 5,
      review:
        "From diagnosis to recovery, every doctor and nurse provided exceptional care. I couldn't have asked for a better medical experience."
    },
    {
      id: 9,
      name: 'Leonal Messi',
      role: 'Cardiology Patient',
      image:
        'https://i.ibb.co.com/KzVXFTyp/129578441-gettyimages-1247344085.jpg',
      rating: 5,
      review:
        "From diagnosis to recovery, every doctor and nurse provided exceptional care. I couldn't have asked for a better medical experience."
    },
    {
      id: 10,
      name: 'Steve Jobs',
      role: 'Cardiology Patient',
      image: 'https://i.ibb.co.com/7NCncCXF/0x0.jpg',
      rating: 5,
      review:
        "From diagnosis to recovery, every doctor and nurse provided exceptional care. I couldn't have asked for a better medical experience."
    }
  ]

  return (
    <section className="bg-gray-100">
      <div className="w-11/12 h-full mx-auto py-20">
        <div className="w-full px-4 md:w-6/12 text-center mx-auto pb-10">
          <h3 className="text-4xl font-bold text-black py-4">Testimonials</h3>
          <p className="text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati
            iste, ut iusto magni exercitationem autem qui aperiam delectus alias
            soluta. Non totam adipisci dignissimos reprehenderit quis similique
            nobis vel distinctio.
          </p>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={50}
          pagination={{
            clickable: true
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30
            }
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {testimonials.map(item => (
            <SwiperSlide key={item.id}>
              <div className="h-full w-80 mx-auto rounded-2xl border border-gray-200 bg-white p-4 m-4 md:m-10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex text-yellow-400 text-xl">
                  {'★'.repeat(item.rating)}
                </div>

                <p className="mt-5 text-gray-600 leading-7">"{item.review}"</p>

                <div className="my-6 h-px bg-gray-200"></div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-blue-100"
                    />

                    <div>
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.role}</p>
                    </div>
                  </div>

                  <span className="text-5xl text-blue-100 font-bold">"</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

