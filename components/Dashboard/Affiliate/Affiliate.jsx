import Link from "next/link";

function Affiliate() {
    
    return (
        <div>
            <div>
                {/* Navigation */}
                <div className="flex justify-center items-center gap-2 bg-base-200">
                    <Link className={`px-4 py-2 bg-base-300 font-bold text-blue-500`} href={'#'}>Withdraw Request</Link>
                    <Link className={`px-4 py-2 bg-base-300 font-bold text-blue-500`} href={'#'}>Affiliate URLS</Link>
                    {/* <Link href={'#'}>Affiliate </Link> */}
                </div>
                {/* Body */}
                <div>

                </div>
            </div>
        </div>
    );
}

export default Affiliate;