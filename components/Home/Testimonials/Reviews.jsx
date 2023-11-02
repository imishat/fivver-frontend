// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.module.css';

// import required modules
import { BsStarFill } from 'react-icons/bs';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";

export default function Reviews({filteredReviews}) {
    console.log(filteredReviews?.createdAt)
    const [time, setTime] = useState('');

    useEffect(() => {
      // Original creation time
      const createTime = new Date(filteredReviews?.createdAt);
      
      
      const currentTime = new Date();
    
     
      const timeDifference = currentTime - createTime;
    
    
      const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    
      if (hoursAgo >= 24) {
        const daysAgo = Math.floor(hoursAgo / 24);
        setTime(daysAgo + " day" + (daysAgo > 1 ? "s" : "") + " ago");
      } else {
        setTime(hoursAgo + " hour" + (hoursAgo > 1 ? "s" : "") + " ago");
      }
    }, []);
    
    return (
        <>
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {filteredReviews?.length
                  ?filteredReviews?.map((review, i) => (
              <SwiperSlide key={i} className='!h-44'>
                <div className='my-4'>
                  <div className='flex w-full gap-4 text-sm md:text-base text-center justify-between items-center'>
                    <p className='mx-2'>
                      {  review?.description
}
                    </p>
                    <div className='w-64 md:w-44 border h-16 bg-white flex justify-center items-center text-xs'>
                      Design
                    </div>
                  </div>
                  <div className='flex justify-between items-center md:my-6 px-4'>
                    <div className='flex justify-between md:gap-8 gap-2 items-center'>
                      <div className='bg-[#1781CB] p-2 rounded-full w-8 flex justify-center items-center text-white h-8'>
                        M
                      </div>
                      <h2 className='md:text-xl font-bold'>username123</h2>
                      <div className='md:text-xl  flex gap-2'>
                      {
                            [...Array(parseInt(review.stars)).keys()].map((item,i)=>
                            <div key={i}>
                                <BsStarFill color="#1781CB" />
                            </div>
                            )
                        }
                      </div>
                    </div>
                    <div>
                      <p className='text-sm'>{time}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )):'No review'}
          </Swiper>
        </>
      );
      
}
