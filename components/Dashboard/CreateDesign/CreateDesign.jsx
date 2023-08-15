

import { useCreateDesign } from "@/components/queries/mutation/design.mutation";
import { useUploadFile } from "@/components/queries/mutation/fileUpload.mutation";
import { useGetDesignCategoriesData } from "@/components/queries/query/designCategories.queries";
import { useGetCategoryData } from "@/components/queries/query/getCategory.query";
import useToast from "@/components/utility/useToast";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateDesign = () => {
  // set toasat showing data
  const { Toast, showToast } = useToast();
  const { mutate: sendDesignData } = useCreateDesign();
  const { mutate: sendFileData } = useUploadFile();
  const { data: getCategories } = useGetDesignCategoriesData({page:1,limit:100});


  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();


  // categories
  const categories = getCategories?.data?.categories;

  // design create loading
  const [designLoading, setDesignLoading] = useState(false);
  // console.log(categories)
  // image ids
  const imageIds = []

  // get category id when select
  const [categoryId,setCategoryId] = useState('')
 //  category
 const {data:category} = useGetCategoryData({categoryId:categoryId})
  // handle create project
  const handleCreateProject = (data) => {


    //loading start
    setDesignLoading(true);

    // selected category for subcategory ids
    const selectedCategory = categories.find(
      (element) => element.categoryId === data.category
    );

    // photo upload in mongodb
    const photo = data.image;
    const photoData = new FormData();
      
    for (const p in photo) {
      photoData.append("files", photo[p]);
    }

    sendFileData(photoData, {
      onSuccess: (res) => {
        const images = res?.data?.files
        showToast("Photo Uploaded", "success");
        for (const i in images) {
          imageIds.push(images[i].fileId);
        }

        // if image uploaded
        if(imageIds.length){
          const projectData = {
            title: data.title,
            description: data.description,
            size: data.size,
            fileFormat: data.fileFormat,
            categoryId: data.category,
            subcategoryId: selectedCategory.subcategoryIds[0],
            imageIds: imageIds,
          };
          console.log(projectData)
          sendDesignData(projectData, {
            onSuccess: (res) => {
              showToast(res.message, "success");
              console.log(res)
              // loading stop
              setDesignLoading(false);
              reset();
            },
            onError: (err) => {
              showToast(err?.response?.data?.message);
              // loading stop
              setDesignLoading(false);
            },
          });
        }
        // loading stop
        setDesignLoading(false);
        // reset
        reset();
      },
      onError: (err) => {
        showToast(err?.response?.data?.message);
        // loading stop
        setDesignLoading(false);
      },
    })
  };
  //    react select

 
console.log(category)
  return (
    <form onSubmit={handleSubmit(handleCreateProject)} className="my-12">
      <Toast />
      <div className="md:w-[768px] mx-auto my-4">
        <h2 className="text-2xl font-bold uppercase bg-[#3B82F6] text-white px-4 py-2">
          Create Project
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        {/* Left side */}
        <div className="sm:w-96 px-2 sm:px-1">
          {/* Images */}
          <div className="border">
            <p className="px-3 py-2 bg-base-200 ">
              {" "}
              Images <span className="text-rose-400">*</span>
            </p>

            <div>
              <input
                className="file-input file-input-bordered w-full rounded-none m-1"
                {...register("image", { required: true })}
                type="file"
                accept="image/*"
                id="images"
                multiple={true}
              />
            </div>
            <span className="text-error block px-3">
              {errors.image && <span>Image is required</span>}
            </span>
          </div>
          {/* Title */}
          <div className="flex flex-col border">
            <label
              className="px-3 py-2 inline-block bg-base-200 w-full"
              htmlFor="title"
            >
              Title
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              className="px-4 m-1 py-2 border border-gray-400"
              id="title"
            />
          </div>
          {/* Description */}
          <div className="flex flex-col border">
            <label
              className="px-3 py-2 inline-block bg-base-200 w-full"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="px-4 h-32 m-1 py-2 border border-gray-400"
              id="description"
            ></textarea>
          </div>
        </div>
        {/* Right side */}
        <div className="sm:w-96 px-2 sm:px-1">
          {/* Size */}
          <div className="flex flex-col border">
            <label
              className="px-3 py-2 inline-block bg-base-200 w-full"
              htmlFor="size"
            >
              Size
            </label>
            <input
              {...register("size", { required: true })}
              className="px-4 m-1 py-2 border border-gray-400"
              type="text"
              id="size"
            />
          </div>
          {/* File Format */}
          <div className="flex flex-col border">
            <label
              className="px-3 py-2 inline-block bg-base-200 w-full"
              htmlFor="fileformat"
            >
              File Format
            </label>
            <input
              {...register("fileFormat", { required: true })}
              className="px-4 m-1 py-2 border border-gray-400"
              type="text"
              id="fileformat"
            />
          </div>
          {/* Design */}
          {/* <div className="flex flex-col border">
            <label
              className="px-3 py-2 inline-block bg-base-200 w-full"
              htmlFor="design"
            >
              Design
            </label>
            <input
              {...register("design", { required: true })}
              className="px-4 m-1 py-2 border border-gray-400"
              type="text"
              id="design"
            />
          </div> */}
         
          {/* Categories */}
          <div className="flex flex-col border">
            <label
              className="px-3 py-2 inline-block bg-base-200 w-full"
              htmlFor="categories"
            >
              Categories
            </label>
            <select
              {...register("category", { required: true })}
              onChange={(e)=>setCategoryId(e.target.value)}
              className="px-4 py-2 bg-white m-1 border border-gray-400"
            >
              {categories?.map((category) => {
                 
                return (
                  <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                );
              })}
            </select>
          </div>

           {/* Tags */}
           {/* <div className="flex flex-col border">
            <label
              className="px-3 py-2 inline-block bg-base-200 w-full"
              htmlFor="subCategories"
            >
              Sub Categories
            </label>
            <select
              {...register("subCategories", { required: true })}
             
              className="px-4 py-2 bg-white m-1 border border-gray-400"
            >
              {categories?.map((subCategory) => {
                return (
                  <option key={subCategory.categoryId} value={category.categoryId}>{category.name}</option>
                );
              })}
            </select>
          </div> */}
        </div>
      </div>
      {/* Submit */}
      <div className="flex justify-center my-2">
        <button className="md:w-[768px] w-full hover:bg-opacity-75 duration-300 font-bold text-white disabled:bg-gray-500 disabled:cursor-not-allowed mx-auto py-2 bg-[#3B82F6]">
          {designLoading ? "Creating..." : "Create Project"}
        </button>
      </div>
    </form>
  );
};

export default CreateDesign;
