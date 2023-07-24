import { BsStarFill } from "react-icons/bs";
import Reviews from "./Reviews";

const Testimonials = () => {
  return (
    <div className="py-12">
      <div className="relative flex justify-center">
        {/*  Title */}
        <h2 className="text-2xl absolute bg-red-100 -top-6 px-6 py-2 rounded-full font-bold uppercase">
          Testimonials
        </h2>
      </div>
      <div className="h-full bg-[#E7F4FC] rounded-md px-4">
        {/* Rating counts */}
        <div className="flex justify-around pt-12 text-xl py-5 ">
          <h3 className="font-bold">29 reviews of this site</h3>
          <div className="flex gap-2 items-center">
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
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center font-bold space-y-2 bg-white py-4 rounded-md">
            <h2 className="text-xl font-bold">5 Stars</h2>
            <div className="flex gap-2 items-center justify-center text-xl">
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
            </div>
            <p>(25)</p>
          </div>
          <div className="text-center font-bold space-y-2 bg-white py-4 rounded-md">
            <h2 className="text-xl font-bold">5 Stars</h2>
            <div className="flex gap-2 items-center justify-center text-xl">
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#C8E3F6" />
            </div>
            <p>(25)</p>
          </div>
          <div className="text-center font-bold space-y-2 bg-white py-4 rounded-md">
            <h2 className="text-xl font-bold">5 Stars</h2>
            <div className="flex gap-2 items-center justify-center text-xl">
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#C8E3F6" />
              <BsStarFill color="#C8E3F6" />
            </div>
            <p>(25)</p>
          </div>
          <div className="text-center font-bold space-y-2 bg-white py-4 rounded-md">
            <h2 className="text-xl font-bold">5 Stars</h2>
            <div className="flex gap-2 items-center justify-center text-xl">
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#C8E3F6" />
              <BsStarFill color="#C8E3F6" />
              <BsStarFill color="#C8E3F6" />
            </div>
            <p>(25)</p>
          </div>
          <div className="text-center font-bold space-y-2 bg-white py-4 rounded-md">
            <h2 className="text-xl font-bold">5 Stars</h2>
            <div className="flex gap-2 items-center justify-center text-xl">
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#C8E3F6" />
              <BsStarFill color="#C8E3F6" />
              <BsStarFill color="#C8E3F6" />
              <BsStarFill color="#C8E3F6" />
            </div>
            <p>(25)</p>
          </div>
        </div>
        <div>
          {/* Sort area */}
          <div className="my-6">
            <div className="flex w-full items-center text-xl border-b py-5 border-[#242627]">
              <p className="font-bold w-44">Sort By</p>
             <div className="justify-between flex  w-full px-6">
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
      <div>
            <h2 className="text-3xl">100% Satisfaction Guaranteed</h2>
        </div>
    </div>
  );
};

export default Testimonials;
