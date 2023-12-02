import { useGetCategoryData } from "@/components/queries/query/getCategory.query";
import Link from "next/link";
import CategoryCard from "./CategoryCard";

function Categories() {
  // get category by id
  const { data: categories } = useGetCategoryData({ categoryId: '' })
  const category = categories?.data?.categories
  console.log(category)
  return (
    <div className="md:flex gap-3">
      <div className="md:w-2/3 mx-auto">
        <div>
          <Link className="bg-blue-400 px-4 py-2 text-white font-bold rounded hover:bg-[#1881cc] duration-300" href={'/update/category/create'}>Create</Link>
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