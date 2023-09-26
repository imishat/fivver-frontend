import { useForm } from "react-hook-form";

function EditModal({quickResponse}) {
    // react hook form custom offer
  const {
    register:editRegister,
    handleSubmit:editHandleSubmit,
    reset:editReset,
    formState: { errors:editErrors },
  } = useForm()

    // handle handleEditQuick
    const handleEditQuick = data =>{
        console.log(data)
      }
    return (
        <form onSubmit={editHandleSubmit(handleEditQuick)}>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog id="edit_modal" className="modal">
          <div className="modal-box w-80">
            <input
            {...editRegister("editData", { required: true })} 
              type="text"
              className="px-4 w-full py-2 border border-gray-300 rounded-r-none rounded"
              defaultValue={quickResponse?.label}
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