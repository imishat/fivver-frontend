import { useQuickResponse } from "@/components/queries/mutation/quickResponse.mutation";
import { useGetQuickResponse } from "@/components/queries/query/getQuickResponse.query";
import { updateState } from "@/components/redux/features/update/updateSlice";
import useToast from "@/components/utility/useToast";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function EditModal({quickId}) {
    // react hook form custom offer
  const {
    register:editRegister,
    handleSubmit:editHandleSubmit,
    reset:editReset,
    formState: { errors:editErrors },
  } = useForm()

  const dispatch = useDispatch()

  const messageUpdate = useSelector((state)=>state.update)


    // toast
    const { Toast, showToast } = useToast();
  // update quick response
  const {mutate:editQuick} = useQuickResponse()


  const { data: quickResponseData } = useGetQuickResponse({
    quickResponseId: quickId,
    update: messageUpdate?.update,
  });

  const quickResponse = quickResponseData?.data?.quickResponse
  console.log(quickResponse,quickId,"da")

    // handle handleEditQuick
    const handleEditQuick = data =>{
      const editData ={
        type:'PUT',
        "label": data?.editData,
        "value": data?.description.split(' ').join('-').toLowerCase(),
        "id": quickResponse?.quickResponseId
      }
      editQuick(editData,{
        onSuccess: (res) => {
          showToast("Quick Response Update", "success");
          dispatch(updateState(!messageUpdate?.update))
          // router.reload();
        },
        onError: (err) => {
          showToast(err?.message);
        },
      });
      }
    return (
        <form onSubmit={editHandleSubmit(handleEditQuick)}>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <Toast/>
        <dialog id="edit_modal" className="modal">
          <div className="modal-box w-80">
            <input
            {...editRegister("editData", { required: true })} 
              type="text"
              className="px-4 w-full py-2 border border-gray-300 rounded-r-none rounded mb-2"
              defaultValue={quickResponse?.label}
            />
            <input
            {...editRegister("description", { required: true })} 
              type="text"
              className="px-4 w-full py-2 border border-gray-300 rounded-r-none rounded h-[150px]"
              defaultValue={quickResponse?.value}
            />

            <div className="modal-action">
              <form method="dialog" className="flex gap-3 items-center">
                {/* if there is a button in form, it will close the modal */}
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-none border  border-blue-200 hover:bg-gray-300 duration-300 rounded">
                  Close
                </button>
              </form>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-l-none border  border-blue-500 rounded">
                  Update
                </button>
            </div>
          </div>
        </dialog>
      </form>
    );
}

export default EditModal;