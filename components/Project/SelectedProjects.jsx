import Image from "next/image";
import { useEffect } from "react";
import { IoCloseCircle, IoFlashSharp } from 'react-icons/io5';
import { useGetSubCategoryById } from "../queries/query/getSubcategory.query";

function SelectedProjects({select,setSubCatPrice,updateData,singleDesign,setDesignId}) {

    // get sub category by id
    const {data:subcategoryData} = useGetSubCategoryById({subcategoryId:select.subcategoryId})
    // subcategory
    const subcategory = subcategoryData?.data?.subcategory
  
    useEffect(()=>{
      return setSubCatPrice(subcategory?.price)
    },[select.price,updateData,singleDesign.designId,subcategory])

    return (
        <div className="mx-4 border p-1">
                <div className="flex gap-2 items-center">
                  <button onClick={()=>setDesignId(select.designId)} ><IoCloseCircle color="red" /></button>
                  <div className="w-14 h-auto">
                    <Image
                      height={100}
                      width={100}
                      src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${select?.featuredImageId ? select?.featuredImageId : select?.imageIds[0]}`}
                      alt=""
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold">
                        {select.title} x {select.quantity}
                      </h2>
                      <p className="font-bold text-teal-600 flex items-center gap-1">
                        {select.isExtraFastDeliveryEnabled ? (
                          <span className="flex items-center gap-1">
                            <IoFlashSharp />
                            Fast
                          </span>
                        ) : (
                          ""
                        )}
                      </p>
                      
                       
                      
                    </div>
                    <p className="text-sm">{subcategory?.name}</p>
                   
                  </div>
                  <div className="font-bold">
                    ${select.isExtraFastDeliveryEnabled  ? (subcategory?.price  + 10) * select.quantity:subcategory?.price * select.quantity}
                  </div>
                </div>
                
              </div>
    );
}

export default SelectedProjects;