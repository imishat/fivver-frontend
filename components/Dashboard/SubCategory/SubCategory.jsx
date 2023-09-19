import { useGetSubCategoryById } from "@/components/queries/query/getSubcategory.query";
import SubCard from "./SubCard";

function SubCategory() {
    // get sub category by id
const {data:subcategoryData} = useGetSubCategoryById({subcategoryId:''})
// subcategory
const subcategory = subcategoryData?.data?.subcategories
console.log(subcategory)
    return (
        <div className="md:flex gap-3">
        <div className="md:w-2/3 mx-auto">
          <div>
            {/* Client card */}
            <div className="py-3 space-y-3">
              {subcategory?.length
                ? subcategory?.map((sub, i) => {
                    return <SubCard sub={sub} key={i} />;
                  })
                : "No Sub Category"}
            </div>
          </div>
        </div>
      </div>
    );
}

export default SubCategory;