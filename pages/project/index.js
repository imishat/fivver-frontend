import Main from "@/Layout/Main";
import StockImageSites from "@/components/Home/DesignSection/StockImageSites/StockImageSites";
import Project from "@/components/Project/Project";

const index = () => {
    return (
        <Main title={'Create Project'}>
            <div className="md:flex md:my-12 space-y-4 gap-6 md:space-y-0 justify-evenly md:gap-12">
                <div className="md:w-8/12">
                <Project />
                </div>
                <div className="md:w-3/12">
                    <StockImageSites />
                </div>
            </div>
        </Main>
    );
};

export default index;