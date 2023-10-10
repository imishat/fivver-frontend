import { IoCloseCircle } from "react-icons/io5";

function CancelModal() {
    return (
        <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

<dialog id="cancel_modal" className="modal ">
<div className="modal-box rounded-none p-0 min-w-[60%]">
<div className="bg-blue-50 px-4 py-2 flex items-center justify-between">
<h3 className="font-bold text-lg">Cancel This Project</h3>
<form method="dialog" className="">
<button><IoCloseCircle size={23} /></button>
</form>

</div>
 <div>
     {/* Textarea */}
     <textarea placeholder="Enter the reason for cancellation" className="textarea focus-within:outline-none rounded-none border-none textarea-bordered  w-full"></textarea>
    <div className="flex py-2 items-center justify-end px-12">
   
     {/* Button */}
     <div>
         <button className="bg-blue-500 font-bold hover:bg-blue-700 text-white py-2 px-6 text-center">Cancel</button>
     </div>
    </div>
 </div>
</div>
<form method="dialog" className="modal-backdrop">
 <button>close</button>
</form>
</dialog>
     </div>
    );
}

export default CancelModal;