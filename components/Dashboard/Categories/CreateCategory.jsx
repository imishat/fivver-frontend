import { useCreateCategory } from "@/components/queries/mutation/createCategory.mutation";
import { useUploadThumbnail } from "@/components/queries/mutation/thumbUpload.mutation";
import { useGetSubCategoryById } from "@/components/queries/query/getSubcategory.query";
import useToast from "@/components/utility/useToast";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

function CreateCategory() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // router
  const router = useRouter();

  // get sub categories
  const { data: subCategoriesData } = useGetSubCategoryById({
    subcategoryId: "",
  });

    // update category
    const { mutate: createCategory } = useCreateCategory();

  // subcategory
  const subCategories = subCategoriesData?.data?.subcategories;
  console.log(subCategoriesData);
  // toast
  const { Toast, showToast } = useToast();

  // upload file
  const { mutate: sendThumbnail } = useUploadThumbnail();

  // sub category id
  let subCategoryId = [];
  // handle create category
  const handleCreate = (data) => {
    // create image
    const categoryImage = data.image[0];
    const cateImage = new FormData();
    cateImage.append("files", categoryImage);
    // upload image
    sendThumbnail(cateImage, {
      onSuccess: (res) => {
        const thumbnail = res?.data?.files[0]?.fileId;
        const createData = {
          name: data.title,
          price: 155,
          subcategoryIds: subCategoryId,
          imageIds: [`${thumbnail}`],
        };
        // create category
        createCategory(createData, {
          onSuccess: (res) => {
            showToast("Create Category", "success");
            router.push('/dashboard?n=categories')
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
  };

  return (
    <div className="flex w-96 mx-auto">
      <Toast />
      <form
        onSubmit={handleSubmit(handleCreate)}
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
            placeholder="Title"
            className="input input-bordered rounded-none input-sm w-full inline-block"
            type="text"
            id="label"
          />
        </div>
        <div className="w-full">
          <label
            className="bg-blue-200 capitalize text-blue-600 inline-block py-2 px-3 font-bold w-full"
            htmlFor="label"
          >
           Extra-fast 1-day delivery
          </label>
          <br />
          <input
            {...register("Extra-fast", { required: true })}
            placeholder="Amount"
            className="input input-bordered rounded-none input-sm w-full inline-block"
            type="Number"
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
            {...register("image", { required: true })}
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
                    id={subCat?.subcategoryId}
                    value={subCat?.subcategoryId}
                  />
                  <label
                    htmlFor={subCat?.subcategoryId}
                    className="cursor-pointer select-none"
                  >
                    {subCat?.name}
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
}

export default CreateCategory;
