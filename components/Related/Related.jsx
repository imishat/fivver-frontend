
import Card from "../Card/Card";
import { useGetRelated } from "../queries/query/related.query";
const Related = ({ currentItems }) => {
   const {data:relatedData} = useGetRelated({related:currentItems,limit:4})
   const related = relatedData?.data?.designs
   console.log(related)
    return (
        <div className="bg-[#F2F9FF] md:p-8 h-full">
            <div className="flex justify-center">
                <h2 className="text-3xl font-bold p-3">Related Design</h2>
            </div>
            <div className="grid sm:grid-cols-2 p-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {
                    related?.map((item,i)=>{
                        return <Card data={item} key={i}></Card>
                    })
                }
            </div>
        </div>
    );
};

export default Related;
