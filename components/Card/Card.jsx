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
        <div className="border w-[320px] md:w-[420px] border-gray-300">
             <Link href={`/designs/company/${data?.title}`} className="px-2 inline-block py-1 text-sm">
            <div className="bg-rose-100 w-[300px] md:w-[355px] h-56 md:h-72">
                <Image height={160} width={224} className="h-56 md:h-72 w-full object-cover" src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${data?.featuredImageId ? data?.featuredImageId : data?.imageIds[0]}`} alt="" />
            </div>
           
                <h3>{data?.title}</h3>
            </Link>
        </div>
    );
};

export default Card;