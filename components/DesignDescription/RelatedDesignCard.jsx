// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";
import { useGetRelated } from "../queries/query/related.query";
import DescRelatedCard from "./DescRelatedCard";
import "./styles.module.css";


function RelatedDesignCard({ data }) {
    const {data:relatedData} = useGetRelated({related:data,limit:''})
    const related = relatedData?.data?.designs[0]
    return (
        <div className="bg-[#F2F9FF] h-full">
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
                <div className="grid w-full sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4" >
                <SwiperSlide className="!gap-2 !w-[300px] !h-[260px] flex !mx-4 !mb-7 ">
               <div className="w-full">
               <DescRelatedCard data={related} />
               </div>
              </SwiperSlide>
                </div>
              </div>
            </Swiper> 
          }            
        </div>
    </div>
    );
}

export default RelatedDesignCard;