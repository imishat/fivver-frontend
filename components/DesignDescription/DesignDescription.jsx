// Import Swiper React components
import parse from 'html-react-parser';
import "react-quill/dist/quill.snow.css";
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.module.css";
// import required modules
import { Navigation } from "swiper/modules";
import RelatedDesignCard from './RelatedDesignCard';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/features/cart/cart';
import useToast from '../utility/useToast';

const DesignDescription = ({data:designData}) => {

  const { Toast, showToast } = useToast();
 
  const {products}= useSelector(state => state.cart);
  const design = designData?.data?.design

  

  const [isAdded, setIsAdded] = useState(false);

  // send data in redux cart store
  const dispatch = useDispatch()

  const handleAddProduct = (product) => {
  
      // Check if the product is already in the cart
      const isProductInCart =products.find(item => item.designId=== product
        .designId);
      
      if (!isProductInCart) {
        dispatch(addToCart(product));
         // Assuming you're dispatching an action to add to cart
        showToast('Product Added', 'success');
        setIsAdded(true);
      } else {
        showToast('Product is already in the cart', 'error');
        setIsAdded(false);
       
      }
  
  };

  return (
       <div>
               <Toast/>
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
                <p className="font-bold">Design:</p> {design?.subcategory[0].name}
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <button className="py-2 w-full hover:bg-blue-200 duration-300 border-2 rounded-full border-blue-400 text-[#1B8CDC] font-bold text-xl"onClick={() => handleAddProduct(design)} disabled={
              
              isAdded}>
            {isAdded ? 'Product added ' : 'Add to cart'}
            </button>
            <p>{design.isAdded}</p>
            <button className="py-2 w-full hover:bg-blue-600 duration-300 text-white font-bold border bg-[#1B8CDC] rounded-full border-blue-400 text-xl">
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
          {parse(design?.description)}
        </div>
      </div>

      {/* Design Related */}
      <div className="bg-[#F2F9FF] md:p-8 h-full">
            <div className="flex justify-center">
                <h2 className="text-3xl font-bold p-3">Related Design</h2>
            </div>
            <div className="grid sm:grid-cols-2 p-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {
                    design?.relatedDesigns?.map((data,i)=><RelatedDesignCard data={data} key={i} />)
                }
            </div>
        </div>
    </div>
  );
};

export default DesignDescription;
