import axios from "axios";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

const SellerReviews = () => {
    // get all reviews
    const [sellerReviews,setSellerReviews] = useState([])
    // fetch data
    useEffect(()=>{
        axios.get(`/data/seller-reviews.json`)
        .then(res=>{
            setSellerReviews(res.data)
        })
    },[])
    return (
        <div>
            {/* title */}
            <div className="my-8">
                <h2 className="text-2xl px-4 sm:px-0 font-bold">Seller Reviews</h2>
            </div>
            <div className="w-20 border-gray-400 border-b mx-4 sm:px-0"></div>

            {/* Review Card */}
            <div className="space-y-7  my-12">
                {
                    sellerReviews.map(review=><ReviewCard key={review.id} review={review} />)
                }
            </div>
        </div>
    );
};

export default SellerReviews;