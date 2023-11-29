import { useUpdateSubCategory } from "@/components/queries/mutation/updateSubCategory.mutation";
import { useGetSubCategoryById } from "@/components/queries/query/getSubcategory.query";
import { Spin } from "@/components/utility/LoadingSpinner";
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
  const { data: subcategoryData } = useGetSubCategoryById({ subcategoryId: subId });
  // subcategory
  const subcategory = subcategoryData?.data?.subcategory;
  console.log(subcategory, "subcatagory")
  // handle update
  const handleUpdate = (data) => {
    const subData = {
      id: subId,
      name: data.name,
      price: data.price,
     
      FD_Amount:data.FD_Amount,
      fastDay:data.fastDay,
      regulardays:data.regulardays,
      tagName:data.tagName,
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
        className="flex flex-col w-full  bg-[#f2f9ff] border border-1"
      >
        <div className="w-full">
          <label
            className="bg-[#3b82f6] capitalize text-white inline-block py-2 px-3 font-bold w-full flex justify-between"
            htmlFor="label"
          >
            {
              !subcategory?.name ? <Spin /> : 'Subcategory'
            }

            <input
              {...register("tagName", { required: true })}
              defaultValue={subcategory?.tagName}
              placeholder="Tag line"

              className="input input-bordered rounded-none input-sm  inline-block w-32 h-7 text-black"
              type="text"
              id="label"
            />
          </label>

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

          <input
            {...register("price", { required: true })}
            defaultValue={subcategory?.price}
            placeholder="Subcategory Amount"
            className="input input-bordered rounded-none input-sm w-full inline-block"
            type="text"
            id="value"
          />
        </div>
        <div className="w-full">


          <input
            {...register("regulardays", { required: true })}
            defaultValue={subcategory?.regulardays}
            placeholder="Regular Delivery Days"
            className="input input-bordered rounded-none input-sm w-full inline-block"
            type="text"
            id="regulardays"
          />
        </div>
        <div className="w-full mt-0">
          <div className=" flex  ">
            <input
              {...register("fastDay", { required: true })}
              defaultValue={subcategory?.fastDay}
              placeholder="Fast Delivery Days"
              className="input input-bordered rounded-none input-sm w-[60%] inline-block"
              type="text"
              id="regulardays"
            />
            <input
              {...register("FD_Amount", { required: true })}
              defaultValue={subcategory?.FD_Amount}
              placeholder="F.D Amount"
              className="input input-bordered rounded-none input-sm w-[40%] inline-block"
              type="text"
              id="F.DAmount"
            />
          </div>
        </div>
        <button className="btn btn-block bg-blue-400">Update</button>
      </form>
    </div>
  );
}

export default UpdateSub;
