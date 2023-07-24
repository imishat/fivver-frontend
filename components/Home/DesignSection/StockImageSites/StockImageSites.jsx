import StockSiteCard from "./StockSiteCard";

const StockImageSites = () => {
    return (
       <div className="rounded-lg overflow-hidden border border-blue-400">
        <div className="bg-blue-400 text-white px-3 py-2">
            <p>I've added links to a few stock image sites below. You can choose images from any of the sites linked below for your design.</p>
        </div>
        <div className="p-2 space-y-3">
            {
                [1,1,1,1,1].map((item,i)=><StockSiteCard key={i} />)
            }
        </div>
       </div>
    );
};

export default StockImageSites;