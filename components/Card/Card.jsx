import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiCartAdd } from "react-icons/bi";
import { IoCheckmark } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cart/cart";
import useToast from "../utility/useToast";

const Card = ({data,category}) => {
    const [showCart,setShowCart] = useState(false)

    const { Toast, showToast } = useToast();
 
    const {products}= useSelector(state => state.cart);
    const design = data

    const dispatch = useDispatch()

    const [isAdded,setIsAdded] = useState(false)

    const handleAddProduct = (product) => {
  
        // Check if the product is already in the cart
        const isProductInCart =products.find(item => item.designId=== product
          .designId);
        
        if (!isProductInCart) {
          dispatch(addToCart(product)); // Assuming you're dispatching an action to add to cart
          showToast('Product Added', 'success');
          setIsAdded(true);
        } else {
          showToast('Product is already in the cart', 'error');
          setIsAdded(false);
        }
    
    };
    return (
        <div onMouseEnter={()=>setShowCart(true)} onMouseLeave={()=>setShowCart(false)} className="border border-gray-300 relative">
            {
                showCart ? <div className="absolute right-0 top-0 flex justify-center items-center p-2 rounded-md bg-base-200">
                    {/* <button><BiCartAdd size={28} /></button> */}
                    <button onClick={() => {
                        handleAddProduct(design) 
                        setIsAdded(!isAdded)
                        }} disabled={isAdded} className="text-rose-500">
                            {isAdded?<IoCheckmark size={28} />:<BiCartAdd size={28} />}
                           </button>
                </div>:''
                
            }

            <div className="bg-rose-100 h-56 w-full">
                <Image height={160} width={224} className="w-full h-56 object-cover" src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${data?.featuredImageId ? data?.featuredImageId : data?.imageIds[0]}`} alt="" />
            </div>
            <Link href={`/designs/company/${data?.title}`} className="px-2 inline-block py-1 text-sm">
                <h3>{data?.title}</h3>
            </Link>
        </div>
    );
};

export default Card;