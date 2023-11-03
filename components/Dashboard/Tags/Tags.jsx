import { useGetTags } from "@/components/queries/query/getTags.query";
import TagsCard from "./TagsCard";

const Tags = () => {
      // tags Data
  const { data: tagsData } = useGetTags({tagId:''});
  const tagsOptions = tagsData?.data?.tags;
    return (
        <div className="md:flex gap-3">
      <div className="md:w-2/3 mx-auto">
        <div>
          {/* Client card */}
          <div className="py-3 space-y-3">
            {tagsOptions?.length
              ? tagsOptions?.map((tags, i) => {
                  return <TagsCard tags={tags} key={i} />;
                })
              : "No Tags"}
          </div>
        </div>
      </div>
    </div>
    );
};

export default Tags;