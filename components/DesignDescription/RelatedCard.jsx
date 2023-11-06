import { SwiperSlide } from "swiper/react";
import { useGetRelated } from "../queries/query/related.query";
import DescRelatedCard from "./DescRelatedCard";

function RelatedCard({data}) {
    const {data:relatedData} = useGetRelated({related:data,limit:''})
    const related = relatedData?.data?.designs[0]
    console.log(related)
    return (
        <div> <SwiperSlide className="flex !gap-2 !w-[300px] !h-[250px] !max-h-[300px]">
                <DescRelatedCard data={related} />
              </SwiperSlide>
        </div>
    );
}

export default RelatedCard;