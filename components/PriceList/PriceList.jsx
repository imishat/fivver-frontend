import StockImageSites from "../Home/DesignSection/StockImageSites/StockImageSites";
import { useGetCategoryData } from "../queries/query/getCategory.query";
import PriceCard from "./PriceCard";

const PriceList = () => {

    const {data:categoriesData} = useGetCategoryData({categoryId:''})
    const categories = categoriesData?.data?.categories
    return (
        <div className="md:flex my-6 px-8 gap-6">
            <div className="md:w-9/12">
                <div>
                    <p className="text-lg"><span className="font-bold">We have priced many designs below. The design you need, You can start a project for that design. We will create your design.</span> <br /> Please contact us first if you need any designs other than those below. <br /> (Also, if you need more than one design, you can start a separate project for each design. Or you can contact us to start a custom project for all your designs.)
</p>
                </div>
                <div className="flex justify-center my-6">
                    <h1 className="uppercase text-4xl font-bold text-[#1B8CDC]">Price List</h1>
                </div>
                <div className="space-y-6">
                    {
                       categories?.map((category,i)=><PriceCard key={i} category={category} />)
                    }
                </div>
                <div className="p-8">
                    <p className="text-[#1B8CDC] font-semibold text-xl whitespace-pre-wrap">If you would like to take a template/source file of any design we have created, please contact us, and show us the design you like. We will give you the template/source file.
                    </p>
                </div>
            </div>
            <div className="md:w-3/12">
                <StockImageSites />
            </div>
        </div>
    );
};

export default PriceList;