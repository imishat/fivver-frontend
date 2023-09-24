import { useUpdateTags } from "@/components/queries/mutation/updateTags.mutation";
import { useGetTags } from "@/components/queries/query/getTags.query";
import useToast from "@/components/utility/useToast";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const TagsUpdate = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
//
const {mutate:updateTags} = useUpdateTags()
  // router
  const router = useRouter();


     // toast
     const { Toast, showToast } = useToast();

  // get query
  const tagId = router.query.tagsId;

      // tags Data
  const { data: tagsData } = useGetTags({tagId:tagId});
  const tagsOptions = tagsData?.data?.tag


  // handle update
  const handleUpdate = data =>{
    const tagData = {
        id:tagId,
        label:data.label,
        value:data.value
    }
    updateTags(tagData,{
        onSuccess: (res) => {
          console.log(res);
          showToast("Update Tag", "success");
        },
        onError: (err) => {
          showToast(err?.message);
        },
      })
  }

    return (
        <div className="flex w-96 mx-auto">
            <Toast />
        <form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col w-full space-y-3">
          <div className="w-full">
            <label
              className="bg-blue-200 capitalize text-blue-600 inline-block py-2 px-3 font-bold w-full"
              htmlFor="label"
            >
              Title
            </label>
            <br />
            <input
            {...register("label", { required: true })}
            defaultValue={tagsOptions?.label}
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
              slug
            </label>
            <br />
            <input
            {...register("value", { required: true })}
            defaultValue={tagsOptions?.value}
              className="input input-bordered rounded-none input-sm w-full inline-block"
              type="text"
              id="value"
            />
          </div>
          <button className="btn btn-block bg-blue-400">Update</button>
        </form>
      </div>
    );
};

export default TagsUpdate;