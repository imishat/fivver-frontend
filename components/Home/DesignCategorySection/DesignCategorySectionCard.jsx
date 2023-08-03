// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.module.css';

// import required modules
import Card from '@/components/Card/Card';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';

export default function DesignCategorySectionCard () {
     // import fake data
     const [designs,setDesigns] = useState([])
     useEffect(()=>{
       axios.get(`/design.json`)
       .then(res=>{
         setDesigns(res.data)
       })
     },[])
    return (
        <div className="border px-4 pb-6 w-full h-64 rounded-md"> 
        <div className="flex py-1 justify-between">
                    <h2 className="font-bold">Door Hanger Design</h2>
                  <Link className="text-blue-500 font-bold" href={'/designs/category/door-hanger-design'}>All Designs</Link>
                 </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
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
          modules={[Navigation]}
          className="mySwiper"
        >
            <div>
             
                
                 <div  >
                         {
                            designs.map((data,i)=>
                                <SwiperSlide key={i} className='flex !gap-2' >
                                    <Card data={data} />
                                </SwiperSlide>
                                )
                        }
                 </div>
             </div>
        </Swiper>
        </div>
      
        
    );
};