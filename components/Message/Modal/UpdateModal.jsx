function UpdateModal({body,title,btn,id,action}) {
    // handleUpdate message
    const handleUpdateMessage = (id) =>{
        console.log(id,action)
    }
    return (
        <div>
             <dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="py-4">{body}</p>
    <div className="flex items-center justify-between">
    <form method="dialog">
    <button className="btn btn-sm rounded bg-success text-white">close</button>
  </form>
  <button onClick={()=>handleUpdateMessage(id)} className="btn btn-sm btn-error rounded text-white">{btn}</button>
    </div>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
        </div>
    );
}

export default UpdateModal;