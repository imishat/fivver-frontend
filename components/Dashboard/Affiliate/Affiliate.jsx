import { useState } from 'react';

import Container from "@/components/CustomarProfile/AffiliateSystem/Container";
import { CgMathPlus, CgProfile } from "react-icons/cg";
import { CiViewList } from "react-icons/ci";
import { RiSubtractFill } from "react-icons/ri";

function Affiliate() {
    const [open,setOpen] = useState(false)
    return (
        // <div>
        //     <div>
        //         {/* Navigation */}
        //         <div className="flex justify-center items-center gap-2 bg-base-200">
        //             <Link className={`px-4 py-2 bg-base-300 font-bold text-blue-500`} href={'#'}>Withdraw Request</Link>
        //             <Link className={`px-4 py-2 bg-base-300 font-bold text-blue-500`} href={'#'}>Affiliate URLS</Link>
        //             {/* <Link href={'#'}>Affiliate </Link> */}
        //         </div>
        //         {/* Body */}
        //         <div>

        //         </div>
        //     </div>
        // </div>
        <div className='px-4 xl:px-0 bg-[#F2F3F8] h-screen '>
        <Container>
            <div className='bg-white pb-16'>
               <h2 className='font-roboto font-medium text-[#444444] text-xl p-5 border-solid border-b border-gray-400'>Affiliate Users</h2>
               <ul className='px-5 flex justify-between pb-8 pt-4 border-solid border-b border-gray-400'>
                <li className='font-roboto font-medium text-base text-[#444444] cursor-pointer'>#</li>
                <li className='font-roboto font-medium text-base text-[#444444] cursor-pointer'>Name</li>
                <li className='font-roboto font-medium text-base text-[#444444] cursor-pointer md:block hidden'>Time</li>
                <li className='font-roboto font-medium text-base text-[#444444] cursor-pointer md:block hidden'>Email Address</li>
                <li className='font-roboto font-medium text-base text-[#444444] cursor-pointer md:block hidden'>Profile Info</li>
                <li className='font-roboto font-medium text-base text-[#444444] cursor-pointer'>Approval</li>
                <li className='font-roboto font-medium text-base text-[#444444] cursor-pointer md:block hidden'>Due Amount</li>
                <li className='font-roboto font-medium text-base text-[#444444] cursor-pointer'>Options</li>			
               </ul>

               <ul className='flex justify-between py-2 items-center px-2'>

                <li className=' md:w-[110px] relative  pl-2 font-roboto font-normal text-sm cursor-pointer text-[#111111] '>01 {
                    open ? 
                    <RiSubtractFill onClick={()=>setOpen(!open)} size={15} className='bg-[#ff3300] text-white block md:hidden font-bold absolute -bottom-4 left-1/2 -translate-x-1/2'/>
                    :
                    <CgMathPlus onClick={()=>setOpen(!open)} size={15} className='bg-[#ff3300] text-white block md:hidden font-bold absolute -bottom-4 left-1/2 -translate-x-1/2'/>
                }
                </li>

                <li className=' md:w-[170px] w-[100px] font-roboto font-normal cursor-pointer text-sm text-[#111111] '>Paul K. Jensen</li>

                <li className=' w-[130px] font-roboto font-normal text-sm cursor-pointer text-[#111111] md:block hidden'>208-295-8053</li>

                <li className=' w-[280px] font-roboto font-normal text-sm cursor-pointer text-[#111111] md:block hidden'>customer@example.com</li>

                <li className=' w-[190px] font-roboto font-normal text-sm cursor-pointer text-[#111111] md:block hidden'> <button>Veiw</button></li>
                
                <li className='py-2 font-roboto font-normal text-sm cursor-pointer text-[#111111] '>
                <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer  outline-none"/>
                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none    rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#0ABB75]  after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-white border border-gray-400"></div>
                </label>
                </li>

                <li className=' font-roboto font-normal text-sm text-[#111111]  w-[310px] text-center md:block hidden'>$10.000</li>
                
                <li className='font-roboto font-normal text-sm text-[#111111] '>
                    <div className='flex'>
                        <div className='w-9 h-9 bg-[#ffa9a9] rounded-full mr-1 cursor-pointer text-[#ff3700] hover:bg-[#ff3700] duration-500 hover:text-white flex justify-center items-center'>
                            <CgProfile size={20}/>
                        </div>
                        <div className='w-9 h-9 bg-[#9aff9a] rounded-full cursor-pointer text-[#2d932d] flex justify-center hover:bg-[#2d932d] hover:text-white duration-500 items-center'>
                            <CiViewList size={20}/>
                        </div>
                    </div>
                </li>
               </ul>

               {
                open &&
                    <div className='flex gap-x-10 pl-5 md:hidden'>
                    
                    <ul>
                        <li className='font-roboto font-medium text-base  cursor-pointer  mb-6 mt-8 text-[#444444] '>Time</li>
                        <li className='font-roboto font-medium text-base  cursor-pointer mb-6 text-[#444444] '>Email Address</li>
                        <li className='font-roboto font-medium text-base cursor-pointer  mb-6 text-[#444444] '>Profile Info</li>
                        <li className='font-roboto font-medium text-base cursor-pointer  mb-6 text-[#444444] '>Due Amount</li>
                    </ul>

                    <ul>
                        <li className=' font-roboto font-normal text-sm  cursor-pointer mb-[28px] mt-8 text-[#111111] '>208-295-8053</li>

                        <li className='  font-roboto font-normal text-sm cursor-pointer  mb-[28px]  text-[#111111]'>customer@example.com</li>

                        <li className='  font-roboto font-normal text-sm  cursor-pointer mb-[28px]  text-[#111111] '> <button>Veiw</button></li>
                        
                        <li className=' font-roboto font-normal text-sm  cursor-pointer mb-[28px]  text-[#111111]  '>$10.000</li>
                    </ul>

                    </div>
               }
            </div>
        </Container>
              
    </div>
    );
}

export default Affiliate;