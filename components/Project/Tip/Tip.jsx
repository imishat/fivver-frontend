import Link from "next/link";

const Tip = () => {
  return (
    <div className="mt-6 lg:mx-20 md:flex gap-12 justify-between">
      <div className="md:w-7/12">
        <div className="pb-5 mx-4 md:mx-0">
          <h2 className="text-3xl font-bold">Thanks for your review</h2>
          <p className="py-2">
            Show your appreciation to your designer by giving a tip.
          </p>
        </div>

        <div className="flex">
          <button className="border w-full py-6 font-bold text-xl">$5</button>
          <button className="border w-full py-6 font-bold text-xl">$10</button>
          <label
            className="border w-full md:flex text-center md:text-left justify-center md:justify-start py-6"
            htmlFor="custom"
          >
            <span className="text-lg font-bold">Custom Tip</span>{" "}
            <input
              className="w-20 border border-gray-400 py-1 ml-3"
              type="number"
              id="custom"
            />
          </label>
        </div>
        <div className="flex justify-between items-center gap-6 my-8">
          <p className="w-full text-right">No Thanks</p>
          <button className="px-2 rounded py-1 bg-[#1679BF] text-white w-72 text-xl font-bold">
            Send Tip
          </button>
        </div>
      </div>
      {/* Project details */}
      <div className="h-full md:w-80">
        <div className="bg-blue-50 p-4">
          <div>
            <h2 className="text-xl font-bold py-2">Project Details</h2>
          </div>
          <div className="flex bg-white p-1 px-2">
            <img src="" className="bg-rose-100 w-20 h-16 m-2" alt="" />
            <div>
              <p className="leading-5 py-1">Door hanger design</p>
              <Link className="text-blue-500 font-bold" href={"#"}>
                Completed
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <ul>
              <li className="flex py-1 items-center justify-between w-full">
                <p>Project by</p>
                <strong>Client Name</strong>
              </li>
              <li className="flex py-1 items-center justify-between w-full">
                <p>Quantity</p>
                <strong>1</strong>
              </li>
              <li className="flex py-1 items-center justify-between w-full">
                <p>Duration</p>
                <strong>2 Days</strong>
              </li>
              <li className="flex py-1 items-center justify-between w-full">
                <p>Total Price</p>
                <strong>$40</strong>
              </li>
              <li className="flex py-1 items-center justify-between w-full">
                <p>Project Number</p>
                <strong>#ZZ1B5</strong>
              </li>
            </ul>
          </div>
        </div>
        {/* Back btn */}
        <div className="my-12 font-bold flex justify-center">
          <Link className="text-xl" href={"#"}>
            Back to the project page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tip;
