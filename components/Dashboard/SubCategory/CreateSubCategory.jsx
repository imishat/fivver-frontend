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
            {...register("name", { required: true })}
            placeholder="Title"
            className="input input-bordered rounded-none input-sm w-full inline-block"
            type="text"
            id="label"
          />
        </div>
        <div className="w-full">
          <label
            className="bg-blue-200 capitalize text-blue-600 inline-block py-2 px-3 font-bold w-full"
            htmlFor="price"
          >
            Price
          </label>
          <br />
          <input
            {...register("price", { required: true })}
            placeholder="Title"
            className="input input-bordered rounded-none input-sm w-full inline-block"
            type="number"
            id="price"
          />
        </div>
        <button className="btn btn-block bg-blue-400">Create</button>
      </form>
    </div>
  );
}

export default CreateSubCategory;
