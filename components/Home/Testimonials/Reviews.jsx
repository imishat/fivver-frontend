// Import Swiper React components
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.module.css';

// import required modules
import moment from 'moment';
import { BsStarFill } from 'react-icons/bs';
import { Navigation } from 'swiper/modules';

export default function Reviews({filteredReviews}) {
  
    
    return (
        <>
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {filteredReviews?.length
                  ?filteredReviews?.map((review, i) => (
              <SwiperSlide key={i} className='!h-44'>
                <div className='my-4 '>
                  <div className='flex w-full px-20 gap-4 text-sm md:text-base  justify-between items-center '>
                    <p className='mx-2 text-xl text-black '>
                      {  review?.description
}
                    </p>
                    <div className='w-52  border h-20 bg-white flex justify-center items-center text-xs object-cover'>
                    <PhotoProvider>
      <PhotoView src="https://i.ibb.co/qJFwS5F/Solar-Energy-Door-Hanger-Design.jpg">
        <img src="https://i.ibb.co/qJFwS5F/Solar-Energy-Door-Hanger-Design.jpg" className='w-[120px] h-[89px]' alt="" />
      </PhotoView>
    </PhotoProvider>
                     
                    </div>
                  </div>
                  <div className='flex px-20 justify-between items-center md:my-6'>
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
                      <p className='text-sm'>{moment(review?.createdAt).fromNow()}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )):'No review'}
          </Swiper>
        </>
      );
      
}
