import { useUploadThumbnail } from "@/components/queries/mutation/thumbUpload.mutation";
import { useUpdateCategory } from "@/components/queries/mutation/updateCategory.mutation";
import { useGetSubCategoryById } from "@/components/queries/query/getSubcategory.query";
import { useGetCategoryById } from "@/components/queries/query/subCategory.query";
import useToast from "@/components/utility/useToast";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const UpdateCategory = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // router
  const router = useRouter();

   // get query
   const categoryId = router.query.categoryId;

   // company Data
   const { data: categoryData } = useGetCategoryById({
     subCategoryId: categoryId,
   });
   const category = categoryData?.data?.category;
   console.log(category,'cate')

  // update category
  const { mutate: updateCategory } = useUpdateCategory();

  // toast

  const { Toast, showToast } = useToast();

 // get sub categories
 const { data: subCategoriesData } = useGetSubCategoryById({
  subcategoryId: "",
});

    // subcategory
    const subCategories = subCategoriesData?.data?.subcategories;
    console.log(subCategoriesData);

  // upload file
  //
  const { mutate: sendThumbnail } = useUploadThumbnail();

 

    // sub category id
    let subCategoryId = [];

  // handle update
  const handleUpdate = (data) => {
    const categoryImage = data.image[0];
   if(data?.image?.length) {
    const cateImage = new FormData();
    cateImage.append("files", categoryImage);
    sendThumbnail(cateImage, {
      onSuccess: (res) => {
        const thumbnail = res?.data?.files[0]?.fileId;

        const categoryUpdate = {
          id: categoryId,
          name: data.title,
          price: 155,
          subcategoryIds: subCategoryId || category?.subcategoryIds,
          imageIds: [`${thumbnail}`],
        };
        console.log(categoryUpdate)
        updateCategory(categoryUpdate, {
          onSuccess: (res) => {
            showToast("Update Category", "success");
          },
          onError: (err) => {
            showToast(err?.message);
          },
        });
      },
      onError: (err) => {
        showToast(err?.response?.data?.message);
      },
    });
   }else {
      const categoryUpdate = {
      id: categoryId,
      name: data.title,
      price: 155,
      subcategoryIds: subCategoryId || category?.subcategoryIds,
      imageIds: category?.imageIds
    };
    console.log(categoryUpdate)
    updateCategory(categoryUpdate, {
      onSuccess: (res) => {
        showToast("Update Category", "success");
      },
      onError: (err) => {
        showToast(err?.message);
      },
    });
   }
  
  };
 

  console.log(category)
  return (
    <div className="flex w-96 mx-auto">
      <Toast />
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="flex flex-col w-full space-y-3"
      >
        <div className="w-full">
          <label
            className="bg-blue-200 capitalize text-blue-600 inline-block py-2 px-3 font-bold w-full"
            htmlFor="label"
          >
            Title
          </label>
          <br />
          <input
            {...register("title", { required: true })}
            defaultValue={category?.name}
            className="input input-bordered rounded-none input-sm w-full inline-block"
            type="text"
            id="label"
          />
        </div>
        <div className="w-full">
          <label
            className="bg-blue-200 capitalize text-blue-600 inline-block py-2 px-3 font-bold w-full"
            htmlFor="value"
          >
            image
          </label>
          <br />
          <input
            {...register("image", { required: false })}
            defaultValue={category?.value}
            className="file-input file-input-bordered rounded-none file-input-sm w-full inline-block"
            type="file"
            id="value"
          />
        </div>
        <div className="w-full">
          <label
            className="bg-blue-200 capitalize text-blue-600 inline-block py-2 px-3 font-bold w-full"
            htmlFor="value"
          >
            Sub Category
          </label>
          <br />
          {/* Sub Category */}
          <div className="flex flex-col space-y-2 my-2">
            {subCategories?.map((subCat, i) => {              
              return (
                <div key={i} className="flex items-center gap-2">
                  <input
                    onChange={(e) => {
                      e.target.checked
                        ? subCategoryId.push(e.target.value)
                        : (subCategoryId = subCategoryId.filter(
                            (sub) => sub !== e.target.value
                          ));
                    }}
                    className="checkbox checkbox-bordered rounded-none checkbox-sm "
                    type="checkbox"
                    checked={category?.subcategoryIds?.includes(subCat.subcategoryId)}
                    id={subCat?.subcategoryId}
                    value={subCat?.subcategoryId}
                  />
                  <label
                    htmlFor={subCat?.subcategoryId}
                    className="cursor-pointer select-none"
                  >
                    {subCat?.name} <span className="font-bold">({subCat?.price})</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <button className="btn btn-block bg-blue-400">Update</button>
      </form>
    </div>
  );
};

export default UpdateCategory;
