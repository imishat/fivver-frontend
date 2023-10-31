function Notification() {
    return (
        <div>
<div class="w-full h-auto relative">
    <div class="bg-white py-3.5  max-w-sm mx-auto  ease-linear">
        <div class="w-full flex items-center justify-between">
            <span class="font-medium text-sm text-slate-400">New Notification</span>
          
        </div>
        {
            [...Array(5).keys()].map((item,i)=>{
                return  <div key={i} class="flex px-5 items-center hover:shadow-xl border-b mt-2 rounded-lg py-1 cursor-pointer">
            <div class="relative flex flex-shrink-0 items-end">
                <img class="h-16 w-16 rounded-full" src="https://i.pravatar.cc/300"/>    
                <span class="absolute h-4 w-4 bg-green-400 rounded-full bottom-0 right-0 border-2 border-white"></span>
            </div>
            <div class="ml-3">
                <span class="font-semibold tracking-tight text-sm">John Doe </span>
                <span class="text-sm leading-none opacity-50"> reacted to your comment:</span>
                <p class="text-sm leading-4 pt-2 italic opacity-70">"This is the comment..."</p>
                <span class="text-[10px] text-blue-500 font-medium leading-4 opacity-75">a few seconds ago</span>
            </div>
        </div>
            })
        }
      
    </div>
</div>

        </div>
    );
}

export default Notification;