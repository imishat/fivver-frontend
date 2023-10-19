import { useMessageData } from "@/components/queries/query/getInquiries.queries";

function MessageInquire() {

    const {data:messageData} = useMessageData()
    const messages = messageData?.data?.inquiries
    console.log(messages)
    return (
        <div>
            <div className="flex justify-center items-center">
                <h2 className="text-xl font-bold">Message From Users</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {
                    messages?.map((message)=>{
                      return  <div key={message?.inquiryId} className="border p-2 border-gray-400 rounded-md bg-base-100 text-black">
                        <div className="flex justify-center">
                        <h2 className="font-bold text-xl">{message?.name}</h2>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                           <p className="font-bold"> Email:</p><p>{message?.email}</p>
                            </div>
                          <div className="flex items-center gap-2">
                          <p className="font-bold">Website:</p><p>{message?.website}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold">Favorite Design:</p><p>{message?.favoriteDesign}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold">Message:</p><p>{message?.message}</p>
                          </div>
                        </div>
                        </div>
                    })
                }
            </div>

        </div>
    );
}

export default MessageInquire;