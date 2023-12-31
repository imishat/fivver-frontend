import { useCreateDesign } from "@/components/queries/mutation/design.mutation";
import { useUploadFile } from "@/components/queries/mutation/fileUpload.mutation";
import { useUploadThumbnail } from "@/components/queries/mutation/thumbUpload.mutation";
import { useGetDesignCategoriesData } from "@/components/queries/query/designCategories.queries";
import { useAllDesigns } from "@/components/queries/query/designs.query";
import { useGetCategoryData } from "@/components/queries/query/getCategory.query";
import { useGetCompanies } from "@/components/queries/query/getCompanies.query";
import { useGetTags } from "@/components/queries/query/getTags.query";
import useToast from "@/components/utility/useToast";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

import CreatableSelect from "react-select/creatable";

// import ReactQuill from "react-quill";
const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => "Loading...",
});

const CreateDesign = () => {
  // set toasat showing data
  const { Toast, showToast } = useToast();
  // create design call
  const { mutate: sendDesignData } = useCreateDesign();

  const [watermark, setWatermark] = useState(false);
  // image upload call
  const { mutate: sendFileData } = useUploadFile({ watermark });
  const { mutate: sendThumbnail } = useUploadThumbnail();
  // get all categories
  const { data: getCategories } = useGetDesignCategoriesData({
    page: 1,
    limit: 100,
  });

  // images 
  const [images,setImages] = useState(null)
  // thumbnail
  const [thumb,setThumb] = useState(null)

  const [thumbBlob, setThumbBlob] = useState('');
// create image blob
  const handleThumbUpload = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setThumbBlob(blobUrl);
    }
  };
  const [imageBlob,setImageBlob] = useState([])
// create image blob
const handleImageChange = (event) => {
  const uploadedImages = event.target.files;

  // Creating Blob URLs for each uploaded image
  const blobUrls = Array.from(uploadedImages).map((image) => URL.createObjectURL(image));

  setImageBlob(blobUrls);
};
 
  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // ====================== Designs ======================== //
  // design id
  const designId = "";

  // get all designs for related designs
  const { data: getAllDesigns } = useAllDesigns({ designId });
  const allDesigns = getAllDesigns?.data?.designs;



  // design create loading
  const [designLoading, setDesignLoading] = useState(false);

  // ====================== Company ======================== //

  // company Data
  const { data: companyData } = useGetCompanies({companyId:''});
  const companiesOptions = companyData?.data?.companies;

  // companies
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  // ====================== Tags ======================== //
  // tags Data
  const { data: tagsData } = useGetTags({tagId:''});
  const tagsOptions = tagsData?.data?.tags;
  // tags
  const [selectedTags, setSelectedTags] = useState('');
