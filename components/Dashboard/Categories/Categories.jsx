import { useGetCategoryData } from "@/components/queries/query/getCategory.query";
import CategoryCard from "./CategoryCard";

function Categories() {
     // get category by id
  const {data: categories} = useGetCategoryData({categoryId:''})
  const category = categories?.data?.categories
  console.log(category)
    return (
        <div className="md:flex gap-3">
        <div className="md:w-2/3 mx-auto">
          <div>
            {/* Client card */}
            <div className="py-3 space-y-3">
              {category?.length
                ? category?.map((category, i) => {
                    return <CategoryCard category={category} key={i} />;
                  })
                : "No Projects"}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Categories;