import { useRouter } from "next/router";
import { BsStarFill } from "react-icons/bs";
import Reviews from "./Reviews";

const Testimonials = () => {
  const router = useRouter()
  return (
    <div className="md:py-12 py-4">
      <div className="relative flex justify-center">
        {/*  Title */}
        <h2 className="md:text-2xl text-lg absolute bg-red-100 -top-6 px-6 py-2 rounded-full font-bold uppercase">
          Testimonials
        </h2>
      </div>
      <div className="h-full bg-[#E7F4FC] rounded-md md:px-4">
        {/* Rating counts */}
        <div className="flex flex-col md:flex-row text-center md:justify-around pt-12 text-base md:text-xl py-5 ">
          <h3 className="font-bold">29 reviews of this site</h3>
          <div className="flex md:gap-2 items-center justify-center">
            <h4>Avarage </h4>
            <div className="flex gap-1">
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
            </div>
          </div>
        </div>
        {/*  Stars */}
        <div className="grid grid-cols-5 md:gap-4 sm:gap-1">
          <div className="text-center border font-bold space-y-2 bg-white md:py-4 p-1 rounded-md">
            <h2 className="md:text-xl text-sm sm:text-base font-bold">5 Stars</h2>
            <div className="flex md:gap-2 items-center justify-center text-xl">
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
            </div>
            <p className="text-xs sm:text-sm">(25)</p>
          </div>
          <div className="text-center border font-bold space-y-2 bg-white md:py-4 p-1 rounded-md">
            <h2 className="md:text-xl text-sm sm:text-base font-bold">5 Stars</h2>
            <div className="flex md:gap-2 items-center justify-center text-xl">
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#C8E3F6" />
            </div>
            <p className="sm:text-sm text-xs">(25)</p>
          </div>
          <div className="text-center border font-bold space-y-2 bg-white md:py-4 p-1 rounded-md">
            <h2 className="md:text-xl text-sm sm:text-base font-bold">5 Stars</h2>
            <div className="flex md:gap-2 items-center justify-center text-xl">
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#C8E3F6" />
              <BsStarFill color="#C8E3F6" />
            </div>
            <p className="sm:text-sm text-xs">(25)</p>
          </div>
          <div className="text-center border font-bold space-y-2 bg-white md:py-4 p-1 rounded-md">
            <h2 className="md:text-xl text-sm sm:text-base font-bold">5 Stars</h2>
            <div className="flex md:gap-2 items-center justify-center text-xl">
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#C8E3F6" />
              <BsStarFill color="#C8E3F6" />
              <BsStarFill color="#C8E3F6" />
            </div>
            <p className="sm:text-sm text-xs">(25)</p>
          </div>
          <div className="text-center border font-bold space-y-2 bg-white md:py-4 p-1 rounded-md">
            <h2 className="md:text-xl text-sm sm:text-base font-bold">5 Stars</h2>
            <div className="flex md:gap-2 items-center justify-center text-xl">
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#C8E3F6" />
              <BsStarFill color="#C8E3F6" />
              <BsStarFill color="#C8E3F6" />
              <BsStarFill color="#C8E3F6" />
            </div>
            <p className="sm:text-sm text-xs">(25)</p>
          </div>
        </div>
        <div>
          {/* Sort area */}
          <div className="my-6">
            <div className="flex w-full md:text-xl text-sm sm:text-base items-center border-b md:py-5 py-2 border-[#242627]">
              <p className="font-bold md:w-44 px-1 w-20">Sort By</p>
             <div className="flex items-center md:justify-between w-full px-6">
             <button className="border bg-[#FFEFEF] px-4 py-1 border-[#8B8588]  rounded-md">
                Most Relevant
              </button>
              <button className="px-4 py-1">Most Relevant</button>
              <button className="px-4 py-1">
                Delevey Images <span>(23)</span>
              </button>
             </div>
            </div>
            {/* User reviews */}
            <div>
                <Reviews />
            </div>
          </div>
        </div>
       
      </div>
      <div className={`${router.asPath==='/'?'flex justify-start w-full':''}`}>
      <h2 className="md:text-3xl text-lg text-center">100% Satisfaction Guaranteed</h2>
        </div>
    </div>
  );
};

export default Testimonials;
