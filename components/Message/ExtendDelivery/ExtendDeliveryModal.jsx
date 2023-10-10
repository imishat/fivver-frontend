import { IoCloseCircle } from "react-icons/io5";

function ExtendDeliveryModal() {
    return (
        <div>
           {/* Open the modal using document.getElementById('ID').showModal() method */}

<dialog id="extend_modal" className="modal ">
  <div className="modal-box rounded-none p-0 min-w-[60%]">
   <div className="bg-blue-50 px-4 py-2 flex items-center justify-between">
   <h3 className="font-bold text-lg">Extend Delivery Date</h3>
   <form method="dialog" className="">
   <button><IoCloseCircle size={23} /></button>
  </form>
   
   </div>
    <div>
        {/* Textarea */}
        <textarea placeholder="Explain why You need more time" className="textarea focus-within:outline-none rounded-none border-none textarea-bordered  w-full"></textarea>
       <div className="flex items-center justify-between px-12">
        {/* Input  */}
       <div className="flex py-2 items-center justify-between w-1/2">
           <div className="flex items-center gap-4">
            <label htmlFor="days">Days</label>
            <input defaultValue={'1'} className="input font-bold pl-6 text-lg input-bordered rounded-none w-20 input-sm" type="text" id="" />
           </div>
            <div className="flex items-center gap-4">
                <label htmlFor="amount">Amount</label>
                <div className="flex items-center gap-1 text-lg relative font-bold">
                    <span className="left-3 absolute">$</span>
                <input defaultValue={'1'} className="input text-lg input-bordered pl-6 rounded-none w-20 input-sm" type="text" id="" />
                </div>
            </div>
        </div>
        {/* Button */}
        <div>
            <button className="bg-blue-500 font-bold hover:bg-blue-700 text-white py-2 px-6 text-center">Extend</button>
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

export default ExtendDeliveryModal;