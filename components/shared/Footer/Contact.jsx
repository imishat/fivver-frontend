import { useCreateMessage } from "@/components/queries/mutation/message.mutation";
import useToast from "@/components/utility/useToast";
import { useForm } from "react-hook-form";

const Contact=()=>{
    const {handleSubmit,register,reset} = useForm()

    const {showToast,Toast} = useToast()

    // create useCreateInquiries
    const {mutate:createMessage} = useCreateMessage()

    const handleSendMessage = (data) =>{
        const messageData = {
            type:'start',
            "name": data?.name,
            "email": data?.email,
            "website": data?.website,
            "favoriteDesign": data?.design,
            "projectId": "",
            "receiverId":'sa0',
            sender:{senderId:user?.userId,name:user?.fullName,profilePicture:user?.profilePicture},
            "content": data?.message
        }
        createMessage(messageData,{
            onSuccess: (res) => {
              showToast('Message send to Admin', "success");
              reset()
            },
            onError: (err) => {
              showToast(err?.response?.data?.message);
              // loading stop
            },
          }
       
        )
    }
    return(
<> <Toast />
        <div>
        
        <div className=" flex justify-center text-center py-4">
          <div className="md:text-2xl font-semibold">
            
            <p className="text-black">If you would like to take a template/source file of any design
. </p>
            <p className="text-black">  we have created, please contact us, and show us the design you like. </p>
            <p className="text-black"> We will give you the template/source file </p>
          </div>
        </div>
      </div>
        <div className=  ''>
      
            <div className="flex justify-center justify-items-center mx-auto mb-10 mt-10 mx-10 items-center">
            <form onSubmit={handleSubmit(handleSendMessage)} className=" rounded-md bg-rose-100 text-black p-6">
                <div className="space-y-3">
                    <label htmlFor="name"></label>
                    <input {...register('name',{required:'true'})} placeholder="Name" className="input input-bordered rounded-none w-full" type="text" id="name" />
                    <label htmlFor="email"></label>
                    <input {...register('email',{required:'true'})} placeholder="Email" className="input input-bordered rounded-none w-full" type="email" id="email" />
                    <label htmlFor="website"></label>
                    <input {...register('website',{required:'true'})} placeholder="Website / Facebook" className="input input-bordered rounded-none w-full" type="text" id="website" />
                    <label htmlFor="design"></label>
                    <input {...register('design',{required:'true'})} placeholder="Example Design" className="input input-bordered rounded-none w-full" type="text" id="design" />
                    <label htmlFor="message"></label>
                    <textarea {...register('message',{required:'true'})}  placeholder="Message" id="message" className="textarea h-24 textarea-bordered w-full rounded-none"></textarea>
                   <div className="flex justify-center w-full">
                   <button className="px-4 py-2 rounded-sm mx-auto bg-blue-500">Submit</button>
                   </div>
                </div>
            </form>
        </div>
        

</div>
</>
    )
}
export default Contact