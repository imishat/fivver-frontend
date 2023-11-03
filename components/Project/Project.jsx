import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsCheckCircleFill } from "react-icons/bs";
import { useGetCategoryData } from "../queries/query/getCategory.query";
import { useGetSubCategoryById } from "../queries/query/getSubcategory.query";
import SelectedProjects from "./SelectedProjects";
import ImageDropdown from "./dropdown/ImageDropdown";

const Project = () => {
  // get single Design
  const [singleDesign, setSingleDesign] = useState({});

  const {
    register,
    handleSubmit,
    watch,reset,
    formState: { errors },
  } = useForm();


  // update local
  const [updateData, setUpdateData] = useState(false);

  // get all selected designs
  const [selectedDesign, setSelectedDesign] = useState([]);
  useEffect(() => {
   
    setSelectedDesign(
      JSON.parse(
        typeof window !== "undefined" && window.localStorage.getItem("designs")
      )
    );
  }, [singleDesign]);

  // get categorie by category id
  const { data: category } = useGetCategoryData({
    categoryId: singleDesign.categoryId,
  });

    // get design id

    const [designId,setDesignId] = useState('')

  // subcategories
  const subcategories = category?.data?.categories[0]?.subcategories;

  // get data from local
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    return setProjectData(
      JSON.parse(
        typeof window !== "undefined" &&
          window.localStorage.getItem("projectData")
      )
    );
  }, [subcategories,designId, updateData,selectedDesign]);

  
  // total price

// qunatity
  const [quantity,setQuantity] = useState(1)

// subCategory Price
const [subCatPrice,setSubCatPrice] = useState(0)

// get sub category by id
const [subCatId,setSubCatId]= useState('')

// get sub category by id
const {data:subcategoryData} = useGetSubCategoryById({subcategoryId:subCatId})
// subcategory
const subcategory = subcategoryData?.data?.subcategory


// extra fast price
const [extraFast,setExtraFast] = useState(false)



