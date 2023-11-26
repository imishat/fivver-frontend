import DesignCategorySection from "../DesignCategorySection/DesignCategorySection";
import DesignCategories from "./DesignCategories/DesignCategories";
import DesignTags from "./DesignCompanies/DesignTags";
import StockImageSites from "./StockImageSites/StockImageSites";
import UserAnalytics from "./UserAnalytics/UserAnalytics";

const DesignSection = () => {
  return (
    <div>
      {/* Design section */}
      <div>
        <DesignCategories />
      </div>
      {/* Design tags */}
      <div>
        <DesignTags />
      </div>
      {/* Design Category section */}
      <div className="md:flex gap-4 px-8">
        <div className="md:w-9/12 w-full">
          <DesignCategorySection />
        </div>
            {/* User analytics */}
        <div className="md:w-3/12 max-w-sm w-full space-y-4 ">
          <UserAnalytics />
          <StockImageSites />
        </div>
      </div>
    </div>
  );
};

export default DesignSection;
