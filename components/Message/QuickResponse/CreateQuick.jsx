import { useQuickResponse } from "@/components/queries/mutation/quickResponse.mutation";
import { updateState } from "@/components/redux/features/update/updateSlice";
import useToast from "@/components/utility/useToast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function CreateQuick() {

  // react hook form custom offer
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()

  // selector update
  const messageUpdate = useSelector((state) => state.update)

  // create new quick response
  const { mutate: createQuick } = useQuickResponse()
  // input value
  const [value, setValue] = useState('')


  // toast
  const { Toast, showToast } = useToast();

  // handle create Quick
  const handleCreate = (data) => {
    const quickData = {
      type: 'POST',
      "label": data?.quick,
      "value": data?.description?.split(' ').join('-').toLowerCase(),
      id: ''
    }
    createQuick(quickData, {
      onSuccess: (res) => {
        showToast("New Response Created", "success");
        dispatch(updateState(!messageUpdate?.update))
        reset()
      },
      onError: (err) => {
        showToast(err?.message);
      },
    });
  };
  return (
    <dialog id="create_new_quick" className="modal">
      <Toast />
      <div className="modal-box ">
        <div>
          <h3 className="font-bold text-lg">Create New Quick Response!</h3>
          <form onSubmit={handleSubmit(handleCreate)} className="flex  flex-col space-y-5">
            <div className="flex flex-col mt-4">
              <label htmlFor="create">Title</label>
              <input  {...register("quick", { required: true })} onChange={(e) => setValue(e.target.value)} type="text" className="input input-bordered rounded-none" id="create" />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="">Description</label>
              <input  {...register("description", { required: true })} type="text" className="input input-bordered rounded-none h-[150px]" id="create" />
            </div>
            <button className="btn rounded-none bg-blue-400 hover:bg-[#1881cc] duration-300 text-white">
              Create
            </button>
          </form>
        </div>
        {/* Buttons */}
        <div className="flex mt-6 items-center justify-end w-full">
          <form method="dialog" className="flex">
            <button className="btn btn-sm rounded bg-rose-400 hover:bg-rose-500 duration-300 text-white capitalize">
              Close
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default CreateQuick;
