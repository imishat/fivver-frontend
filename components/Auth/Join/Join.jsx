import Link from "next/link";
import { useState } from "react";

const Join = () => {
    // toggle sign in or sign up
    const [toggle,setToggle] = useState('signin')
    return (
        <div className="h-full flex justify-center items-center w-full">
            <div className="w-[440px] h-full border">
                <div className="flex justify-between h-14 font-bold ">
                    {/* sign in btn */}
                <div className=" relative h-full w-full ">
                   <button onClick={()=>setToggle('signin')} className={`w-full h-full  ${toggle==='signin'?'after:content-normal after:bg-[#1B8CDC] after:h-6 after:w-6 after:absolute after:left-[45%] after:-bottom-2 after:rotate-45 bg-[#1B8CDC] text-white':'bg-[#D1E6F9] text-black'} `}>Sign In</button>
                   </div>
                   {/* sign up btn */}
                   <div className=" relative h-full w-full">
                   <button onClick={()=>setToggle('signup')} className={`w-full h-full ${toggle==='signup'?'after:content-normal after:bg-[#1B8CDC] after:h-6 after:w-6 after:absolute after:left-[45%] after:-bottom-2 after:rotate-45 bg-[#1B8CDC] text-white':'bg-[#D1E6F9] text-black'} `}>Sign Up</button>
                   </div>
                </div>
                <div className="bg-[#F2F9FF]">
                    {/* sign in form */}
                   {
                    toggle==='signin' ? 
                    <form className="flex flex-col space-y-3 px-4 py-14">
                    {/* Email */}
                   <div>
                   <label htmlFor="email" className="px-2">
                        Email
                    </label>
                        <input className="px-4 py-2 bg-white border border-gray-300 text-black w-full" type="email"  id="email" />
                   </div>
                   {/* Password */}
                   <div>
                   <label htmlFor="password" className="px-2">
                        Password
                    </label>
                        <input className="px-4 py-2 bg-white border border-gray-300 text-black w-full" type="password"  id="password" />
                   </div>
                   {/* Remember me and forgot password */}
                   <div className="flex justify-between px-3">
                    {/* Remember me */}
                    <div  className="flex items-center gap-2">
                       <input type="checkbox" id="rememberme" /> <label className="select-none" htmlFor="rememberme">Remember me</label>
                    </div>
                    {/* forgot password */}
                    <div>
                        <Link href={`#`} className="text-blue-500">Forgot password?</Link>
                    </div>
                   </div>
                   {/* Sign in btn */}
                   <div>
                    <button className="w-full px-4 py-2 font-bold bg-[#1B8CDC] text-white text-xl ">Sign In</button>
                   </div>
                   {/* Don't have account */}
                   <div className="flex justify-center">
                    <p>Don't have Account? <span className="text-[#1B8CDC] font-bold cursor-pointer" onClick={()=>setToggle('signup')}>Sign Up</span></p>
                   </div>
                </form>
                :
                // Sign up form ===========================================
                <form className="flex flex-col space-y-3 px-4 py-14">
                {/* Country */}
               <div>
               <label htmlFor="country" className="px-2">
                    Country
                </label>
                    <input className="px-4 py-2 bg-white border border-gray-300 text-black w-full" type="text"  id="country" />
               </div>
               {/* fullName */}
               <div>
               <label htmlFor="fullName" className="px-2">
                    Full Name
                </label>
                    <input className="px-4 py-2 bg-white border border-gray-300 text-black w-full" type="text"  id="fullName" />
               </div>
               {/* Username */}
               <div>
               <label htmlFor="username" className="px-2">
               Username
                </label>
                    <input className="px-4 py-2 bg-white border border-gray-300 text-black w-full" type="text"  id="username" />
               </div>
               {/* Phone number */}
               <div>
               <label htmlFor="phoneNumber" className="px-2">
               Phone Number
                </label>
                    <input className="px-4 py-2 bg-white border border-gray-300 text-black w-full" type="text"  id="phoneNumber" />
               </div>
               {/* Email */}
               <div>
               <label htmlFor="email" className="px-2">
               Email
                </label>
                    <input className="px-4 py-2 bg-white border border-gray-300 text-black w-full" type="email"  id="email" />
               </div>
               {/* Set password */}
               <div>
               <label htmlFor="password" className="px-2">
               Set Password
                </label>
                    <input className="px-4 py-2 bg-white border border-gray-300 text-black w-full" type="password"  id="password" />
               </div>
               {/* Confirm Password */}
               <div>
               <label htmlFor="password" className="px-2">
               Confirm Password
                </label>
                    <input className="px-4 py-2 bg-white border border-gray-300 text-black w-full" type="password"  id="password" />
               </div>
               {/* Sign up btn */}
               <div>
                <button className="w-full px-4 py-2 font-bold bg-[#1B8CDC] text-white text-xl ">Sign Up</button>
               </div>
               {/* already have account */}
               <div className="flex justify-center">
                <p>Already have an Account? <span className="text-[#1B8CDC] font-bold cursor-pointer" onClick={()=>setToggle('signin')}>Sign In</span></p>
               </div>
            </form>
                   }
                </div>
            </div>
        </div>
    );
};

export default Join;