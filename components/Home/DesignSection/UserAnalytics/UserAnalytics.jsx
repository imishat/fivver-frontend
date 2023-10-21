import { useAdminStatus } from "@/components/queries/query/getAdminStatus.query";

const UserAnalytics = () => {
  const {data}=useAdminStatus()

  const AdminData=data?.data
  
    return (
        <div className="h-auto w-auto text-center md:text-left p-2 rounded-md border-2 bg-[#F2F9FF] border-[#A2D1F2]">
        {/* Username */}
        <div className="py-2 text-black font-bold border-b border-blue-200">
          <p>Mahfujurrahm535</p>
        </div>
          
          <div className="space-y-2">
            <div className="text-black">
              <p className="text-sm">Avg. Response Time</p>
              <h3 className="font-bold text-xl">{AdminData?.averageResponseTimeInMilliseconds
 / 3600000} Hour</h3>
            </div>
            <div className="text-black">
              <p className="text-sm">Avg. Rating</p>
              <h3 className="font-bold text-xl">{AdminData?.averageRating}Stars</h3>
            </div>
            <div className="text-black">
              <p className="text-sm">Last Project Complete</p>
            <h3 className="font-bold text-xl">{(AdminData?.lastProjectCompletedMillisecondsAgo / 3600000).toFixed(2)} Hours</h3>

            </div>
            <div className="text-black">
              <p className="text-sm">On-time Delivery</p>
              <h3 className="font-bold text-xl">{AdminData?.onTimeDeliveryPercentage}%</h3>
            </div>
            <div className="text-black">
              <p className="text-sm">Active Project</p>
              <h3 className="font-bold text-xl">{ AdminData?.activeProjects
}</h3>
            </div>
          </div>
      </div>
    );
};

export default UserAnalytics;