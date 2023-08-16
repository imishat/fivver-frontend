// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./styles.module.css";
// import required modules
import { Navigation } from "swiper/modules";

const DesignDescription = ({data:designData}) => {
  console.log(designData)
  const design = designData?.data?.design
  // import fake data
  const [designs, setDesigns] = useState([]);
  useEffect(() => {
    axios.get(`/design.json`).then((res) => {
      setDesigns(res.data);
    });
  }, []);
  return (
    <div>
      <div className="w-full sm:flex justify-center my-12 md:gap-4">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper sm:!w-[640px] sm:!h-[380px]"
        >
          <div>
            <div>
              {design?.imageIds?.map((id, i) => (
                <SwiperSlide key={i} className="flex !gap-2">
                  <div className="border">
                    <img
                      className="w-full h-full"
                      src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${id}`}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </div>
        </Swiper>

        <div className="sm:w-80 p-4 bg-[#F2F9FF]">
          <div>
            <h1 className="md:text-2xl sm:text-xl font-bold">
            {design?.title +' '+ design?.categoryName}
            </h1>
          </div>
          <div className="my-3 text-sm sm:text-sm md:my-12">
            <ul>
              <li className="flex gap-1">
                <p className="font-bold">Size:</p> {design?.size}
              </li>
              <li className="flex gap-1">
                <p className="font-bold">File Format:</p> {design?.fileFormat}
              </li>
              <li className="flex gap-1">
                <p className="font-bold">Design:</p> {design?.subcategory[0].name}
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <button className="py-2 w-full hover:bg-blue-200 duration-300 border-2 rounded-full border-blue-400 text-[#1B8CDC] font-bold text-xl">
              Add to cart
            </button>
            <button className="py-2 w-full hover:bg-blue-600 duration-300 text-white font-bold border bg-[#1B8CDC] rounded-full border-blue-400 text-xl">
              Project Start
            </button>
          </div>
        </div>
      </div>
      <div className="px-8">
        <h2 className="sm:text-3xl text-lg font-semibold my-3">
          {design?.title +' '+ design?.categoryName}
        </h2>
        <p className="my-4 text-sm">
         {design?.description}
        </p>
        <h3 className="sm:text-2xl text-lg font-bold my-8 ">
          If you just want to get the template/source file of this design,{" "}
          <br /> then you can{" "}
          <Link href={"#"} className="border-b border-black">
            contact us by clicking here.
          </Link>{" "}
          And show us this design.
        </h3>
      </div>
    </div>
  );
};

export default DesignDescription;
