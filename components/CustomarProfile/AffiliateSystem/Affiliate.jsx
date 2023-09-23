import Link from "next/link";

const Affiliate = () => {
  return (
    <div>
      <div>
        <h2 className="font-bold text-lg p-3 border-b mb-4">Affiliate</h2>
      </div>
      <div>
        <div className="flex items-center">
          <input
            className="input w-1/2 input-bordered rounded rounded-r-none input-sm"
            type="url"
            id="refUrl"
          />
          <button className="btn btn-sm rounded rounded-l-none border border-blue-500 bg-blue-500 text-white">
            Create Link
          </button>
        </div>
        <div>
          <div>
            <div>
              <h2 className="text-lg font-bold p-3 border-b mb-4">
                Created Links
              </h2>
            </div>
            <ul className="mb-12">
              <li className="flex border-b py-1 justify-between text-blue-500">
                <Link href={"#"} className="font-bold">
                  http://localhost:3000/design/saiA?ref=sa8
                </Link>
                <p className="font-bold text-black">
                  (<span>6</span> Clicks)
                </p>
              </li>
              <li className="flex border-b py-1 justify-between text-blue-500">
                <Link href={"#"} className="font-bold">
                  http://localhost:3000/design/saiA?ref=sa8
                </Link>
                <p className="font-bold text-black">
                  (<span>6</span> Clicks)
                </p>
              </li>
              <li className="flex border-b py-1 justify-between text-blue-500">
                <Link href={"#"} className="font-bold">
                  http://localhost:3000/design/saiA?ref=sa8
                </Link>
                <p className="font-bold text-black">
                  (<span>6</span> Clicks)
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affiliate;
