import Link from "next/link";

import React, { useState } from 'react'


import {BiDollar} from "react-icons/bi"
import { AiFillSetting,AiOutlineClose} from "react-icons/ai"
import {IoMdAdd} from "react-icons/io"
const Affiliate = () => {
  const [modal,setModal] =useState(false)

  const [modal2,setModal2] =useState(false)
  return (
    <>
    <div className={`px-4 xl:px-0 ${modal && "bg-[gray] h-screen blur-[2px]"}`}>
    <section className='mt-5'>
       
          <h2 className='font-roboto mb-8 font-bold text-3xl text-[#444444]'>Affiliate</h2>
          <div className='flex flex-wrap justify-center md:justify-start gap-5'>
            <div className='w-[400px] bg-[#292933] py-10 flex justify-center items-center'>
                <div className='text-center'>
                    <span className='flex justify-center'>
                      <BiDollar className='font-roboto font-bold text-5xl text-white '/>
                    </span>
                    <h3 className='font-roboto mt-2 mb-3 font-normal text-xl text-white'>Affiliate Balance</h3>
                    <h1 className='font-roboto font-bold text-5xl text-white'>$10.000</h1>
                </div>
            </div>

                  <div className='w-[400px] bg-[#DFDFE6] hover:bg-[#292933] group duration-200  py-10 flex justify-center items-center'>
              <Link href="/user/affiliate/Configer-info">
                      <div className='text-center'>
                          <div className='h-[80px] w-[80px] bg-[#292933] group-hover:bg-white group-hover:text-[#292933] duration-200 rounded-full mx-auto flex items-start justify-center'>
                            <AiFillSetting className='font-roboto font-bold text-5xl h-full text-white  group-hover:text-[#292933] duration-200'/>
                          </div>
                          <h3 className='font-roboto mt-2 mb-3 font-normal text-xl text-[#111111] group-hover:text-white duration-200'>Configure Payout</h3>
                        
                      </div>
              </Link>
                  </div>

            <div onClick={()=>{setModal(!modal)}} className='w-[400px] bg-[#DFDFE6] hover:bg-[#292933] group duration-200 py-10 flex justify-center items-center'>
                <div className='text-center'>
                    <div className='h-[80px] w-[80px] bg-[#292933] group-hover:bg-white group-hover:text-[#292933] duration-200 rounded-full mx-auto flex items-start justify-center'>
                      <IoMdAdd className='font-roboto cursor-pointer  font-bold text-5xl h-full text-white group-hover:text-[#292933] duration-200'/>
                    </div>
                    <h3 className='font-roboto mt-2 mb-3 font-normal text-xl text-[#292933] group-hover:text-white duration-200'>Affiliate Withdraw Request</h3>
                   
                </div>
            </div>
            <div onClick={()=>{setModal2(!modal2)}} className='w-[400px] bg-[#DFDFE6] hover:bg-[#292933] group duration-200 py-10 flex justify-center items-center'>
                <div className='text-center'>
                    <div className='h-[80px] w-[80px] bg-[#292933] group-hover:bg-white group-hover:text-[#292933] duration-200 rounded-full mx-auto flex items-start justify-center'>
                      <IoMdAdd className='font-roboto cursor-pointer  font-bold text-5xl h-full text-white group-hover:text-[#292933] duration-200'/>
                    </div>
                    <h3 className='font-roboto mt-2 mb-3 font-normal text-xl text-[#292933] group-hover:text-white duration-200'>Affiliate Withdraw Request</h3>
                   
                </div>
            </div>

          </div>

       
    </section>

  


         
    





    </div>
         
         {
          modal &&
              <div className={`md:w-[700px] w-[400px] bg-white py-10 px-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 `}>
                <h2 className='font-roboto  font-normal text-sm md:text-3xl text-[#111111] flex justify-between items-center'>Affiliate Withdraw Request  <AiOutlineClose onClick={()=>{setModal(false)}} className='cursor-pointer'/></h2>
               
                <label className='mr-5 font-roboto   font-normal text-xl text-[#111111]'>Amount *</label>
                <input type="text" className='md:w-[500px] px-5 py-4 my-5 border-solid border border-[#666666]'/>
                <div className='flex justify-end mr-8'>
                  <button className='bg-[#D00906] py-4 md:px-16 px-8 font-roboto text-white text-lg font-medium'>Confirm</button>  
                </div>
              </div>
         }
         {
          modal2 &&
              <div className={`md:w-[700px] w-[400px] bg-white py-10 px-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-xl`}>
                <h2 className='font-roboto  font-normal text-sm md:text-3xl text-[#111111] flex justify-between items-center'>Affiliate Withdraw Request  <AiOutlineClose onClick={()=>{setModal2(false)}} className='cursor-pointer'/></h2>
               
                Mahfujurrahm535 Affiliate Program
                <ul>

                Join the Mahfujurrahm535 Affiliate Program and earn up to $5 per new customer purchase

<li>
• You must first create a link to start working as an affiliate, you can create the link with the URL of any page of our website, (try to create the link with the URL of the home page or any design), You will create your affiliate link from this page with that URL.<br/>
</li>

• You can share this affiliate link with your friends or relatives or bring new clients by sharing this link on your social media or your website.<br/>

• Your friends or relatives or any of your clients should come to our website through the affiliate link you have created, and sign up, then $5 will be added to your profile as soon as the client purchases something from our website.<br/>

• If any client comes through your link, that client must sign up on our website within 30 days of his first click and must purchase something.<br/>




                </ul>




              </div>
         }
    
    <div>
      <div>
         <h2 className="font-bold text-lg p-3 border-b mb-4">Affiliate</h2>
       </div>
       <div>
         <div className="flex items-center">
           <input
            className="input w-1/2 input-bordered rounded rounded-r-none input-sm"
            type="url"
            id="refUrl"
          />
          <button className="btn btn-sm rounded rounded-l-none border border-blue-500 bg-blue-500 text-white">
            Create Link
          </button>
        </div>
        <div>
           <div>
          <div>
              <h2 className="text-lg font-bold p-3 border-b mb-4">
               Created Links
            </h2>
            </div>
           <ul className="mb-12">
              <li className="flex border-b py-1 justify-between text-blue-500">
               <Link href={"#"} className="font-bold">
                  http://localhost:3000/design/saiA?ref=sa8
                </Link>
                <p className="font-bold text-black">
                  (<span>6</span> Clicks)
                 </p>
               </li>
               <li className="flex border-b py-1 justify-between text-blue-500">
              <Link href={"#"} className="font-bold">
                   http://localhost:3000/design/saiA?ref=sa8
                </Link>
              <p className="font-bold text-black">
                  (<span>6</span> Clicks)
                </p>
               </li>
              <li className="flex border-b py-1 justify-between text-blue-500">
                <Link href={"#"} className="font-bold">
                 http://localhost:3000/design/saiA?ref=sa8
              </Link>
               <p className="font-bold text-black">
                  (<span>6</span> Clicks)
                 </p>
              </li>
            </ul>
          </div>
        </div>
       </div>
     </div>
     </>
  );
};

export default Affiliate;
