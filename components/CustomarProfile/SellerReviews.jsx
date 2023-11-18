import { useSelector } from "react-redux";
import { useGetReviews } from "../queries/query/getReviews.qurey";
import ReviewCard from "./ReviewCard";

const SellerReviews = () => {
    const { user } = useSelector((state) => state.user);



   
    // get all reviews
  

    const {data:sellerReviews1} = useGetReviews({userId:user?.userId,projectId:'',update:''})
const reviews = sellerReviews1?.data?.reviews
   
  
    return (
        <div>
            {/* title */}
            <div className="my-8">
                <h2 className="text-2xl px-4 sm:px-0 font-bold">Seller Reviews({reviews?.length})</h2>
            </div>
            <div className="w-20 border-gray-400 border-b mx-4 sm:px-0"></div>

            {/* Review Card */}
            <div className="space-y-7  my-12">
                {
                    reviews?.map(review=><ReviewCard key={review.id} review={review} />)
                }
            </div>
        </div>
    );
};

export default SellerReviews;