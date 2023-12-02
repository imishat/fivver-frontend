import { useGetSubCategoryById } from "@/components/queries/query/getSubcategory.query";
import Link from "next/link";
import SubCard from "./SubCard";

function SubCategory() {
  // get sub category by id
  const { data: subcategoryData } = useGetSubCategoryById({ subcategoryId: '' })
  // subcategory
  const subcategory = subcategoryData?.data?.subcategories

  return (
    <div className="md:flex gap-3">
      <div className="md:w-2/3 mx-auto">
        <div>
          <Link className="bg-blue-400 px-4 py-2 text-white font-bold rounded hover:bg-[#1881cc] duration-300" href={'/update/subcategory/create'}>Create</Link>
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