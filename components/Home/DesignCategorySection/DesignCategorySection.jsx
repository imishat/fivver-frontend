import { useGetDesignCategoriesData } from "@/components/queries/query/designCategories.queries";
import { useEffect, useState } from "react";
import DesignCategorySectionCard from "./DesignCategorySectionCard";

export default function DesignCategorySection() {
  // limit
  const [limit, setLimit] = useState("10");

  // page
  const [page, setPage] = useState("1");
  // categories
  const { data } = useGetDesignCategoriesData({ page, limit });

  // categories
  const categories = data?.data.categories;

  // remove overly after all data show
  useEffect(() => {
    if (data?.data?.totalCount <= limit) {
      const style = document.createElement("style");
      document.head.appendChild(style);
    style.innerHTML = `.children::after { content: none !important; }`;
    console.log(limit)
    }
  }, [limit,categories]);
  return (
    <div className="space-y-3 relative">
      <div className="categories relative">
        {categories?.length ? (
          categories.map((category, i) => (
            <DesignCategorySectionCard category={category} key={i} />
          ))
        ) : (
          <div className="flex justify-center items-center h-12">
            <p>No Data Found</p>
          </div>
        )}
      </div>

      {/* // Pagination */}
      {categories?.length &&
        (data?.data?.totalCount < limit ? (
          <div className="flex justify-center">
            <button className="border rounded-full px-2 py-1">
              No More Data
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex absolute bottom-0 z-50 justify-center">
            <button
              onClick={() => setLimit(JSON.stringify(parseInt(limit) + 5))}
              className="border rounded-full"
            >
             <img src="/images/more.png" className="w-12 h-12 p-2" alt="" />
            </button>
          </div>
          </div>
        ))}
    </div>
  );
}
