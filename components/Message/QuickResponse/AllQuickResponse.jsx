import { updateState } from "@/components/redux/features/update/updateSlice";
import moment from "moment";
import { useState } from "react";
import { BsPen, BsTrash } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useGetQuickResponse } from "../../queries/query/getQuickResponse.query";
import DeleteModal from "../EditModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import CreateQuick from "./CreateQuick";
import { useRouter } from "next/router";

const AllQuickResponse = ({ setValue, value, lastMessage }) => {
  // const url = "ws://103.49.169.89:30912";
  // const socket = io(url, {
  //   path: "/realtime-messaging",
  // });
  const router = useRouter();
  console.log(router.asPath,"sds")
const [show, setShow] = useState(false)
  // Define a function to check if the current URL is "/login".
  
  const [online, setOnline] = useState(false);
 

  const messageUpdate = useSelector((state) => state.update);

  // get quick response
  const { data: quickResponseData } = useGetQuickResponse({
    quickResponseId: "",
    update: messageUpdate?.update,
  });

  // action mode
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  // quick id
  const [quickId, setQuickId] = useState("");

 

  const dispatch = useDispatch()

  const handleClick = () => {
    setShow(!show); // Toggle the state value
  };
  const quickResponses = quickResponseData?.data?.quickResponses;

  // modal id
  const [editId, setEditId] = useState("");

  // get quick response by id
  const { data: quickResponseDataId } = useGetQuickResponse({
    quickResponseId: editId,
    update: messageUpdate?.update
  });
  const quickResponse = quickResponseDataId?.data?.quickResponse;
  //  console.log(quickResponseDataId)

  return (
    <div className="p-2 m-2 h-28 overflow-y-auto">
      {/* Quick Response */}
      {/* <Toast /> */}
      <div className=" flex items-center justify-between px-2  cursor-pointer">
        <h2 onClick={handleClick}>Quick Response</h2>
        <div className="flex items-center  gap-2">
        <div>
      {router.asPath=== '/message' ? (
       ''
      ) : (
        <p className="text-xs">
          {online ? (
            'Online'
          ) : (
            <span>
              Last seen {moment(lastMessage?.createdAt).fromNow()} | Local Time: {moment(new Date()).format('LL')}
            </span>
          )}
        </p>
      )}
    </div>
          <div className="dropdown dropdown-left">
            <label
              tabIndex={0}
              className="hover:bg-base-300 rounded-md px-2 inline-block py-2"
            >
              <CiMenuKebab />
            </label>
            <ul className="dropdown-content rounded-none z-[1] tabIndex={0} menu shadow bg-base-100 border p-1">
              <div>
                {editMode ? (
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-2 py-1 hover:bg-base-300 w-full text-teal-400  font-bold"
                  >
                    Done
                  </button>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-2 py-1 hover:bg-base-300 w-full text-blue-500 font-bold"
                  >
                    Edit
                  </button>
                )}
                {deleteMode ? (
                  <button
                    onClick={() => setDeleteMode(false)}
                    className="px-2 py-1 hover:bg-base-300 w-full text-teal-400  font-bold"
                  >
                    Done
                  </button>
                ) : (
                  <button
                    onClick={() => setDeleteMode(true)}
                    className="px-2 py-1 hover:bg-base-300 w-full text-rose-400  font-bold"
                  >
                    Delete
                  </button>
                )}
              </div>
            </ul>
          </div>{" "}
        </div>
      </div>
      <div className="flex ">
        <div className="flex gap-2 text-[13px] flex-wrap">
          {show && quickResponses?.map((quick, i) => (
            <>
             <button
  key={i}
  onClick={(e) => {
    setValue(e.target.value);
    setShow(false); 
  }}
  className="px-1 flex cursor-pointer items-center gap-1 py-0 border border-gray-500"
  value={quick.label}
>
  {quick.label}
</button>
              {deleteMode ? (
                <span
                  onClickCapture={() => setQuickId(quick?.quickResponseId)}
                  onClick={() =>
                    document.getElementById("delete_modal").showModal()
                  }
                  className="px-1 py-1 cursor-pointer rounded-full bg-rose-500 text-white"
                >
                  <BsTrash />
                </span>
              ) : (
                ""
              )}
              {editMode ? (
                <span
                  className="px-1 py-1 cursor-pointer rounded-full bg-blue-500 text-white"
                  onClick={() =>{
                    setEditId(quick?.quickResponseId)
                    document.getElementById("edit_modal").showModal()
                    dispatch(updateState(!messageUpdate?.update))
                  }
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
         {
          show&& <button
          onClick={() =>
            document.getElementById("create_new_quick").showModal()
          }
          className="border border-gray-500 px-1 py-0 bg-white"
        >
          + Add New
        </button>
         }
         </div> 
      </div>
      <EditModal quickId={editId} />
      <CreateQuick />
      <DeleteModal quickId={quickId} />
    </div>
  );
};

export default AllQuickResponse;
