import StockImageSites from "../Home/DesignSection/StockImageSites/StockImageSites";
import PriceCard from "./PriceCard";

const PriceList = () => {
    return (
        <div className="md:flex my-6 gap-6">
            <div className="md:w-9/12">
                <div>
                    <p className="text-lg"><span className="font-bold">I have priced many designs below. The design you need, You can start a project for that design. I will create your design.</span> <br /> Please contact me first if you need any designs other than those below. <br /> (Also, if you need more than one design, you can start a separate order for each design. Or you can contact me to start a custom project for all your designs.)</p>
                </div>
                <div className="flex justify-center my-6">
                    <h1 className="uppercase text-4xl font-bold text-[#1B8CDC]">Price List</h1>
                </div>
                <div className="space-y-6">
                    {
                        [2,2,2,2].map((data,i)=><PriceCard key={i} data={data} />)
                    }
                </div>
            </div>
            <div className="md:w-3/12">
                <StockImageSites />
            </div>
        </div>
    );
};

export default PriceList;