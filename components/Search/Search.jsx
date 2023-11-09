import Link from "next/link";
import { useRouter } from "next/router";
import StockImageSites from "../Home/DesignSection/StockImageSites/StockImageSites";
import { useAllDesigns } from "../queries/query/designs.query";

function Search() {
    const router = useRouter()
    const {searchId} = router.query

    //get all design data
    const {data:allDesignData} = useAllDesigns({designId:searchId,page:'',limit:''})
    console.log(allDesignData)
    const designs = allDesignData?.data?.designs
    return (
        <div className="flex">
            <div className="w-9/12 my-12 mx-2">
            {
                designs?.map((design,i)=>{
                 return   <div key={i} className="flex bg-base-200 border-b border-black mb-2">
                   <div className="w-32 h-32 border border-black">
                    <img className="w-32 h-32 object-cover overflow-hidden" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${design?.featuredImageId}`} alt="" />
                   </div>
                    <div className="flex flex-col p-2">
                    <div>
                        <Link href={`/design/${design?.designId}`} className="font-bold"> {design?.title}</Link>
                    </div>
                    <div>
                        {
                            design?.category?.map((cat,i)=>{
                                return <h2 className="text-xs">{cat?.name}</h2>
                            })
                        }
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs">
                 <span className="font-bold">  File Format: </span><h2 className="text-xs">{design?.fileFormat}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold">Size:</span><h2 className="text-xs">{design?.size}</h2>
                    </div>
                    </div>
                </div>
})
            }
            </div>
            <div className="w-3/12">
            <StockImageSites />
          </div>
        </div>
    );
}

export default Search;