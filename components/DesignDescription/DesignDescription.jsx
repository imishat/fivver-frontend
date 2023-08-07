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

const DesignDescription = () => {
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
              {designs.map((data, i) => (
                <SwiperSlide key={i} className="flex !gap-2">
                  <div className="border">
                    <img
                      className="w-full h-full"
                      src="https://dummyimage.com/640x4:3/"
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
              Pressure & Soft Washing Door Hanger Design
            </h1>
          </div>
          <div className="my-3 text-sm sm:text-sm md:my-12">
            <ul>
              <li className="flex gap-1">
                <p className="font-bold">Size:</p> 4.5x11, + 0.25 bleed
              </li>
              <li className="flex gap-1">
                <p className="font-bold">File Format:</p> Photoshop File
              </li>
              <li className="flex gap-1">
                <p className="font-bold">Design:</p> Dubble Sidded Door Hanger
                Design
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
          Pressure & Soft Washing Door Hanger Design
        </h2>
        <p className="my-4 text-sm">
          This Door Hanger Design is specially created for Pressure & Soft
          Washing Services. You can definitely use this design for any other
          service/company if you want. If you give me all the information of
          your design, then | will edit this design according to your
          information. Or if you want to create a different design according to
          your information instead of this design, then | can create your
          design. Please start a project for your design. If you feeling any
          difficulties while starting the project, or if you have any questions.
          Then feel FREE to contact us.
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
