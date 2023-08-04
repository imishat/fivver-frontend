
// make a loading spinner component with react-icons loading spinner with custom size and tailwind css
// and color

import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
export function Spin({ size = 20, color = "text-black-500", speed = "0.2s" }) {

  return (
    <div className="flex justify-center items-center">
      <AiOutlineLoading3Quarters size={size} style={{ animationDuration: speed }} className={`animate-spin  text-4xl ${color} `} />
    </div>
  );

}