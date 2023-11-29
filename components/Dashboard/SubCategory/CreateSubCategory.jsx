import { useCreateSubCategory } from "@/components/queries/mutation/useCreateSub.mutation";
import useToast from "@/components/utility/useToast";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

function CreateSubCategory() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // router
  const router = useRouter();

  // update category
  const { mutate: createSubCategory } = useCreateSubCategory();

  // toast
  const { Toast, showToast } = useToast();

  // handle create category
  const handleCreate = (data) => {
    // create image
    const createData = {
      name: data.name,
      price: data.price,
      imageIds: [],
    };
    // create category
    createSubCategory(createData, {
      onSuccess: (res) => {
        showToast("Create Sub Category", "success");
        router.push("/dashboard?n=subcategories");
      },
      onError: (err) => {
        showToast(err?.message);
      },
    });
  };

  return (
    <div className="flex w-96 mx-auto ">
      <Toast/>
      <form
        onSubmit={handleSubmit(handleCreate)}
        className="flex flex-col w-full space-y-3 bg-[#f2f9ff] border border-1 "
      >
        <div className="w-full">
          <label
            className="bg-[#3b82f6] capitalize text-white inline-block py-2 px-3 font-bold w-full flex justify-between"
            htmlFor="label"
          >
           <span> Subcategory</span>
         
           <input
            {...register("tagName", { required: true })}
            placeholder="Tag line"
            className="input input-bordered rounded-none input-sm  inline-block w-32 h-7"
            type="text"
            id="label"
          />
          </label>
          <br />
          <input
            {...register("name", { required: true })}
            placeholder="Subcategory Title"
            className="input input-bordered rounded-none input-sm w-full inline-block"
            type="text"
            id="label"
          />
        </div>
        <div className="w-full">
       
       
          <input
            {...register("price", { required: true })}
            placeholder="Subcategory Amount
            "
            className="input input-bordered rounded-none input-sm w-full inline-block"
            type="number"
            id="price"
          />
        </div>
        <div className="w-full">
      
        
          <input
            {...register("regulardays", { required: true })}
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
            placeholder="Fast Delivery Days"
            className="input input-bordered rounded-none input-sm w-[60%] inline-block"
            type="text"
            id="regulardays"
          />
          <input
            {...register("FD_Amount", { required: true })}
            placeholder="F.D Amount"
            className="input input-bordered rounded-none input-sm w-[40%] inline-block"
            type="text"
            id="F.DAmount"
          />
          </div>
        </div>
        <button className="btn btn-block bg-blue-400">Create</button>
      </form>
    </div>
  );
}

export default CreateSubCategory;
