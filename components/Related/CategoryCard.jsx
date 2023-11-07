import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CategoryCard = ({data}) => {
    const [showCart,setShowCart] = useState(false)

    return (
        <div onMouseEnter={()=>setShowCart(true)} onMouseLeave={()=>setShowCart(false)} className="border w-full border-gray-300 relative !h-[100%]  !mb-6">
            <div className="bg-rose-100 w-full h-full">
            <Image height={160} width={224} className="w-full object-cover h-full" src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${data?.featuredImageId ? data?.featuredImageId : data?.imageIds[0]}`} alt="" />
            </div>
            <Link href={`/designs/category/${data?.categoryId}`} className="px-2 inline-block py-1 text-sm">
                <h3>{data?.name}</h3>
            </Link>
        </div>
    );
};

export default CategoryCard;