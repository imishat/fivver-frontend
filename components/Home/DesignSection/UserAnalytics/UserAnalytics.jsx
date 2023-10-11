
const UserAnalytics = () => {
    return (
        <div className="h-auto w-auto text-center md:text-left p-2 rounded-md border-2 bg-[#F2F9FF] border-[#A2D1F2]">
        {/* Username */}
        <div className="py-2 text-black font-bold border-b border-blue-200">
          <p>Mahfujurrahm535</p>
        </div>
          
          <div className="space-y-2">
            <div className="text-black">
              <p className="text-sm">Avg. Response Time</p>
              <h3 className="font-bold text-xl">1 Hour</h3>
            </div>
            <div className="text-black">
              <p className="text-sm">Avg. Rating</p>
              <h3 className="font-bold text-xl">0 Stars</h3>
            </div>
            <div className="text-black">
              <p className="text-sm">Last Project Complete</p>
              <h3 className="font-bold text-xl">0 Hour</h3>
            </div>
            <div className="text-black">
              <p className="text-sm">On-time Delivery</p>
              <h3 className="font-bold text-xl">100%</h3>
            </div>
            <div className="text-black">
              <p className="text-sm">Active Project</p>
              <h3 className="font-bold text-xl">36</h3>
            </div>
          </div>
      </div>
    );
};

export default UserAnalytics;