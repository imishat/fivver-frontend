import { useUpdateSubCategory } from "@/components/queries/mutation/updateSubCategory.mutation";
import { useGetSubCategoryById } from "@/components/queries/query/getSubcategory.query";
import useToast from "@/components/utility/useToast";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

function UpdateSub() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // toast
  const { Toast, showToast } = useToast();

  // router
  const router = useRouter();

  // get query
  const subId = router.query.subcategoryId;

  // update sub
  const { mutate: updateSub } = useUpdateSubCategory();

  // get sub category by id
  const { data: subcategoryData } = useGetSubCategoryById({subcategoryId:subId});
  // subcategory
  const subcategory = subcategoryData?.data?.subcategory;
  // handle update
  const handleUpdate = (data) => {
    const subData = {
        id:subId,
      name: data.name,
      price: data.price,
      imageIds: [],
    };
    updateSub(subData, {
      onSuccess: (res) => {
        showToast("Update Subcategory", "success");
      },
      onError: (err) => {
        showToast(err?.message);
      },
    });
  };
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
           {
            !subcategory?.name? 'Loading...':'Title'
           } 
          </label>
          <br />
          <input
            {...register("name", { required: true })}
            defaultValue={subcategory?.name}
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
            Price
          </label>
          <br />
          <input
            {...register("price", { required: true })}
            defaultValue={subcategory?.price}
            className="input input-bordered rounded-none input-sm w-full inline-block"
            type="text"
            id="value"
          />
        </div>
        <button className="btn btn-block bg-blue-400">Update</button>
      </form>
    </div>
  );
}

export default UpdateSub;
