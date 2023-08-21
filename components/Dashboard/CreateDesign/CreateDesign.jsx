import { useCreateDesign } from "@/components/queries/mutation/design.mutation";
import { useUploadFile } from "@/components/queries/mutation/fileUpload.mutation";
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

import Select from "react-select";
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
  // image upload call
  const { mutate: sendFileData } = useUploadFile();
  // get all categories
  const { data: getCategories } = useGetDesignCategoriesData({
    page: 1,
    limit: 100,
  });

  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // ====================== Deisgns ======================== //
  // design id
  const designId = "";

  // get all desings for related designs
  const { data: getAllDesigns } = useAllDesigns({ designId });
  const allDesigns = getAllDesigns?.data?.designs;

  // design create loading
  const [designLoading, setDesignLoading] = useState(false);

  // ====================== Company ======================== //

  // company Data
  const { data: companyData } = useGetCompanies();
  const companiesOptions = companyData?.data?.companies;

  // companies
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  // ====================== Tags ======================== //
  // tags Data
  const { data: tagsData } = useGetTags();
  const tagsOptions = tagsData?.data?.tags;
  // tags
  const [selectedTags, setSelectedTags] = useState([]);

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
  // selected related
  const [selectedRelated, setSelectedRelated] = useState([]);

  // get selected ids
  const [selectedRelatedIds, setSelectedRelatedIds] = useState([]);
  // get remove ids when remove related data
  const relatedIds = selectedRelatedIds.slice(0, selectedRelated.length);

  // get related id from designs
  useEffect(() => {
    selectedRelated?.map((select) =>
      setSelectedRelatedIds([...selectedRelatedIds, select.value])
    );
  }, [selectedRelated?.length]);

  // designs to selected value
  const relatedOptions = [];
  useEffect(() => {
    allDesigns?.map((design) => {
      relatedOptions.push({ label: design.title, value: design.designId });
    });
  }, [relatedOptions?.length < allDesigns?.length && relatedOptions]);

  // ====================== Images ======================== //
  // image ids
  const imageIds = [];

  // ====================== Description ======================== //
  // description state
  const [description, setDescription] = useState("");

  // ====================== Handle Create post function] ======================== //
  // handle create project
  const handleCreateProject = (data) => {
    // loading start
    setDesignLoading(true);

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
            relatedDesignIds: relatedIds,
            tags: selectedTags,
          };
          console.log(projectData);
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
  };
  //    react select

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
              <Select
                isMulti
                onChange={(e) => setSelectedRelated(e)}
                options={relatedOptions}
                className="basic-multi-select m-1"
                classNamePrefix="select"
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
                className="px-4 py-2 bg-white m-1 border border-gray-400"
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
                  <div className="py-2 px-2">
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
              <Select
                isMulti
                onChange={(e) => setSelectedCompanies(e)}
                options={companiesOptions}
                className="basic-multi-select"
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
              <CreatableSelect
                onChange={(e) => setSelectedTags(e)}
                isMulti
                isClearable
                options={tagsOptions}
              />
            </div>
            {/* Images */}
            <div className="border">
              <p className="px-3 py-2 bg-base-200 ">
                {" "}
                Images <span className="text-rose-400">*</span>
              </p>

              <div>
                <input
                  className="file-input file-input-md file-input-bordered w-full rounded-none m-1"
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
              {/* Iamge upload */}
              <input
                {...register("fileFormat", { required: true })}
                className="px-4 m-1 py-2 border border-gray-400"
                type="text"
                id="fileformat"
              />
            </div>

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
