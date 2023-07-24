// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.module.css';

// import required modules
import { BsStarFill } from 'react-icons/bs';
import { Navigation } from 'swiper/modules';

export default function Reviews() {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide className='!h-44'>
            <div className='my-4'>
                <div className='flex w-full gap-4 text-xl text-center items-center'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas laudantium cupiditate dolores beatae expedita molestiae unde repellendus rerum eius quaerat possimus officia nesciunt dolor numquam, voluptatem amet neque mollitia deleniti.</p>
                    <div className='w-36 border h-16 bg-white flex justify-center items-center text-xs'> Design</div>
                </div>
                <div className='flex justify-between my-6 px-4'>
                   <div className='flex justify-between gap-8 items-center'>
                   <div className='bg-[#1781CB] p-2 rounded-full w-8 flex justify-center items-center text-white h-8'>M</div>
                    <h2 className='text-xl font-bold'>username123</h2>
                    <div className='text-xl  flex gap-2'>
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                    </div>
                   </div>
                   <div>
                    <p>5 day ago</p>
                   </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='!h-44'>
            <div className='my-4'>
                <div className='flex w-full gap-4 text-xl text-center items-center'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas laudantium cupiditate dolores beatae expedita molestiae unde repellendus rerum eius quaerat possimus officia nesciunt dolor numquam, voluptatem amet neque mollitia deleniti.</p>
                    <div className='w-36 border h-16 bg-white flex justify-center items-center text-xs'> Design</div>
                </div>
                <div className='flex justify-between my-6 px-4'>
                   <div className='flex justify-between gap-8 items-center'>
                   <div className='bg-[#1781CB] p-2 rounded-full w-8 flex justify-center items-center text-white h-8'>M</div>
                    <h2 className='text-xl font-bold'>username123</h2>
                    <div className='text-xl  flex gap-2'>
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                    </div>
                   </div>
                   <div>
                    <p>5 day ago</p>
                   </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='!h-44'>
            <div className='my-4'>
                <div className='flex w-full gap-4 text-xl text-center items-center'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas laudantium cupiditate dolores beatae expedita molestiae unde repellendus rerum eius quaerat possimus officia nesciunt dolor numquam, voluptatem amet neque mollitia deleniti.</p>
                    <div className='w-36 border h-16 bg-white flex justify-center items-center text-xs'> Design</div>
                </div>
                <div className='flex justify-between my-6 px-4'>
                   <div className='flex justify-between gap-8 items-center'>
                   <div className='bg-[#1781CB] p-2 rounded-full w-8 flex justify-center items-center text-white h-8'>M</div>
                    <h2 className='text-xl font-bold'>username123</h2>
                    <div className='text-xl  flex gap-2'>
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                    </div>
                   </div>
                   <div>
                    <p>5 day ago</p>
                   </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='!h-44'>
            <div className='my-4'>
                <div className='flex w-full gap-4 text-xl text-center items-center'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas laudantium cupiditate dolores beatae expedita molestiae unde repellendus rerum eius quaerat possimus officia nesciunt dolor numquam, voluptatem amet neque mollitia deleniti.</p>
                    <div className='w-36 border h-16 bg-white flex justify-center items-center text-xs'> Design</div>
                </div>
                <div className='flex justify-between my-6 px-4'>
                   <div className='flex justify-between gap-8 items-center'>
                   <div className='bg-[#1781CB] p-2 rounded-full w-8 flex justify-center items-center text-white h-8'>M</div>
                    <h2 className='text-xl font-bold'>username123</h2>
                    <div className='text-xl  flex gap-2'>
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                    </div>
                   </div>
                   <div>
                    <p>5 day ago</p>
                   </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='!h-44'>
            <div className='my-4'>
                <div className='flex w-full gap-4 text-xl text-center items-center'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas laudantium cupiditate dolores beatae expedita molestiae unde repellendus rerum eius quaerat possimus officia nesciunt dolor numquam, voluptatem amet neque mollitia deleniti.</p>
                    <div className='w-36 border h-16 bg-white flex justify-center items-center text-xs'> Design</div>
                </div>
                <div className='flex justify-between my-6 px-4'>
                   <div className='flex justify-between gap-8 items-center'>
                   <div className='bg-[#1781CB] p-2 rounded-full w-8 flex justify-center items-center text-white h-8'>M</div>
                    <h2 className='text-xl font-bold'>username123</h2>
                    <div className='text-xl  flex gap-2'>
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                        <BsStarFill color='#1781CB' />
                    </div>
                   </div>
                   <div>
                    <p>5 day ago</p>
                   </div>
                </div>
            </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
