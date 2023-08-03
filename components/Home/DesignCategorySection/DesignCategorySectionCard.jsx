// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.module.css';

// import required modules
import Link from 'next/link';
import { Navigation } from 'swiper/modules';
import CompanyCard from './CompanyCard';

export default function DesignCategorySectionCard () {
  // image size shoud be v 2000px h 2700 
  //1st page desing catagory
  // company  catagory 
  // All Design shoud be all company sm  titel desing
  // if user click the desing page show the paticolur desin in the conpany 
    return (
        <div className="border px-4 pb-6 w-full h-64 rounded-md"> 
        <div className="flex py-1 justify-between">
                    <h2 className="font-bold">Door Hanger Design</h2>
                  <Link className="text-blue-500 font-bold" href={'#'}>All Design</Link>
                 </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
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
          modules={[Navigation]}
          className="mySwiper"
        >
            <div>
             
                
                 <div  >
                         {
                             [2,2,2,2,2,2].map(item=>
                                <SwiperSlide className='flex !gap-2' >
                                    <CompanyCard />
                                </SwiperSlide>
                                )
                        }
                 </div>
             </div>
        </Swiper>
        </div>
      
        
    );
};

