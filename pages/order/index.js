import Main from "@/Layout/Main";
import StockImageSites from "@/components/Home/DesignSection/StockImageSites/StockImageSites";
import Orders from "@/components/Orders/Orders";

const index = () => {
    return (
        <Main title={'Create order'}>
            <div className="md:flex md:my-12 space-y-4 md:space-y-0 justify-evenly md:gap-12">
                <div className="md:w-7/12">
                <Orders />
                </div>
                <div className="md:w-3/12">
                    <StockImageSites />
                </div>
            </div>
        </Main>
    );
};

export default index;