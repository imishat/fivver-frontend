import Image from "next/image";
import { useGetSubCategoryById } from "../queries/query/getSubcategory.query";

const PaymentProjectCard = ({project}) => {

    // get sub category by id
    const {data: subcategories} = useGetSubCategoryById({subcategoryId:project.subcategoryId})
    const subCategory = subcategories?.data?.subcategory


    return (
        <div className="px-4 border-b border-white py-2 bg-[#C6DFF5]">
        <div className="sm:flex justify-between items-center">
            <div className="flex items-center gap-4">
            <div className="w-24 h-16 bg-rose-200">
            <Image height={160} width={224} className="w-24 h-16 object-cover" src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${project?.featuredImageId ? project?.featuredImageId : project?.imageIds[0]}`} alt="" />
            </div>
            <div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
            </div>
            </div>
            <div className="text-center">
                <p>Quantity - {project.quantity} </p>
            </div>
        </div>
        <div className="sm:flex space-y-3 text-center justify-between items-center">
            <p>{subCategory?.name}</p>
            <div className="flex justify-center items-center gap-2">
                <input disabled defaultChecked={project.isExtraFastDeliveryEnabled} type="checkbox" className="toggle toggle-info disabled:toggle-info disabled:cursor-pointer border border-info toggle-sm w-9" id="" />
                Extra fast 1 day delivery <span className="text-blue-500 font-bold">$10</span>
            </div>
                <h2 className="text-4xl font-bold px-4">${project?.totalPrice}</h2>
        </div>
    </div>
    );
};

export default PaymentProjectCard;