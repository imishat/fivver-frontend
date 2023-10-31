import { useState } from "react";


function CountDown({deadline,project}) {



  const date = new Date(deadline);
 
  const deadline2 = date.setTime(date.getTime() - 6 * 60 * 60 * 1000)
// const deadline3 = deadline2.toISOString()


// Set the date we're counting down to
var countDownDate = new Date(date).getTime();

// moment(deadline).format('LLL') || "Dec 5, 2023 15:37:25"
         // Get today's date and time



// Convert the ISO date string to a Date object
let dateObj = new Date();

// Get the timestamp in milliseconds since the epoch
let timestamp = dateObj.getTime();




         // Find the distance between now and the count down date
var distance = countDownDate - timestamp;
// days
const [days,setDays] = useState('')
const [hours,setHours] = useState('')
const [minutes,setMinutes] = useState('')
const [seconds,setSeconds] = useState('')

// Update the count down every 1 second

       setTimeout(()=>{
  // Time calculations for days, hours, minutes and seconds
         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
         var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
         var seconds = Math.floor((distance % (1000 * 60)) / 1000);
         setDays(days)
         setHours(hours+6)
         setMinutes(minutes)
         setSeconds(seconds)    
       },1000)  


    return (
        <>
        
        {
            distance < 0 || project?.status==='Completed' || !deadline?.length ? <div className="flex items-center">
                <p>
              {" "}
              <span className="font-bold text-xl">00</span> <span></span>
            </p>
            -
            <p>
              {" "}
              <span className="font-bold text-xl">00</span> <span></span>
            </p>
            </div> 
            :
            <div className="flex items-center gap-2">
            <p className="">
              {" "}
              <span className={`${days===0 ? 'hidden':''} font-bold text-xl`}>{days||0}d -
</span> 
            </p>
            
            <p className={` ${hours<12 && days===0  ? 'text-red-500':''}`}>
              {" "}
              <span className={`${hours===0 ? 'hidden':''} font-bold text-xl`}>{hours||0}h 
</span>
<span className={`${days!==0 ? 'hidden':''}`}>-</span>
            </p>
            
            <p className={` ${hours<12 ? 'text-red-500':''}`}>
              {" "}
              <span className={`${minutes===0 || days!==0 ? 'hidden':''} font-bold text-xl`}>{minutes||0}m 
</span>
            </p>
            
            <p className={`${hours<12 ? 'text-red-500':''}`}>
              {" "}
              <span className={`${seconds===0 || hours!==0? 'hidden':''} font-bold text-xl`}>-{seconds||0}s 
</span>
             </p> 
          </div>
        }
        </>
       
    );
}

export default CountDown;

function convertDateFormat(dateStr) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dateObj = new Date(dateStr);
  const month = months[dateObj.getUTCMonth()]; // get the month name from the array using the month index
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const hours = String(dateObj.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');

  return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
}