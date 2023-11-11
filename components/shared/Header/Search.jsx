import MuiAutocomplete from 'mui-autocomplete-suggestions';
import Link from 'next/link';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";

function Search({handleSearch,search,setSearch,showSearch}) {
    const {register,handleSubmit,reset} = useForm()

    const [value, setValue] = useState("");
    return (
        <div>
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
              search.length ? " overflow-y-auto h-96" : "hidden"
            }`}
          >
           
          </div>
          <MuiAutocomplete
          className='bg-white  rounded-l-md'
            value={value}
            onInputChange={(e, v) => {
              setValue(v);
            }}
            onInputDone={(e, v) => {
              console.log(v);
            }}
            sx={{
              width: "300px",
            }}
          />
          {/* <input
            {...register("search", { required: true })}
            className="px-2 md:w-64 border z-50  lg:w-80 w-full py-1 my-2 sm:rounded-r-none md:rounded-md bg-white text-black rounded-l-md "
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="What design are you looking for today?"
          /> */}
          {/* Search btn */}
          <Link  href={`/search/${value}`} className="md:absolute  rounded-l-none border-none z-50 sm:border-2 border-white sm:border-none sm:rounded-l-none right-0 px-4 md:px-2 py-1 md:py-1.5 flex items-center h-8 bg-blue-400 rounded-md text-white">
            <BsSearch />
          </Link>
        </form>
        </div>
    );
}

export default Search;