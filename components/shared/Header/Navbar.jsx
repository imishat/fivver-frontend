import Link from "next/link";
import { BsCart4, BsSearch } from 'react-icons/bs';

const Navbar = () => {
  return (
    <div className="container mx-auto bg-black">
      {/* Navbar */}
      <div className="flex justify-between px-4 items-center ">
        {/* Logo */}
        <div className="flex px-4 py-2 font-bold text-3xl uppercase">logo</div>
        {/* Search box */}
        <div className="relative">
          <input className="px-2 py-1 my-2 bg-white rounded-md w-80" type="search" placeholder="What design are you looking for today?" name="" id="" /> <button className="absolute right-0.5 top-2.5 px-2 py-1.5 bg-blue-400 rounded-md text-white"><BsSearch /></button>
        </div>
        {/* Navbar menu */}
        <div>
          <ul className="flex gap-4">
            <li>
              <Link className="px-4 py-2 inline-block" href={'#'}>Home</Link>
            </li>
            <li>
              <Link className="px-4 py-2 inline-block" href={'#'}>Messages</Link>
            </li>
            <li>
              <Link className="px-4 py-2 inline-block" href={'#'}>Notifications</Link>
            </li>
            <li>
              <Link className="px-4 py-2 inline-block" href={'#'}>Contact</Link>
            </li>
            <li>
              <Link className="px-4 py-2 inline-block" href={'#'}>Join</Link>
            </li>
          </ul>
        </div>
        {/* Cart icon */}
        <div>
            <button className="px-4 py-2"><BsCart4 size={24} /></button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
