// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.module.css";

// import required modules
import Card from "@/components/Card/Card";
import { useAllDesigns } from "@/components/queries/query/designs.query";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper/modules";

export default function DesignCategorySectionCard({category}) {
  // category title
  const designId = category?.categoryId
  // get all designs
  const { data } = useAllDesigns({designId});


  // all designs
  const designs = data?.data?.designs
  return (
    <div className="border children px-4 pb-3 w-full h-auto rounded-md">
      <div className="flex py-1 justify-between">
        <h2 className="font-bold">{category?.name}</h2>
        <Link
          className="text-blue-500 font-bold"
          href={`/designs/category/${category.categoryId}`}
        >
          All Designs
        </Link>
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
          }
        }}
        modules={[Navigation,Autoplay]}
        className="mySwiper"
      >
        <div>
          <div>
            {designs?.length ? designs?.map((data, i) => (
              <SwiperSlide key={i} className="flex !gap-2 !w-[310px] !h-[250px] !max-h-[300px]">
                <div className="h-[90%]">
                <Card category={category} data={data} />
                </div>
              </SwiperSlide>
            ))
          :
          <p>No data</p>
          }
          </div>
        </div>
      </Swiper>
    </div>
  );
}
