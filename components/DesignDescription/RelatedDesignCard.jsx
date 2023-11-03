import Link from "next/link";
import { useState } from "react";
import { CgRemoveR } from "react-icons/cg";

const RelatedDesignCard = ({data}) => {
    const [showCart,setShowCart] = useState(false)
    return (
        <div onMouseEnter={()=>setShowCart(true)} onMouseLeave={()=>setShowCart(false)} className="border border-gray-300">
            {
                showCart ? <div className="absolute right-0 top-0 flex justify-center items-center p-2 rounded-md bg-base-200">
                    {/* <button><BiCartAdd size={28} /></button> */}
                    <button className="text-rose-500"><CgRemoveR size={28} /></button>
                </div>:''
            }
            <div className="bg-rose-100 h-40 w-full">
                <img className="w-full h-40" src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${data?.featuredImageId ? data?.featuredImageId : data?.imageIds[0]}`} alt="" />
            </div>
            <Link href={`/design/${data?._id}`} className="px-2 inline-block py-1 text-sm">
                <h3>{data?.title}</h3>
            </Link>
        </div>
    );
};

export default RelatedDesignCard;