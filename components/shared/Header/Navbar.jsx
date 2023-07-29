import Link from "next/link";
import { useState } from "react";
import { BsCart4, BsSearch } from 'react-icons/bs';
import { RiMenu4Line } from "react-icons/ri";

const Navbar = () => {
  // responsive menu hide and show
  const [showMenu,setShowMenu] = useState(false)
  // search box show and hide
  const [showSearch,setShowSearch] = useState(false)
  return (
    <div className="md:py-2 bg-black text-white container mx-auto">
      {/* Navbar */}
      <div className="flex justify-between px-4 items-center relative">
        {/* Hamburgar menu */}
        <div className="flex items-center gap-3">
        <div className="md:hidden">
          <button onClick={()=>setShowMenu(!showMenu)}>
            <RiMenu4Line size={30} />
          </button>
        </div>
        {/* Logo */}
       
          <img className="md:w-20" src="/images/logo.png" alt="" />
          </div>
        {/* Search box */}
        <div className={`relative ${showSearch?' top-10 absolute md:static w-full left-0':'hidden md:flex'} flex items-center md:w-64 lg:w-80`}>
          <input className="px-2 py-1 my-2 bg-white text-black rounded-md w-full" type="search" placeholder="What design are you looking for today?" name="" id="" /> 
          {/* Search btn */}
          <button className="md:absolute right-0 px-4 md:px-2 py-1 md:py-1.5 flex items-center h-8 bg-blue-400 rounded-md text-white"><BsSearch /></button>

        </div>
        {/* Navbar menu */}
        <div className="md:ml-1">
          <ul className={`md:flex absolute md:static left-0 duration-300 ${showMenu?'duration-300 top-12':'-top-64 -z-20'} bg-black md:bg-transparent px-4 md:gap-2 lg:gap-4`}>
            <li>
              <Link className="py-2 hover:border-b hover:border-white border-b border-transparent duration-300 lg:px-3 inline-block" href={'/'}>Home</Link>
            </li>
            <li>
              <Link className="py-2 hover:border-b hover:border-white border-b border-transparent duration-300 lg:px-3 inline-block" href={'#'}>Messages</Link>
            </li>
            <li>
              <Link className="py-2 hover:border-b hover:border-white border-b border-transparent duration-300 lg:px-3 inline-block" href={'#'}>Notifications</Link>
            </li>
            <li>
              <Link className="py-2 hover:border-b hover:border-white border-b border-transparent duration-300 lg:px-3 inline-block" href={'#'}>Contact</Link>
            </li>
            <li>
              <Link className="py-2 hover:border-b hover:border-white border-b border-transparent duration-300 lg:px-3 inline-block" href={'/join'}>Join</Link>
            </li>
          </ul>
        </div>
        {/* Cart icon */}
        <div className="flex items-center">
        <button onClick={()=>setShowSearch(!showSearch)} className="md:absolute md:hidden right-0.5 top-2.5 px-2 py-1.5 bg-blue-400 rounded-md text-white"><BsSearch /></button>
            <button className="px-4 py-2"><BsCart4 size={24} /></button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
