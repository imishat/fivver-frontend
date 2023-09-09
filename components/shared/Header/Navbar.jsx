import { useAllDesigns } from "@/components/queries/query/designs.query";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsCart4, BsSearch } from "react-icons/bs";
import { RiCloseLine, RiMenu4Line } from "react-icons/ri";
import { useSelector } from "react-redux";
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
const {products,isAdded,removed}=useSelector((state)=>state.cart)

    // get data from local
    const [projectData, setProjectData] = useState([]);

    useEffect(() => {
      return setProjectData(
        JSON.parse(
          typeof window !== "undefined" &&
            window.localStorage.getItem("selected")
        )
      );
    }, [products?.length,removed]);

    
  // get user
  const { user } = useSelector((state) => state.user);
  return (
    <div className="fixed z-10 top-0 bg-black text-white container mx-auto ">
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

       <div className="w-14">
      <Link href={'/'}>
      <img className="md:w-20" src="/images/logo.png" alt="" />
      </Link>
       </div>

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
        {/* Search box */}
        <form
          onSubmit={handleSubmit(handleSearch)}
          className={`top-8 sm:top-0 sm:w-full w-full fixed sm:relative rounded-md ${
            showSearch
              ? "top-0 w-full z-[9] sm:static left-0"
              : "hidden w-full sm:flex"
          } flex items-center md:w-64 lg:w-80`}
        >
          <div
            className={`absolute left-0 top-10 w-full z-50 rounded-md bg-white ${
              search.length ? "" : "hidden"
            }`}
          >
            <ul>
              {designs?.length
                ? designs?.map((design) => {
                    return (
                      <Link
                        key={design.designId}
                        href={`/design/${design.designId}`}
                        className="w-full inline-block text-black py-2 px-3 border-b"
                      >
                        {design.title + " " + design.categoryName}
                      </Link>
                    );
                  })
                : ""}
            </ul>
          </div>
          <input
            {...register("search", { required: true })}
            className="px-2 md:w-64 border z-50  lg:w-80 w-full py-1 my-2 sm:rounded-r-none md:rounded-md bg-white text-black rounded-l-md "
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="What design are you looking for today?"
          />
          <button
            hidden={!search.length}
            onClick={() => {
              reset();
              setSearch("");
            }}
            className={`absolute right-8 z-50 hidden md:block px-2 py-1 rounded-full text-black ${
              search.length || "hidden"
            }`}
          >
            <RiCloseLine hidden={!search.length} size={24} />
          </button>
          {/* Search btn */}
          <button className="md:absolute  rounded-l-none border-none z-50 sm:border-2 border-white sm:border-none sm:rounded-l-none right-0 px-4 md:px-2 py-1 md:py-1.5 flex items-center h-8 bg-blue-400 rounded-md text-white">
            <BsSearch />
          </button>
        </form>
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
            <li>
              <Link
                className="py-2 hover:border-b hover:border-white border-b border-transparent duration-300 lg:px-3 inline-block"
                href={"#"}
              >
                Notifications
              </Link>
            </li>
            <li>
              <Link
                className="py-2 hover:border-b hover:border-white border-b border-transparent duration-300 lg:px-3 inline-block"
                href={"#"}
              >
                Contact
              </Link>
            </li>

            <li>
              {!user?.email ? (
                <Link
                  className="py-2 hover:border-b hover:border-white border-b border-transparent duration-300 lg:px-3 inline-block"
                  href={"/join"}
                >
                  Join
                </Link>
              ) : (
                <button
                  onClick={() => handleLogout()}
                  className="py-2 flex hover:border-b hover:border-white border-b border-transparent duration-300 lg:px-3 "
                >
                  Logout
                </button>
              )}
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
          <button onClick={() => setCartShow(!cartShow)} className="px-4 relative py-2 ">
            <BsCart4 size={24} />
            {
              projectData?.length ?  <span className="absolute right-0 top-0 bg-rose-500 rounded-full h-6 w-6">{projectData?.length}</span> :''
            }
           
          </button>
        </div>
      </div>
      {/* Cart Sidebar */}
      {<CartSidebar cartShow={cartShow} setCartShow={setCartShow} />}
    </div>
  );
};

export default Navbar;
