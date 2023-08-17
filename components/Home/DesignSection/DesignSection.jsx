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
      <div className="md:flex gap-2">
        <div className="md:w-9/12 w-full">
          <DesignCategorySection />
        </div>
            {/* User analytis */}
        <div className="md:w-3/12 w-full space-y-4">
          <UserAnalytics />
          <StockImageSites />
        </div>
      </div>
    </div>
  );
};

export default DesignSection;
