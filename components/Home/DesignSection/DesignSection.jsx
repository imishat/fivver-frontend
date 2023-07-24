import DesignCategorySection from "../DesignCategorySection/DesignCategorySection";
import DesignCategories from "./DesignCategories/DesignCategories";
import DesignTags from "./DesignTags/DesignTags";

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
        <div className="w-3/12">
          <div className="h-[300px] rounded-md border"></div>
        </div>
      </div>
    </div>
  );
};

export default DesignSection;
