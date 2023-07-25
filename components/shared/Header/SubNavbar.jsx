import Link from "next/link";

const SubNavbar = () => {
  return <div className="flex justify-center bg-blue-500 text-white">
    <div>
      <ul className="flex flex-wrap md:py-2 items-center">
        <li>
          <Link className="sm:py-2 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'#'}>Dashboard</Link>
        </li>
        <li>
          <Link className="sm:py-2 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'#'}>Design</Link>
        </li>
        <li>
          <Link className="sm:py-2 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'#'}>Companies</Link>
        </li>
        <li>
          <Link className="sm:py-2 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'#'}>Price List</Link>
        </li>
        <li>
          <Link className="sm:py-2 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'#'}>Project</Link>
        </li>
        <li>
          <Link className="sm:py-2 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'#'}>About</Link>
        </li>
      </ul>
    </div>
  </div>;
};

export default SubNavbar;
