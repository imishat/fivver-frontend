import { useState } from "react";

function ProjectCountDown() {
// Set the date we're counting down to
var countDownDate = new Date("Dec 5, 2023 15:37:25").getTime();


         // Get today's date and time
var now = new Date().getTime();
         // Find the distance between now and the count down date
var distance = countDownDate - now;
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
         setHours(hours)
         setMinutes(minutes)
         setSeconds(seconds)    
       },1000)  


    return (
        <>
        
        {
            distance < 0 ? <>
                <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
              {" "}
              <span className="font-bold text-xl">00</span> <span>Days</span>
            </p>
            <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
              {" "}
              <span className="font-bold text-xl">00</span> <span>Hours</span>
            </p>
            <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
              {" "}
              <span className="font-bold text-xl">00</span> <span>Minutes</span>
            </p>
            <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
              {" "}
              <span className="font-bold text-xl">00</span> <span>Seconds</span> 
             </p> 
            </> 
            :
            <>
            <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
              {" "}
              <span className="font-bold text-xl">{days}</span> <span>Days</span>
            </p>
            <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
              {" "}
              <span className="font-bold text-xl">{hours}</span> <span>Hours</span>
            </p>
            <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
              {" "}
              <span className="font-bold text-xl">{minutes}</span> <span>Minutes</span>
            </p>
            <p className="flex flex-col text-center border border-blue-400 px-2 py-2 w-full">
              {" "}
              <span className="font-bold text-xl">{seconds}</span> <span>Seconds</span> 
             </p> 
          </>
        }
        </>
       
    );
}

export default ProjectCountDown;