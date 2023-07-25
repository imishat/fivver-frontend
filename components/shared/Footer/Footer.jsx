import Link from "next/link";
import { BsFacebook } from "react-icons/bs";

const Footer = () => {
    return (
        <div> 
            {/* Email */}
            <div className="bg-[#1781CB] py-2 text-2xl text-white flex gap-4 px-6"> 
                <p>Email: </p> <p>mahfujurrahman535@gmail.com</p>
            </div>
            {/* Main Footer */}
            <div className="bg-black">

           
            <div className="flex text-white items-center border-b pb-3 px-6 mx-5">
                <div className="flex flex-col space-y-3">
                    <div className="text-center">
                       <div className="flex justify-center">
                       <img src="./images/logo.png" className="w-20" alt="" />
                       </div>
                        <h2 className="text-lg font-bold">mahfujurrahman535</h2>
                        <p>Graphic Designer</p>
                    </div>
                    {/* Social icons */}
                    <div>
                        <ul className="flex gap-2 items-center">
                            <li><a className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block" href="#"><BsFacebook /></a></li>
                            <li><a className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block" href="#"><BsFacebook /></a></li>
                            <li><a className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block" href="#"><BsFacebook /></a></li>
                            <li><a className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block" href="#"><BsFacebook /></a></li>
                            <li><a className="border-2 rounded-full p-2 border-blue-300 bg-white text-blue-600 inline-block" href="#"><BsFacebook /></a></li>
                        </ul>
                    </div>
                </div>
                <div className="py-3 w-8/12 mx-auto">
                    <ul className="flex w-full justify-between">
                        <li>
                            <Link href={'#'}>Home</Link>
                        </li>
                       
                        <li>
                            <Link href={'#'}>Designs</Link>
                        </li>
                        <li>
                            <Link href={'#'}>Price List</Link>
                        </li>
                        <li>
                            <Link href={'#'}>Contact</Link>
                        </li>
                        </ul>
                        <ul className="flex justify-between">
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
                <p className="text-xl">Email: <span>example@gmail.com</span></p>
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
    );
};

export default Footer;