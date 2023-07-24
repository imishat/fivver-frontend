import DesignCategorySectionCard from "./DesignCategorySectionCard";

const DesignCategorySection = () => {
    return (
        <div className="flex gap-3 flex-col">
            {
                [1,1,1,1].map(item=><DesignCategorySectionCard />)
            }
        </div>
    );
};

export default DesignCategorySection;