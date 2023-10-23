import { useGetRelated } from "../queries/query/related.query";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";
import DesignCard from "../Card/DesignCard";
import "./styles.module.css";


function CategoryRelated({ currentItems }) {
    const {data:relatedData} = useGetRelated({related:currentItems,limit:''})
    const related = relatedData?.data?.designs
    console.log(related)
    return (
        <div className="bg-[#F2F9FF] md:p-8 h-full">
        <div className="flex justify-center">
            <h2 className="text-3xl font-bold p-3">Related Design</h2>
        </div>
        <div className="">
          {
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
                  slidesPerView: 2,
                  spaceBetween: 3,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 3,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
              modules={[Navigation,Autoplay]}
              className="mySwiper"
            >
              <div className="w-full">
                <div className="grid sm:grid-cols-2 p-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3" >
                  {
                     related?.length ? related?.map((data,i)=>{
                      return<SwiperSlide className="flex !w-72 !gap-2">
                      <DesignCard category={data} data={data} />
                    </SwiperSlide>
               })
               :''
                }
                </div>
              </div>
            </Swiper>
            
          }
            
        </div>
    </div>
    );
}

export default CategoryRelated;