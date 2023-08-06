import { BsCheckCircleFill } from "react-icons/bs";

const Orders = () => {
  return (
    <div className="w-full ">
      {/* warinig */}
      <div className="md:mb-12 my-7 text-center">
        <h2 className="md:text-3xl sm:text-xl text-base font-bold">
          Please select each step below carefully
        </h2>
      </div>
      {/* Project start */}
      <div className="border border-gray-400 bg-[#F2F9FF]">
        {/* Title */}
        <div className="w-full bg-blue-500 py-4 flex justify-center items-center">
          <h3 className="text-xl font-bold text-white">
            {" "}
            You are starting a project
          </h3>
        </div>
        {/* design select */}
        <div className="mt-5 p-4">
          <p className="text-sm py-1">Choos the design you need</p>
          {/* select */}
          <div className="flex items-center border p-3  bg-white">
            <img
              className="w-24 h-16"
              src="https://linuxhint.com/wp-content/uploads/2021/10/Best-Color-Picker-Apps-for-Linux-1.png"
              alt=""
            />
            <select
              className="w-full py-5 px-2 bg-white focus-visible::ring-0 focus-visible:outline-none text-xl font-bold"
              id="design"
            >
              <option className="py-8 flex" value="door-hanger-design">
                Door Hanger Design
              </option>
            </select>
          </div>
        </div>
        {/* Variant */}
        <div className="p-4">
          <p className="text-sm py-1">Choos the design you need</p>
          {/* Select */}
          <div className="border py-1 px-3  bg-white">
            <select
              className="w-full bg-white focus-visible::ring-0 focus-visible:outline-none text-sm"
              id="design"
            >
              <option className="py-8 flex" value="door-hanger-design">
                Door Hanger Design
              </option>
            </select>
          </div>
        </div>
        {/* Quantity and extra fast */}
        <div className="flex gap-2 justify-between p-4">
            {/* Quantity */}
            <div className="flex items-center gap-3">
                <p>Quantity</p>
                <select className="sm:px-12 px-2 py-2 bg-white border" id="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            {/* Fast delivery */}
            <div className="flex items-center gap-2">
                <input className="checkbox checkbox-sm rounded-none checkbox-bordered input-info" type="checkbox" id="extraFast" />
                <p className="text-sm">Extra-fast 1-day delivery</p>
                <p className="text-xl font-semibold text-[#3695E0]">$10</p>
            </div>
        </div>
        {/* info and total */}
        <div className="p-3 flex justify-between w-full items-center">
            {/* Info */}
            <div>
                <ul>
                    <li className="flex items-center gap-1"> <span><BsCheckCircleFill color="#3695E0" /></span>2 Days Delivery</li>
                    <li className="flex items-center gap-1"> <span><BsCheckCircleFill color="#3695E0" /></span>Unlimited Revisions</li>
                    <li className="flex items-center gap-1"> <span><BsCheckCircleFill color="#3695E0" /></span>PSD Source File</li>
                    <li className="flex items-center gap-1"> <span><BsCheckCircleFill color="#3695E0" /></span>Print Ready PDF or JPEG File</li>
                </ul>
            </div>
            {/* total */}
            <div className="flex justify-center items-center w-1/2 border py-4 h-[80px] bg-white">
                <div className="">
                    <h3 className="text-xl">Total</h3>
                    <h1 className="text-3xl font-semibold text-[#3695E0]">$40</h1>
                </div>
            </div>
        </div>
        {/* btn */}
        <div className="w-full p-3 flex justify-center items-center">
            <button className="flex items-center gap-3 hover:bg-opacity-70 bg-[#3695E0] w-full text-white justify-center py-2 text-xl font-semibold">Continue ($40)</button>
        </div>
        {/* hint */}
        <div className="flex justify-center p-3 items-center">
            <p className="py-4">Go to the payment option by clicking "Continue"</p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
