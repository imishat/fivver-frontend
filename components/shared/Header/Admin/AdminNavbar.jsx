import { useAllDesigns } from "@/components/queries/query/designs.query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiMenu4Line } from "react-icons/ri";

const AdminNavbar = () => {
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

  // handleOnchenge
  const [search, setSearch] = useState("");

  // get all designs
  const { data: designData } = useAllDesigns({ designId: search });

  const designs = designData?.data?.designs;

  // handle search
  const handleSearch = (data) => {};

  // handle cart
  const [cartShow, setCartShow] = useState(false);

  return (
    <div className=" z-10 top-0 bg-black text-white container mx-auto ">
      {/* Navbar */}
      <div className="flex justify-between px-4 w-full items-center relative">
        {/* Hamburgar menu */}
        <div className="flex items-center justify-between w-full sm:justify-normal gap-3">
          <div className="lg:hidden">
          <label htmlFor="admin-drawer" className="px-4  drawer-button lg:hidden"> <RiMenu4Line size={30} /></label>
          </div>
          {/* Logo */}

          <img className="md:w-12" src="/images/logo.png" alt="" />

          {/* Cart and seart icon in mobile */}
         
        </div>
     
      </div>
    </div>
  );
};

export default AdminNavbar;
