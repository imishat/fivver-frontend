import Image from "next/image";
import Link from "next/link";

const Card = ({data,category}) => {

    return (
        <div className="border border-gray-300">
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