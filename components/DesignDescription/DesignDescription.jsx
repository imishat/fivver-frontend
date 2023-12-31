// Import Swiper React components
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { useState } from "react";
import "./styles.module.css";
// import required modules
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import { useAllDesigns } from "../queries/query/designs.query";
import { addToCart } from "../redux/features/cart/cart";
import useToast from "../utility/useToast";
import RelatedDesignCard from "./RelatedDesignCard";

import { removeFromCart } from "@/components/redux/features/cart/cart";
import { PhotoProvider, PhotoView } from "react-photo-view";

const DesignDescription = ({ data }) => {
  const { Toast, showToast } = useToast();

  const { products } = useSelector((state) => state.cart);
  const design = data?.data?.designs[0];
  // console.log(design);

  // router
  const router = useRouter()

  const [isAdded, setIsAdded] = useState(false);
  console.log(design)

  const [producr, setPproducr] = useState()
  // send data in redux cart store
  const dispatch = useDispatch();

  const handleAddProduct = (product) => {
    // Check if the product is already in the cart
    const isProductInCart = products?.length && products.find(
      (item) => item.designId === product.designId
    );
    setPproducr(isProductInCart);

    dispatch(addToCart(product)); // Assuming you're dispatching an action to add to cart
    showToast("Product Added", "success");
    setIsAdded(true)

  };
  const handleDeletedProduct = (design) => {
    dispatch(removeFromCart(design));
    setPproducr(design);
    showToast("Product Removed", "euccess");
    setIsAdded(false)
  };

  const [projectId, setProjectId] = useState("");
  const { data: projectData } = useAllDesigns({
    designId: projectId,
    page: 1,
    limit: 1000,
  });
  // handle project start
  const handleProjectStart = (id) => {
    setProjectId(id);

    localStorage.setItem(
      "designs",
      JSON.stringify([
        projectData?.data?.designs?.find((project) => project.designId === id),
      ])
    );
    router.push("/project");
  };
  return (
    <div>
      <Toast />
      <div className="w-full sm:flex justify-center my-12 md:gap-4">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper sm:!w-[640px] sm:!h-[550px] md:!w-[750px] !mx-0">
          {design?.imageIds?.map((id, i) => (
            <SwiperSlide key={i} className="flex !gap-2 sm:!w-[640px] sm:!h-[500px] md:!w-[750px]">
              <div className="border h-full w-full sm:!w-[640px] sm:!h-[100%] md:!w-[750px]">
                {/* <Image
                  height={300}
                  width={850}
                  className="w-full h-full object-content"
                  src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${id}`}
                  alt=""
                /> */}

                <PhotoProvider
                >
                  <PhotoView src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${id}`}>
                    <img
                      height={300}
                      width={850}
                      className="w-full h-full object-content"
                      src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${id}`}
                      alt=""
                    />

                  </PhotoView>
                </PhotoProvider>

              </div>
            </SwiperSlide>
          ))}

        </Swiper>

        <div className="sm:w-80 p-4 bg-[#F2F9FF]">
          <div>
            <h1 className="md:text-2xl sm:text-xl font-bold">
              {design?.title}
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
                <p className="font-bold">Category
                  :</p>{" "}
                {design?.categoryName
                }
              </li>
              <li className="flex gap-1">
                <p className="font-bold">Subcategory:</p>{" "}
                {design?.subcategory[0]?.name}
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            {
              !isAdded ? (
                <button
                  className="py-2 w-full hover:bg-blue-200 duration-300 border-2 rounded-full border-blue-400 text-[#1B8CDC] font-bold text-xl"
                  onClick={() => handleAddProduct(design)}
                >
                  Add to
                </button>
              ) : (
                <button
                  className="py-2 w-full hover:bg-blue-200 duration-300 border-2 rounded-full border-blue-400 text-[#1B8CDC] font-bold text-xl"
                  onClick={() =>
                    handleDeletedProduct(design)
                  }
                >
                  Removed
                </button>
              )
            }
            {/* <p>{design.isAdded}</p> */}
            <button onClick={() => handleProjectStart(design.designId)} className="py-2 w-full hover:bg-blue-600 duration-300 text-white font-bold border bg-[#1B8CDC] rounded-full border-blue-400 text-xl">
              Project Start
            </button>
          </div>
        </div>
      </div>
      <div className="px-8">
        <h2 className="sm:text-3xl text-lg font-semibold my-3">
          {design?.title}
        </h2>
        <div className="my-4 description text-sm">
          {design?.description?.length && parse(design?.description)}
        </div>
      </div>
      {/* Design Related */}
      <div className="bg-[#F2F9FF] md:p-8 h-full">
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold p-3">Related Design</h2>
        </div>
        <div className="grid sm:grid-cols-2 p-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {
            design?.relatedDesignIds?.map((data, i) => {
              return <RelatedDesignCard key={i} data={data} />
            })
          }


        </div>
      </div>
    </div>
  );
};

export default DesignDescription;
