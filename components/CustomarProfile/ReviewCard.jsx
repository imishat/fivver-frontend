import { BsStarFill } from "react-icons/bs";

const ReviewCard = ({review}) => {
    return (
        <div className="px-2 sm:px-3">
            <div className="flex items-center gap-2">
                <img className="w-8 h-8 rounded-full" src={review.profileImage} alt="" />
                <h3 className="text-xl font-bold">{review.name}</h3>
            </div>
            {/* review body */}
            <div className="py-2">
                {review.description
}
            </div>
            {/* Stars */}
            <div className="sm:gap-12 flex items-center">
                <div className="flex items-center gap-3">
                    <p className="text-lg font-bold">{review.stars}</p>
                    <div className="flex gap-1 items-center ">
                        {
                            [...Array(parseInt(review.stars)).keys()].map((item,i)=>
                            <div key={i}>
                                <BsStarFill color="#1781CB" />
                            </div>
                            )
                        }
                    </div>
                </div>
                {/* Date */}
                <div>
                    <p>{review.date}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;