import { FiDownloadCloud } from "react-icons/fi";

function AdminRequirement() {
    return (
        <div>
           {
            [...Array(3).keys()].map((item,i)=>{
                return  <div key={i}>
                <h2 className="font-bold text-xl text-left list-inside list-item list-disc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam, architecto?</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ab aspernatur laudantium, ipsa officia dolorem ipsam quibusdam hic quasi necessitatibus perspiciatis, eaque ducimus eveniet iure quod quidem rerum corporis enim.</p>
                <div>
                   {
                    [...Array(3).keys()].map((file,i)=>{
                        return  <div className="flex items-center gap-3">
                            <p key={i} className="font-bold text-lg">Attachments {i+1}</p> 
                            <button><FiDownloadCloud size={23} /></button>
                        </div>
                    })
                      }  
                </div>
            </div>
            })
           }
        </div>
    );
}

export default AdminRequirement;