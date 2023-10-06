import { useQuickResponse } from "@/components/queries/mutation/quickResponse.mutation";
import useToast from "@/components/utility/useToast";

function DeleteModal({quickId}) {

    const {mutate:deleteQuick} = useQuickResponse()

        // toast
        const { Toast, showToast } = useToast();

    const handleDelete = id => {
        const deleteData = {
            id:id,
            type:'DELETE'
        }
        deleteQuick(deleteData,{
            onSuccess: (res) => {
              showToast("Deleted", "success");
            },
            onError: (err) => {
              showToast(err?.message);
            },
          });
    }
    return (
<dialog id="delete_modal" className="modal">
    <Toast />
  <div className="modal-box w-80">
    <h3 className="font-bold text-lg">Are you sure!</h3>
  <div className="flex items-center justify-between mt-7">
  <form method="dialog" className="">
    <button className="btn btn-sm rounded-none bg-blue-400 hover:bg-blue-500 text-white">Close</button>
  </form>
    <button onClick={()=>handleDelete(quickId)} className="btn btn-sm rounded-none bg-rose-400 hover:bg-rose-500 text-white">Yes</button>
  </div>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    );
}

export default DeleteModal;