import { useState } from "react";
import {
  BsPen,
  BsTrash
} from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { useGetQuickResponse } from "../../queries/query/getQuickResponse.query";
import DeleteModal from "../EditModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import CreateQuick from "./CreateQuick";


const AllQuickResponse = ({setValue,value})=> {


 // get quick response
 const { data: quickResponseData } = useGetQuickResponse({
    quickResponseId: "",
  });

   // action mode
   const [editMode, setEditMode] = useState(false);
   const [deleteMode, setDeleteMode] = useState(false);

   // quick id 
   const [quickId, setQuickId] = useState('')
   
  // toast
//   const { Toast, showToast } = useToast();
  // console.log(quickResponseData);

  const quickResponses = quickResponseData?.data?.quickResponses;

      // modal id
  const [editId, setEditId] = useState("");

  // get quick response by id
  const { data: quickResponseDataId } = useGetQuickResponse({
    quickResponseId: editId,
  });
  const quickResponse = quickResponseDataId?.data?.quickResponse;
  //  console.log(quickResponseDataId)


    return (
        <div className="p-2 m-2 h-24 overflow-y-auto">
        {/* Quick Response */}
        {/* <Toast /> */}
        <div className=" flex  justify-between p-2">
          <h2>Quick Response</h2>
          <div>
            {editMode ? (
              <button
                onClick={() => setEditMode(false)}
                className="px-1 py-0 text-teal-400  font-bold"
              >
                Done
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="px-1 py-0 text-blue-500 font-bold"
              >
                Edit
              </button>
            )}
            {deleteMode ? (
              <button
                onClick={() => setDeleteMode(false)}
                className="px-1 py-0 text-teal-400  font-bold"
              >
                Done
              </button>
            ) : (
              <button
                onClick={() => setDeleteMode(true)}
                className="px-1 py-0 text-rose-400  font-bold"
              >
                Delete
              </button>
            )}
          </div>
        </div>
        <div className="flex ">
          <div className="flex gap-2 text-[13px] flex-wrap">
            {quickResponses?.map((quick,i) => (
                <><button key={i}
                onClick={(e) => setValue(value + " " + e.target.value)}
                className="px-1 flex cursor-pointer items-center gap-1 py-0 border border-gray-500"
                value={quick.label}
              >
                {quick.label}
                <span>
                  <FiChevronDown />
                </span>
              
              </button>
              {deleteMode ? (
                  <span onClickCapture={()=>setQuickId(quick?.quickResponseId)} onClick={()=>document.getElementById('delete_modal').showModal()}className="px-1 py-1 cursor-pointer rounded-full bg-rose-500 text-white">
                    <BsTrash />
                  </span>
                ) : (
                  ""
                )}
                {editMode ? (
                  <span
                    onClickCapture={() =>
                      setEditId(quick?.quickResponseId)
                    }
                    className="px-1 py-1 cursor-pointer rounded-full bg-blue-500 text-white"
                    onClick={() =>
                      document.getElementById("edit_modal").showModal()
                    }
                  >
                    <BsPen />
                  </span>
                ) : (
                  ""
                )}
                </>
              
              
            ))}

            {/* Add NEw */}
            <button onClick={()=>document.getElementById('create_new_quick').showModal()} className="border border-gray-500 px-1 py-0 bg-white">
              + Add New
            </button>
          </div>
          
        </div>
        <EditModal quickResponse={quickResponse} />
        <CreateQuick />
        <DeleteModal quickId={quickId} />
      </div>
    );
}

export default AllQuickResponse;