import ClientCard from "./ClientCard";

const Dashboard = () => {
    return (
        <div className="my-14">
            <div className="md:flex gap-3">
                <div className="md:w-2/3">
                    <div>
                        <div className="flex justify-between items-center px-6 border border-gray-400 h-16">
                            <h2 className="text-2xl font-bold text-[#1C8CDC]">Active Projects - 12 ($280)</h2>
                            {/* projects select */}
                            <select className="px-4 h-8 w-auto py-1 border border-gray-400 bg-white" name="project" id="">
                                <option value="active" key="active">Active Projects (12)</option>
                                <option value="rivision" key="rivision">In Revision (3)</option>
                                <option value="progress" key="progress">In Progress (3)</option>
                                <option value="waiting" key="waiting">Waiting</option>
                                <option value="delevered" key="delevered">Delivered (3)</option>
                            </select>
                        </div>
                        {/* Client card */}
                       <div className="py-3 space-y-3">
                       {
                            [...Array(12).keys()].map((item,i)=>{
                               return <ClientCard key={i} />
                            })
                        }
                       </div>
                    </div>
                </div>
                <div className="md:w-1/3">
                    {/* Info */}
                    <div className="bg-[#F2F9FF] px-2 py-2" >
                        <div className="px-4 ">
                            <h3 className="py-3 border-b text-[#1C8CDC] border-[#1C8CDC] text-xl font-bold">This Month</h3>
                        </div>
                        <div className="px-4">
                            <ul>
                                <li className="flex py-2 justify-between items-center">
                                    <p>Completed Projects</p> <span className="font-bold ">90</span>
                                </li>
                                <li className="flex py-2 justify-between items-center">
                                    <p>Earnings</p> <span className="font-bold ">$90</span>
                                </li>
                                <li className="flex py-2 justify-between items-center">
                                    <p>Cancelled Projects</p> <span className="font-bold ">1($35)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;