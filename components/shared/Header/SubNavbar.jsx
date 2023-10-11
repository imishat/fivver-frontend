import Link from "next/link";
import { useSelector } from "react-redux";

const SubNavbar = () => {
  // get user 
const {user} = useSelector(state => state.user)

  return <div className="flex lg:mt-5 justify-center bg-blue-500 text-white">
    <div>
      <ul className="flex flex-wrap md:py-2 items-center">
        {
          user?.role === 'ADMIN' ? <>
          <li>
          <Link className="sm:py-2 py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'/create-design'}>Create</Link>
        </li>
        <li>
          <Link className="sm:py-2 py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'/dashboard'}>Dashboard</Link>
        </li>
        </>
        :''
        }
       
        
        <li>
          <Link className="sm:py-2 py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'#'}>Design</Link>
        </li>
        <li>
          <Link className="sm:py-2 py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'#'}>Companies</Link>
        </li>
        <li>
          <Link className="sm:py-2 py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'/price-list'}>Price List</Link>
        </li>
        <li>
          <Link className="sm:py-2 py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'/project'}>Project</Link>
        </li>
        <li>
          <Link className="sm:py-2 py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={'/about'}>About</Link>
        </li>
        <li>
          <Link className="sm:py-2 py-1 hover:border-b hover:border-white border-b border-transparent duration-300 px-5 w-full inline-block" href={`/user/account ${user?.userId
}`}>Profile</Link>
        </li>
      </ul>
    </div>
  </div>;
};

export default SubNavbar;