console.log(selectedTags,"selectedTags")
  // ====================== Category ======================== //
  // categories
  const categories = getCategories?.data?.categories;

  // get category id when select
  const [categoryId, setCategoryId] = useState("");

  //  category
  const { data: category } = useGetCategoryData({ categoryId });

  // ====================== Sub category ======================== //
  // categories
  const selectSubCategories = category?.data?.categories[0]?.subcategories;
  // selected sub category
  const [selectedSubCategories, setSelectedSubCategories] = useState("");
  console.log(selectedSubCategories);
  // ====================== Related ======================== //

  // relatedIds
  const [relatedIds, setRelatedIds] = useState("");

  // ====================== Images ======================== //
  // image ids
  const imageIds = [];
  // thumbnail id
  const [thumbnailId, setThumbnailId] = useState("");
  // ====================== Description ======================== //
  // description state
  const [description, setDescription] = useState("");

  // ====================== Handle Create post function] ======================== //
  // handle create project
  const handleCreateProject = (data) => {
    // loading start
    setDesignLoading(true);

    // upload thumbnail
    console.log(data.thumbnail);
    const thumbnailData = data.thumbnail[0];
    const thumbData = new FormData();
    thumbData.append("files", thumbnailData);
    sendThumbnail(thumbData, {
      onSuccess: (res) => {
        const thumbnail = res?.data?.files[0]?.fileId;

        // photo upload in mongodb
        const photo = data.image;
        const photoData = new FormData();

        for (const p in photo) {
          photoData.append("files", photo[p]);
        }
        // send desing data for create
        sendFileData(photoData, {
          onSuccess: (res) => {
            const images = res?.data?.files;
            showToast("Photo Uploaded", "success");
            for (const i in images) {
              imageIds.push(images[i].fileId);
            }

            // if image uploaded
            if (imageIds.length) {
              const projectData = {
                title: data.title,
                description: description,
                size: data.size,
                fileFormat: data.fileFormat,
                categoryId: data.category,
                subcategoryId: selectedSubCategories,
                imageIds: imageIds,
                companies: selectedCompanies,
                relatedDesignIds: relatedIds.split(","),
                tags: selectedTags,
                featuredImageId: thumbnail,
              };
              sendDesignData(projectData, {
                onSuccess: (res) => {
                  showToast(res.message, "success");
                  console.log(res);
                  // loading stop
                  setDesignLoading(false);
                  // reset();
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
            // reset();
          },
          onError: (err) => {
            showToast(err?.response?.data?.message);
            // loading stop
            setDesignLoading(false);
          },
        });
      },
      onError: (err) => {
        showToast(err?.response?.data?.message);
      },
    });
  };

  //    react select
  console.log(selectSubCategories,'sub')
  // error handle

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <form onSubmit={handleSubmit(handleCreateProject)} className="my-12">
        <Toast />
        <div className=" mx-auto my-4">
          <h2 className="text-2xl font-bold uppercase bg-[#3B82F6] text-white px-4 py-2">
            Create Design
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          {/* Left side */}
          <div className="sm:w-3/5 px-2 sm:px-1">
            {/* Title */}
            <div className="flex flex-col border ">
              <label
                className="px-3 py-2 inline-block bg-base-200 w-full"
                htmlFor="title"
              >
                Title
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                className="px-4 m-1 w-full py-2 border border-gray-400"
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

              <ReactQuill
                theme="snow"
                placeholder="Description"
                value={description}
                onChange={setDescription}
              />
            </div>
            {/* Related */}
            <div className="flex flex-col border">
              <label
                className="px-3 py-2 inline-block bg-base-200 w-full"
                htmlFor="related"
              >
                Related
              </label>
              <textarea
                onChange={(e) => setRelatedIds(e.target.value)}
                className="textarea textarea-bordered"
                id=""
              />
            </div>
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
                htmlFor="fileFormat"
              >
                File Format
              </label>
              {/* Image upload */}
              <input
                {...register("fileFormat", { required: true })}
                className="px-4 m-1 py-2 border border-gray-400"
                type="text"
                id="fileFormat"
              />
            </div>
          </div>
          {/* Right side */}
          <div className="sm:w-2/5 px-2 sm:px-1">
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
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setSelectedSubCategories("");
                }}
                className="select select-bordered rounded-none bg-white m-1 border border-gray-400"
              >
                {categories?.map((category) => {
                  return (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* sub categories */}
            <div className="flex flex-col border">
              <label
                className="px-3 py-2 inline-block bg-base-200 w-full"
                htmlFor="companies"
              >
                Sub Categories
              </label>
              {selectSubCategories?.map((sub) => {
                
                return (
                  <div key={sub?._id} className="py-2 px-2">
                    <label
                      className="flex items-center gap-1"
                      htmlFor={sub._id}
                    >
                      <input
                        onClick={(e) => {
                          setSelectedSubCategories(e.target.value);
                          // e.target.checked
                          //   ? setSelectedSubCategories([
                          //       ...selectedSubCategories,
                          //       e.target.value,
                          //     ])
                          //   : setSelectedSubCategories(
                          //       selectedSubCategories.filter(
                          //         (item) => item !== e.target.value
                          //       )
                          //     );
                        }}
                        className="radio radio-bordered radio-sm"
                        type="radio"
                        name="sub"
                        id={sub._id}
                        value={sub._id}
                      />
                      {sub.name}
                    </label>
                  </div>
                );
              })}
            </div>
            {/* companies */}
            <div className="flex flex-col border">
              <label
                className="px-3 py-2 inline-block bg-base-200 w-full"
                htmlFor="companies"
              >
                Companies
              </label>
              <CreatableSelect
                isMulti
                onChange={(e) => setSelectedCompanies(e)}
                options={companiesOptions}
                className="basic-multi-select"
                isClearable
                classNamePrefix="select"
              />
            </div>
            {/* tags */}
            <div className="flex flex-col border">
              <label
                className="px-3 py-2 inline-block bg-base-200 w-full"
                htmlFor="tags"
              >
                Tags
              </label>
            
              <textarea  onChange={(e) => setSelectedTags(e)} {...register("description", { required: true })}  type="text" className=" px-3 py-2" id="create" />
            </div>
            {/* Thumbnail */}
            <div className="border">
              <p className="px-3 py-2 bg-base-200 ">
                Thumbnail <span className="text-rose-400">*</span>
              </p>
              {/* Image  */}
              <div>
              {thumbBlob && <img src={thumbBlob} className="w-24 m-3 object-cover h-24" alt="Uploaded Image" />}
              </div>
              <div>
                <input
                  className="file-input file-input-md file-input-bordered w-full rounded-none m-1"
                  {...register("thumbnail", { required: true })}
                  onClick={() => setWatermark(false)}
                  type="file"
                  accept="image/*"
                  onChange={(e)=>handleThumbUpload(e)}
                  id="thumb"
                />
              </div>
              <span className="text-error block px-3">
                {errors.thumbnail && <span>Thumbnail is required</span>}
              </span>
            </div>
            {/* Preview Images */}
            <div className="border">
              <p className="px-3 py-2 bg-base-200 ">
                {" "}
                Preview Images{" "}
                <span className="text-xs">(Multiple Select)</span>{" "}
                <span className="text-rose-400">*</span>
              </p>
<div className="">
{imageBlob?.length && <div className="flex items-center flex-wrap">
  {
   imageBlob?.map((image,i)=><img key={i} src={image} className="w-24 m-1 object-cover h-24" alt="Uploaded Image" />) 
  }
  </div>}
</div>
              <div>
                <input
                  className="file-input file-input-md file-input-bordered w-full rounded-none m-1"
                  {...register("image", { required: true })}
                  onClick={() => setWatermark(true)}
                  type="file"
                  accept="image/*"
                  onChange={(e)=>handleImageChange(e)}
                  id="images"
                  multiple={true}
                />
              </div>
              <span className="text-error block px-3">
                {errors.image && <span>Image is required</span>}
              </span>
            </div>
           
            {/* Priority */}
          

            <div className="flex justify-center my-2">
              {/* Submit */}
              <button className="md:w-[768px] w-full hover:bg-opacity-75 duration-300 font-bold text-white disabled:bg-gray-500 disabled:cursor-not-allowed mx-auto py-2 bg-[#3B82F6]">
                {designLoading ? "Creating..." : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  );
};

export default CreateDesign;
