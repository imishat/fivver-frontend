import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/features/cart/cart";
import useToast from "../utility/useToast";

const Card = ({data,category}) => {
  

    const { Toast, showToast } = useToast();
 
    const {products}= useSelector(state => state.cart);
    const design = data

    const isAddedData = products.find(item=>item.designId===data.designId)

    const [showCart,setShowCart] = useState(isAddedData ? true : false)

    const dispatch = useDispatch()

    const isAdded =isAddedData ? true : false

    const handleAddProduct = (product) => {
  
        // Check if the product is already in the cart
        const isProductInCart =products.find(item => item.designId=== product
          .designId);
          dispatch(addToCart(product)); // Assuming you're dispatching an action to add to cart
          showToast('Product Added', 'success');
          
       
    
    };

    const handleDeletedProduct = (design) => {
        dispatch(removeFromCart(design));
      };
    return (
        <div className="border border-gray-400 w-[400px] md:w-[300px] md:h-[220px] xl:w-[290px] xl:!h-[210px]  mb-4 ">
             <Link href={`/designs/company/${data?.title}`} className="h-full inline-block text-sm w-full">
            <div className="bg-rose-100 w-full h-full">
                <Image height={160} width={224} className=" w-full h-full  " src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${data?.featuredImageId ? data?.featuredImageId : data?.imageIds[0]}`} alt="" />
            </div>
                <h3 className="py-1">{data?.title}</h3>
            </Link>
        </div>
    );
};

export default Card;