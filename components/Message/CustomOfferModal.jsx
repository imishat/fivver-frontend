import { useSocketChat } from "@/hooks/useSocketChat";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useCreateMessage } from "../queries/mutation/message.mutation";
import { useGetDesignCategoriesData } from "../queries/query/designCategories.queries";
import { useGetSubCategoryById } from "../queries/query/getSubcategory.query";
import { updateState } from "../redux/features/update/updateSlice";
import useToast from "../utility/useToast";
import CustomDropdown from "./CustomDropdown/CustomDropdown";

function CustomOfferModal({project,reply,setReply,update,setUpdate}) {

    // react hook form
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm()
// get user 
const {user} = useSelector(state => state.user)


const dispatch = useDispatch()
// get update with redux
const messageUpdate = useSelector((state) => state.update);
 
 // create message 
 const {mutate:createMessage} = useCreateMessage()

  // get all categories
    // get all categories
    const { data: getCategories } = useGetDesignCategoriesData({
      page: 1,
      limit: 100,
    });



    const {  sendMessage, returnMessage } = useSocketChat();
  





    // categories
    const categories = getCategories?.data?.categories;
// select change
const handleSelectChange=e=>{
  console.log(e.target.value)
}
      // get category id when select
  const [subCategoryId, setSubCategoryId] = useState("");

      //  category
  const { data: subCategoryData } = useGetSubCategoryById({ subcategoryId:subCategoryId });
    // categories
    const selectSubCategory = subCategoryData?.data?.subcategory;
    // console.log(selectSubCategory)

    // category
    const [singleDesign,setSingleDesign] = useState({})
    // console.log(singleDesign)
   // toast
   const { Toast, showToast } = useToast();

      // ================= Custom Offer ===================
  // category
  // const [selectCategory,setSelectCategory] = useState({})
  const handleCustomOffer = data =>{
    // console.log(data,singleDesign)
    const messageData = {
      type:'offer',...data,
        categoryName: singleDesign?.name,
        categoryId:singleDesign?.categoryId,
        price: selectSubCategory?.price,
        imageId: singleDesign?.imageIds[0],
        userId: project?.startedBy,
        receiverId: project?.startedBy,
        reply,
        projectId:project?.projectId
      
     
    }
       // send
       sendMessage(messageData)
       dispatch(updateState(!messageUpdate?.update))
      //  setReply({})
       showToast('Offer Send','success')
     
    reset()
  }




    return (
<dialog id="custom_offer" className="modal">
  <Toast/>
  <form onSubmit={handleSubmit(handleCustomOffer)} className="modal-box rounded-none  max-w-md bg-blue-50 p-0">
    <div className="bg-blue-400 py-2 text-white font-bold text-center">
        <h2>Create a single payment offer</h2>
    </div>
    <div className="px-4 space-y-2 mt-3">
      {/* category */}
      <div>
        <h2 className="font-bold pb-1">Category</h2>
        <div>
        <CustomDropdown
              setSingleDesign={setSingleDesign}
              categories={categories}
            />
        </div>
      </div>
      {/* Sub Category */}
      <div>
        <h2 className="font-bold pb-1">Sub Category</h2>
        <div>
        <select {...register("subCategory", { required: true })} onChange={(e)=>setSubCategoryId(e.target.value)} onClick={(e)=>setSubCategoryId(e.target.value)}   className="px-6 bg-base-100 outline-none border border-gray-400 select-sm rounded-none w-full">
          {
            singleDesign?.subcategories?.map(sub=><option  key={sub?._id} value={sub?._id}>{sub?.name}</option>)
          }
        </select>
        </div>
      </div>
      {/* Delivered and price */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2>Delivery</h2>
          <select  {...register("delivered", { required: true })}  className="px-6 bg-base-100 outline-none border border-gray-400 select-sm rounded-none">
            <option value="1">1 Days&nbsp;</option>
            <option value="2">2 Days&nbsp;</option>
            <option value="3">3 Days&nbsp;</option>
            <option value="3">4 Days&nbsp;</option>
          </select>
        </div>
      
        <div className="flex items-center gap-2">
        <h2>Price</h2>
          <div className="px-6 bg-base-100 outline-none border border-gray-400 select-sm rounded-none">
          {selectSubCategory?.price} $
          </div>
        </div>
      </div>
      <div>
        <textarea  {...register("message", { required: true })}  className="textarea textarea-bordered w-full rounded-none min-h-16 h-20"></textarea>
      </div>
     
    </div>
      {/* Cancel and send */}
    <span className="modal-action px-5 pb-4 justify-between">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn capitalize btn-sm rounded-none bg-gray-500 hover:bg-gray-600 text-white">Cancel</button>
      </form>
        {/* if there is a button in form, it will close the modal */}
        <button className="btn capitalize btn-sm rounded-none bg-blue-600 hover:bg-blue-500 text-white">Send Offer</button>
    </span>
  </form>
</dialog>
    );
}

export default CustomOfferModal;