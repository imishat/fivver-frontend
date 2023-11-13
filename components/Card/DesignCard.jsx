import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CgRemoveR } from "react-icons/cg";

const DesignCard = ({data}) => {
    const [showCart,setShowCart] = useState(false)
    return (
        <div onMouseEnter={()=>setShowCart(true)} onMouseLeave={()=>setShowCart(false)} className="border border-gray-300 mb-8 w-[160px] h-[120px] md:w-[300px] md:h-[220px] xl:w-[290px] xl:!h-[210px] relative">
              {
                showCart ? <div className="absolute right-0 top-0 flex justify-center items-center p-2 rounded-md bg-base-200">
                    {/* <button><BiCartAdd size={28} /></button> */}
                    <button className="text-rose-500"><CgRemoveR size={28} /></button>
                </div>:''
            }
            <div className="bg-rose-100 h-56 w-full">
            <Image height={160} width={224} className="w-full h-56 object-cover" src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${data?.featuredImageId ? data?.featuredImageId : data?.imageIds[0]}`} alt="" />
            </div>
            <Link href={`/design/${data?.designId}`} className="px-2 inline-block py-1 text-sm">
                <h3>{data?.title}</h3>
            </Link>
        </div>
    );
};

export default DesignCard;