useEffect(()=>{
    console.log(designId)
    localStorage.setItem('projectData',JSON.stringify(projectData.filter(project=>project.designId!==designId)))
    setUpdateData(!updateData)
  },[designId])

  // handle selected single design

  const selectedSingleDesign = (data) => {
    const subCat = data.subcategoryId.length ? data.subcategoryId :  subcategories[0]?._id
    const modifyData = {
      status: "Pending",
      title: singleDesign.title,
      designId: singleDesign.designId,
      description: singleDesign.description,
      size: singleDesign.size,
      fileFormat: singleDesign.fileFormat,
      featuredImageId:singleDesign?.featuredImageId,
      categoryId: singleDesign.categoryId,
      subcategoryId: subCat,
      imageIds: singleDesign.imageIds,
      quantity: parseInt(data.quantity),
      isExtraFastDeliveryEnabled: data.extraFast,
      totalCost: extraFast ?
         ((parseInt(subcategory?.price) + 10 )  * quantity)
        
        :
        
        ( parseInt(subcategory?.price) * quantity)
        }
    

    const filterdata = projectData.length? projectData?.filter(
      (data) => data.imageIds[0] !== modifyData.imageIds[0]
    ):''
    if (filterdata.length) {
      // set data if
      window.localStorage.setItem(
        "projectData",
        JSON.stringify([...filterdata, modifyData])
      );
      setUpdateData(!updateData);
    } else {
      typeof window !== "undefined" &&
        window.localStorage.setItem(
          "projectData",
          JSON.stringify([modifyData])
          );
         
      setUpdateData(!updateData);
    }
  };



  // get all price
 const totalPrice = projectData?.length && projectData?.reduce((prev,current) =>  prev + current.totalCost, 0);
  return (
    <div className="w-full ">
      {/* warinig */}
      <div className="md:mb-12 my-7 text-center">
        <h2 className="md:text-3xl sm:text-xl text-base font-bold">
          Please select each step below carefully
        </h2>
      </div>
      {/* Project start */}
      <div className="border border-gray-400 bg-[#F2F9FF]">
        {/* Title */}
        <div className="w-full bg-blue-500 py-4 flex justify-center items-center">
          <h3 className="text-xl font-bold text-white">
            {" "}
            You are starting a project
          </h3>
        </div>
        {/* design select */}
        <div className="mt-5 p-4">
          <p className="text-sm py-1">Choos the design you need</p>
          {/* select */}
          <div className="flex items-center border p-3  bg-white">
            <ImageDropdown
              setSingleDesign={setSingleDesign}
              selectedDesign={selectedDesign}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit(selectedSingleDesign)}>
          {/* Variant */}
          <div className="p-4">
            <p className="text-sm py-1">Choose the design you need</p>
            {/* Select */}
            <div className="border py-1 px-3  bg-white">
              <select
                {...register("subcategoryId", { required: true })}
                onClick={(e)=>setSubCatId(e.target.value)}
                className="w-full bg-white focus-visible::ring-0 focus-visible:outline-none text-sm"
                id="design"
              >
                {subcategories?.map((sub) => {
                  return (
                    <option key={sub._id} className="py-8 flex" value={sub._id}>
                      {sub.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <p className="text-error"> {errors.subcategoryId && <span>This field is required</span>}</p>
          </div>
          {/* Quantity and extra fast */}
          <div className="flex gap-2 justify-between p-4">
            {/* Quantity */}
            <div className="flex items-center gap-3">
              <p>Quantity</p>
              <select
                {...register("quantity", { required: true })}
                onChange={(e)=>{
                  setQuantity(e.target.value)
                  
                }} 
                className="sm:px-12 px-2 py-2 bg-white border"
                id="quantity"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            {/* Fast delivery */}
            <div className="flex items-center gap-2">
              <label htmlFor="extraFast" className="flex items-center gap-1">
                <input
                  
                  {...register("extraFast", { required: false })}
                  onChange={(e)=>{
                    e.target.checked ? setExtraFast(true) : setExtraFast(false)
                  }}
                  className="checkbox checkbox-sm rounded-none checkbox-bordered input-info"
                  type="checkbox"
                  id="extraFast"
                />
                <p className="text-sm">Extra-fast 1-day delivery</p>
                <p className="text-xl font-semibold text-[#3695E0]">$10</p>
              </label>
            </div>
          </div>
          {/* info and total */}
          <div className="p-3 flex justify-between w-full items-center">
            {/* Info */}
            <div>
              <ul>
                <li className="flex items-center gap-1">
                  {" "}
                  <span>
                    <BsCheckCircleFill color="#3695E0" />
                  </span>
                  2 Days Delivery
                </li>
                <li className="flex items-center gap-1">
                  {" "}
                  <span>
                    <BsCheckCircleFill color="#3695E0" />
                  </span>
                  Unlimited Revisions
                </li>
                <li className="flex items-center gap-1">
                  {" "}
                  <span>
                    <BsCheckCircleFill color="#3695E0" />
                  </span>
                  PSD Source File
                </li>
                <li className="flex items-center gap-1">
                  {" "}
                  <span>
                    <BsCheckCircleFill color="#3695E0" />
                  </span>
                  Print Ready PDF or JPEG File
                </li>
              </ul>
            </div>
            {/* total */}
            <div className="flex justify-center items-center w-1/2 border py-4 h-[80px] bg-white">
              <div className="">
                <h3 className="text-xl">Total</h3>
                <h1 className="text-3xl font-semibold text-[#3695E0]">$
             
                
                {
               
                extraFast ?
                 ((parseInt(subcategory?.price) + 10 )  * quantity
                 ||
                 subCatPrice)
                
                :
                
                ( parseInt(subcategory?.price) * quantity 
                ||
                subCatPrice)}</h1>
              </div>
            </div>
          </div>
          {/* save btn */}
          <div className="w-full p-3 flex justify-center items-center">
            <button disabled={!subcategory} className="flex items-center gap-3 hover:bg-opacity-70 bg-[#3695E0] disabled:bg-gray-500 w-full text-white justify-center py-2 text-xl font-semibold">
              Save
            </button>
          </div>
        </form>
        {/* saved data */}
        {projectData?.length ?
        projectData?.map((select,i) =><SelectedProjects setDesignId={setDesignId} singleDesign={singleDesign} setSubCatPrice={setSubCatPrice} updateData={updateData} key={i} select={select} />):''}

        {/* btn */}
        <div className="w-full p-3 flex justify-center items-center">
         {projectData?.length ? <Link href={'/project/payment'} className="flex items-center gap-3 hover:bg-opacity-70 bg-[#3695E0] w-full text-white justify-center py-2 text-xl font-semibold">
            Continue (${totalPrice})
          </Link>:""}
        </div>
        {/* hint */}
        <div className="flex justify-center p-3 items-center">
          <p className="py-4">
            Go to the payment option by clicking "Continue"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Project;
