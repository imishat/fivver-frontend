import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CategoryCard = ({data}) => {
    const [showCart,setShowCart] = useState(false)


    // const dispatch = useDispatch()

    // const [isAdded,setIsAdded] = useState(false)

    // const handleAddProduct = (product) => {
  
    //     // Check if the product is already in the cart
    //     const isProductInCart =data.find(item => item.designId=== product
    //       .designId);
        
    //     if (!isProductInCart) {
    //       dispatch(addToCart(product)); // Assuming you're dispatching an action to add to cart
    //       showToast('Product Added', 'success');
    //       setIsAdded(true);
    //     } else {
    //       showToast('Product is already in the cart', 'error');
    //       setIsAdded(false);
    //     }
    
    // };
    return (
        <div onMouseEnter={()=>setShowCart(true)} onMouseLeave={()=>setShowCart(false)} className="border w-full border-gray-300 relative">
            
            <div className="bg-rose-100 h-56 w-full">
            <Image height={160} width={224} className="w-full h-56 object-cover" src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${data?.featuredImageId ? data?.featuredImageId : data?.imageIds[0]}`} alt="" />
            </div>
            <Link href={`/designs/category/${data?.categoryId}`} className="px-2 inline-block py-1 text-sm">
                <h3>{data?.name}</h3>
            </Link>
        </div>
    );
};

export default CategoryCard;