import { useState } from "react";
import SIgnUp from "./SIgnUp";
import SignIn from "./SignIn";

const Join = () => {
  


  // toggle sign in or sign up
  const [toggle, setToggle] = useState("signin");
  return (
    <div className="h-full my-20 flex justify-center items-center w-full">
      <div className="w-[440px] h-full border">
        <div className="flex justify-between h-14 font-bold ">
          {/* sign in btn */}
          <div className=" relative h-full w-full ">
            <button
              onClick={() => setToggle("signin")}
              className={`w-full h-full  ${
                toggle === "signin"
                  ? "after:content-normal after:bg-[#1B8CDC] after:h-6 after:w-6 after:absolute after:left-[45%] after:-bottom-2 after:rotate-45 bg-[#1B8CDC] text-white"
                  : "bg-[#D1E6F9] text-black"
              } `}
            >
              Sign In
            </button>
          </div>
          {/* sign up btn */}
          <div className=" relative h-full w-full">
            <button
              onClick={() => setToggle("signup")}
              className={`w-full h-full ${
                toggle === "signup"
                  ? "after:content-normal after:bg-[#1B8CDC] after:h-6 after:w-6 after:absolute after:left-[45%] after:-bottom-2 after:rotate-45 bg-[#1B8CDC] text-white"
                  : "bg-[#D1E6F9] text-black"
              } `}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="bg-[#F2F9FF]">
          {/* sign in form */}
          {toggle === "signin" ? (
           <SignIn setToggle={setToggle} />
          ) : (
            // Sign up form ===========================================
           <SIgnUp setToggle={setToggle} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Join;
