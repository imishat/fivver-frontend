import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const CreateProject = () => {
    // react hook form
 const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  // handle create project
  const handleCreateProject = (data) =>{
    console.log(data)
  }

//    react select

// categories 
const [categoriesValue,setCategoriesValue] = useState([])
// fetch data
useEffect(()=>{
    axios.get(`/data/categories.json`)
    .then(res=>{
        setCategoriesValue(res.data)
    })
},[])
    return (
        <form onSubmit={handleSubmit(handleCreateProject)} className="my-12">
             <div className="md:w-[768px] mx-auto my-4">
                    <h2 className="text-2xl font-bold uppercase bg-[#3B82F6] text-white px-4 py-2">Create Project</h2>
                </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  {/* Left side */}
                  <div className="sm:w-96 px-2 sm:px-1">
                     {/* Images */}
                     <div className="border">
                        <label className="px-3 py-2 inline-block bg-base-200 w-full" htmlFor="images">Images</label>
                       <div className="flex p-1 flex-col">
                         <input {...register("imageOne", { required: true })} className="px-4 py-2 border" type="file" id="images" />
                        <input {...register("imageTwo", { required: true })} className="px-4 py-2 border" type="file" id="images" />
                        <input {...register("imageThree", { required: true })} className="px-4 py-2 border" type="file" id="images" />
                       </div>
                       <span className="text-error px-3">
                       {errors.imageOne && <span>Min one image is required</span>}
                       </span>
                    </div>
                    {/* Title */}
                    <div className="flex flex-col border">
                          <label className="px-3 py-2 inline-block bg-base-200 w-full" htmlFor="title">Title</label>
                        <input {...register("title", { required: true })} type="text" className="px-4 m-1 py-2 border border-gray-400" id="title" />
                    </div>
                    {/* Description */}
                    <div className="flex flex-col border">
                        <label className="px-3 py-2 inline-block bg-base-200 w-full" htmlFor="description">Description</label>
                        <textarea {...register("description", { required: true })} className="px-4 h-32 m-1 py-2 border border-gray-400" id="description"></textarea>
                    </div>
                </div>
                {/* Right side */}
                <div className="sm:w-96 px-2 sm:px-1">
                    {/* Size */}
                    <div className="flex flex-col border">
                        <label className="px-3 py-2 inline-block bg-base-200 w-full" htmlFor="size">Size</label>
                        <input {...register("size", { required: true })} className="px-4 m-1 py-2 border border-gray-400" type="text" id="size" />
                    </div>
                    {/* File Format */}
                    <div className="flex flex-col border">
                        <label className="px-3 py-2 inline-block bg-base-200 w-full" htmlFor="fileformat">File Format</label>
                        <input {...register("fileFormat", { required: true })} className="px-4 m-1 py-2 border border-gray-400" type="text" id="fileformat" />
                    </div>
                    {/* Design */}
                    <div className="flex flex-col border">
                        <label className="px-3 py-2 inline-block bg-base-200 w-full" htmlFor="design">Design</label>
                        <input {...register("design", { required: true })} className="px-4 m-1 py-2 border border-gray-400" type="text" id="design" />
                    </div>
                    {/* Categories */}
                    <div className="flex flex-col border">
                        <label className="px-3 py-2 inline-block bg-base-200 w-full" htmlFor="categories">Categories</label>
                        <Select placeholder="Select Categories..." className="m-1" isMulti options={categoriesValue} />
                       
                    </div>
                    {/* tags */}
                    <div className="flex flex-col border">
                        <label className="px-3 py-2 inline-block bg-base-200 w-full" htmlFor="tags">Tags</label>
                        <Select placeholder="Select Tags..." className="m-1" isMulti options={categoriesValue} />
                    </div>
                </div>
              
            </div>
            {/* Submit */}
            <div className="flex justify-center my-2">
                <button className="md:w-[768px] w-full hover:bg-opacity-75 duration-300 font-bold text-white disabled:bg-gray-500 disabled:cursor-not-allowed mx-auto py-2 bg-[#3B82F6]">Create Project</button>
            </div>
        </form>
    );
};

export default CreateProject;