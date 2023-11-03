
import Card from "../Card/Card";
import { useGetRelated } from "../queries/query/related.query";
import "./styles.module.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";


const Related = ({ currentItems }) => {
    const query = currentItems?.split(' ').slice(0,3).join(' ')
   const {data:relatedData} = useGetRelated({related:query,limit:''})
   const related = relatedData?.data?.designs
    return (
        <div className="bg-[#F2F9FF] md:p-8 h-full">
            <div className="flex justify-center">
                <h2 className="text-3xl font-bold p-3">Related Design</h2>
            </div>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}
              speed={1200}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                440: {
                  slidesPerView: 1,
                  spaceBetween: 3,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 3,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }}
              modules={[Navigation,Autoplay]}
              className="mySwiper"
            >
              <div className="w-full">
              <div className="grid sm:grid-cols-2 p-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {
                    related?.map((item,i)=>{
                        return <SwiperSlide key={i} className="flex !gap-2">
                            <Card data={item}></Card>
                        </SwiperSlide>
                    })
                }
            </div>
              </div>
            </Swiper>
           
        </div>
    );
};

export default Related;
