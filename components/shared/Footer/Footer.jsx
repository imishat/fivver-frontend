    import Link from "next/link";
import { useRouter } from "next/router";
import { BsFacebook } from "react-icons/bs";

    const Footer = () => {

        const router = useRouter()
        console.log(router)
        return (
            <div> 
                {
                    router.asPath!=='/'
                    ?
        <div> 
            {/* Email */}
            <div className="bg-[#1781CB] py-2 md:text-2xl text-white flex gap-4 px-6"> 
                <p>Email: </p> <p>mahfujurrahman535@gmail.com</p>
            </div>
            {/* Main Footer */}
            <div className="bg-black">

           
            <div className="flex text-white justify-between items-center border-b pb-3 md:px-6 md:mx-5">
                <div className="flex flex-col w-4/12 space-y-3">
                    <div className="text-center">
                       <div className="flex justify-center">
                       <img src="/images/logo.png" className="w-20" alt="" />
                       </div>
                        <h2 className="text-lg font-bold">mahfujurrahman535</h2>
                        <p>Graphic Designer</p>
                    </div>
                    {/* Social icons */}
                    <div className="flex justify-center">
                        <ul className="md:flex grid grid-cols-3 md:gap-2 gap-1 items-center">
                            <li><a className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block" href="#"><BsFacebook /></a></li>
                            <li><a className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block" href="#"><BsFacebook /></a></li>
                            <li><a className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block" href="#"><BsFacebook /></a></li>
                            <li><a className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block" href="#"><BsFacebook /></a></li>
                            <li><a className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block" href="#"><BsFacebook /></a></li>
                        </ul>
                    </div>
                </div>
                <div className="py-3 w-8/12 mx-auto">
                    <ul className="grid grid-cols-2 md:grid-cols-4 w-full justify-between">
                        <li>
                            <Link href={'#'}>Home</Link>
                        </li>
                       
                        <li>
                            <Link href={'#'}>Designs</Link>
                        </li>
                        <li>
                            <Link href={'/price-list'}>Price List</Link>
                        </li>
                        <li>
                            <Link href={'#'}>Contact</Link>
                        </li>
                        <li>
                            <Link href={'#'}>About</Link>
                        </li>
                        <li>
                            <Link href={'#'}>Companies</Link>
                        </li>
                       
                        <li>
                            <Link href={'#'}>Project</Link>
                        </li>
                        <li>
                            <Link href={'#'}>Affiliate</Link>
                        </li>
                    </ul>
                <div className="w-12 my-6 border-b"></div>
                <p className="md:text-xl">Email: <span>example@gmail.com</span></p>
                </div>
            </div>
            <div className=" text-white px-6 py-4">
                <div className="flex gap-4 items-center">
                    <Link href={'#'}>Terms and Conditions</Link>
                    |
                    <Link href={'#'}>Privacy Policy</Link>
                </div>
            </div>
            </div>
        </div>
        :
        <div> 
        {/* Email */}
        <div className="bg-[#1781CB] py-2 md:text-2xl text-white flex gap-4 px-6"> 
            <p>Email: </p> <p>mahfujurrahman535@gmail.com</p>
        </div>
        {/* Main Footer */}
        <div className="bg-black">

       
        <div className="md:flex text-white justify-center mx-auto w-full md:justify-between items-center border-b pb-3 md:px-6 md:mx-5">
            <div className="flex flex-col md:w-6/12 space-y-3">
                <div className="text-center">
                   <div className="flex justify-center">
                   <img src="/images/logo.png" className="w-20" alt="" />
                   </div>
                    <h2 className="text-lg font-bold">mahfujurrahman535</h2>
                    <p>Graphic Designer</p>
                </div>
                {/* Social icons */}
                <div className="flex justify-center">
                    <ul className="md:flex grid md:grid-cols-3 grid-cols-6 md:gap-2 gap-1 items-center">
                        <li><a className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block" href="#"><BsFacebook /></a></li>
                        <li><a className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block" href="#"><BsFacebook /></a></li>
                        <li><a className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block" href="#"><BsFacebook /></a></li>
                        <li><a className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block" href="#"><BsFacebook /></a></li>
                        <li><a className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block" href="#"><BsFacebook /></a></li>
                    </ul>
                </div>
            </div>
            <div className="py-3 md:w-4/12 w-full text-center">
                <ul className="flex flex-col space-y-4 w-full justify-between">
                    <li>
                        <Link href={'#'}>Home</Link>
                    </li>
                   
                    <li>
                        <Link href={'#'}>Designs</Link>
                    </li>
                    <li>
                        <Link href={'/price-list'}>Price List</Link>
                    </li>
                    <li>
                        <Link href={'#'}>Contact</Link>
                    </li>
                    <li>
                        <Link href={'#'}>About</Link>
                    </li>
                    <li>
                        <Link href={'#'}>Companies</Link>
                    </li>
                   
                    <li>
                        <Link href={'#'}>Project</Link>
                    </li>
                    <li>
                        <Link href={'#'}>Affiliate</Link>
                    </li>
                </ul>
            </div>
            {/* Message send form */}
            <div className={` md:w-8/12 `}>
        <div className=" flex right-10 bottom-4 h-fit rounded-md  justify-end mr-12">
             <form className="w-[450px] relative rounded-md bg-rose-100 p-6">
                 <div className="space-y-3">
                     <label htmlFor="name"></label>
                     <input placeholder="Name" className="input input-bordered rounded-none w-full" type="text" id="name" />
                     <label htmlFor="email"></label>
                     <input placeholder="Email" className="input input-bordered rounded-none w-full" type="text" id="email" />
                     <label htmlFor="website"></label>
                     <input placeholder="Website / Facebook" className="input input-bordered rounded-none w-full" type="text" id="website" />
                     <label htmlFor="design"></label>
                     <input placeholder="Favorite Design" className="input input-bordered rounded-none w-full" type="text" id="design" />
                     <label htmlFor="message"></label>
                     <textarea placeholder="Message" id="message" className="textarea h-24 textarea-bordered w-full rounded-none"></textarea>
                    <div className="flex justify-center w-full">
                    <button className="px-4 py-2 rounded-sm mx-auto bg-blue-500">Submit</button>
                    </div>
                 </div>
             </form>
         </div>
        </div>
        </div>
        <div className=" text-white px-6 py-4">
            <div className="flex gap-4 items-center">
                <Link href={'#'}>Terms and Conditions</Link>
                |
                <Link href={'#'}>Privacy Policy</Link>
            </div>
        </div>
        </div>
    </div>
      
                }
              
            </div>
        );
    };

    export default Footer;