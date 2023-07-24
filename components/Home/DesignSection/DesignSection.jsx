import DesignCategorySection from "../DesignCategorySection/DesignCategorySection";
import DesignCategories from "./DesignCategories/DesignCategories";
import DesignTags from "./DesignTags/DesignTags";
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
      <div className="flex gap-2">
        <div className="w-9/12">
          <DesignCategorySection />
        </div>
            {/* User analytis */}
        <div className="w-3/12 space-y-4">
          <UserAnalytics />
          <StockImageSites />
        </div>
      </div>
    </div>
  );
};

export default DesignSection;
