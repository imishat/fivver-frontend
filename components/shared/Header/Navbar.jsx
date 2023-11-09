import Notification from "@/components/Notification/Notification";
import { useAllDesigns } from "@/components/queries/query/designs.query";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'react-autocomplete-input/dist/bundle.css';
import { useForm } from "react-hook-form";
import { BsCart4, BsSearch } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { RiMenu4Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import Search from "./Search";


const CartSidebar = dynamic(() => import("./Cart/CartSidebar"), { ssr: false });

const Navbar = () => {
  // responsive menu hide and show
  const [showMenu, setShowMenu] = useState(false);
  // search box show and hide
  const [showSearch, setShowSearch] = useState(false);
  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // router
  const router = useRouter();

  // handleOnchenge
  const [search, setSearch] = useState("");

  // get all designs
  const { data: designData } = useAllDesigns({ designId: search });

  const designs = designData?.data?.designs;

  // handle search
  const handleSearch = (data) => {};

  // handle cart
  const [cartShow, setCartShow] = useState(false);

  // logout
  const handleLogout = () => {
    typeof window !== "undefined" && localStorage.removeItem("accessToken");
    typeof window !== "undefined" && localStorage.removeItem("refreshToken");
    router.push("/join");
  };
  // get selected
  const { products, isAdded, removed } = useSelector((state) => state.cart);

  // get data from local
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    return setProjectData(
      JSON.parse(
        typeof window !== "undefined" && window.localStorage.getItem("selected")
      )
    );
  }, [products?.length, removed]);

  // get user
  const { user } = useSelector((state) => state.user);
  return (
    <div className="fixed z-10 top-0 bg-black text-white w-full ">
      {/* Navbar */}
      <div className="flex justify-between px-4 w-full items-center relative">
        {/* Hamburgar menu */}
        <div className="flex items-center justify-between w-full sm:justify-normal gap-3">
          <div className="md:hidden">
            <button onClick={() => setShowMenu(!showMenu)}>
              <RiMenu4Line size={30} />
            </button>
          </div>
          {/* Logo */}

          <div className="w-14 xl:mr-12">
            <Link href={"/"}>
              <img className="md:w-20" src="/images/logo.png" alt="" />
            </Link>
          </div>
  {/* Search box */}
  <Search search={search} setSearch={setSearch} showSearch={showSearch} handleSearch={handleSearch} />
          {/* Cart and seart icon in mobile */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:absolute sm:hidden right-0.5  top-2.5 px-2 py-1.5 bg-blue-400 rounded-md  text-white"
            >
              <BsSearch />
            </button>
            {/* Cart icon */}
            <button
              onClick={() => setCartShow(!cartShow)}
              className="px-4 py-2 "
            >
              <BsCart4 size={24} />
            </button>
          </div>
        </div>
      
        {/* Navbar menu */}
        <div className="md:ml-1">
          <ul
            className={`md:flex absolute md:static left-0 duration-300 ${
              showMenu ? "duration-300 top-12" : "-top-64 -z-20"
            } bg-black md:bg-transparent px-4 md:gap-2 lg:gap-4`}
          >
            <li>
              <Link
                className="py-2 hover:border-b hover:border-white border-b border-transparent duration-300 lg:px-3 inline-block"
                href={"/"}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="py-2 hover:border-b hover:border-white border-b border-transparent duration-300 lg:px-3 inline-block"
                href={"/message"}
              >
                Messages
              </Link>
            </li>
            <div className="dropdown">
  <label tabIndex={0} className="py-2 hover:border-b border-b border-transparent duration-300 lg:px-3 inline-block">
                Notifications</label>
  <ul tabIndex={0} className="dropdown-content dropdown-left dropdown-bottom -left-56 text-black rounded-none border z-[1] bg-base-100 menu p-2 shadow w-96">
    <Notification />
  </ul>
</div>
              
            
            <li>
              <Link
                className="py-2 hover:border-b hover:border-white border-b border-transparent duration-300 lg:px-3 inline-block"
                href={"#"}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Cart icon */}
        <div className="hidden sm:flex items-center">
          {/* search icon */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:absolute sm:hidden right-0.5  top-2.5 px-2 py-1.5 bg-blue-400 rounded-md  text-white"
          >
            <BsSearch />
          </button>
          {/* Cart icon */}
          <button
            onClick={() => setCartShow(!cartShow)}
            className="px-4 relative py-2 "
          >
            <BsCart4 size={24} />
            {projectData?.length ? (
              <span className="absolute right-0 top-0 bg-rose-500 rounded-full h-6 w-6">
                {projectData?.length}
              </span>
            ) : (
              ""
            )}
          </button>
          {!user?.email ? (
                    <Link
                      className="py-2 hover:border-b duration-300 lg:px-3 inline-block"
                      href={"/join"}
                    >
                      Join
                    </Link>
                  ) : (
                    <button className=" relative py-2 ">
                    <details className="dropdown">
                      <summary className="btn btn-sm flex px-1.5  items-center rounded-full">
                        <FaUserAlt size={20} />
                      </summary>
                      <ul className="p-2 flex flex-col shadow  text-left rounded-none dropdown-left absolute -left-64  text-black bg-base-100 w-64 z-[1]">
                        <Link
                          className="py-2 hover:border-b hover:border-white hover:bg-base-300 border-b border-gray-300 duration-300 lg:px-3 inline-block"
                          href={"/user/affiliate"}
                        >
                          Affiliate
                        </Link>
                        <Link
                          className="py-2 hover:border-b hover:border-white hover:bg-base-300 border-b border-gray-300 duration-300 lg:px-3 inline-block"
                          href={"/user/affiliate/billing-info"}
                        >
                          Billing Information
                        </Link>
                        <Link
                          className="py-2 hover:border-b hover:border-white hover:bg-base-300 border-b border-gray-300 duration-300 lg:px-3 inline-block"
                          href={"/user/affiliate/Configer-info"}
                        >
                          Payment Method
                        </Link>
                        <Link
                          className="py-2 hover:border-b hover:border-white hover:bg-base-300 border-b border-gray-300 duration-300 lg:px-3 inline-block"
                          href={"/user/affiliate/payment-info"}
                        >
                         Affiliate payment history
                        </Link>
                        <Link
                          className="py-2 hover:border-b hover:border-white hover:bg-base-300 border-b border-gray-300 duration-300 lg:px-3 inline-block"
                          href={"/user/affiliate/payment-method"}
                        >
                        withdraw request history
                        </Link>
        
                        <li>
                        <button
                      onClick={() => handleLogout()}
                      className="py-2 w-full hover:border-b bg-rose-100 text-rose-600 hover:border-white hover:bg-base-300 border-b border-gray-300 duration-300 lg:px-3 "
                    >
                      Logout
                    </button>
                        </li>
                      </ul>
                    </details>
                  </button>
                   
                  )}
         
        </div>
      </div>
      {/* Cart Sidebar */}
      {<CartSidebar cartShow={cartShow} setCartShow={setCartShow} />}
      {/* User Profile */}
    </div>
  );
};

export default Navbar;
