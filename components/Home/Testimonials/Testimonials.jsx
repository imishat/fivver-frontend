import { useGetReviews } from "@/components/queries/query/getReviews.qurey";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import Reviews from "./Reviews";

const Testimonials = () => {
  const router = useRouter()
  const {data:sellerReviews1} = useGetReviews({userId:'',projectId:'',update:''})
  const reviews = sellerReviews1?.data?.reviews
  console.log(sellerReviews1,'review')

  const [selectedStars, setSelectedStars] = useState(null);
  const [short,setShort] = useState('relevant')
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  
  const [averageStars, setAverageStars] = useState(0);
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      // Calculate the average stars
      const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
      const average = totalStars / reviews.length;

      // Update the state with the calculated average
      setAverageStars(average);
    } else {
      // If there are no reviews, set the average to 0
      setAverageStars(0);
    }
  }, [reviews]);
  console.log(reviews,'reviews')
  useEffect(() => {
    let filtered = reviews;

    if (selectedStars !== null) {
      filtered = reviews?.filter((review) => review?.stars === selectedStars);
    }
    if(short==='relevant'){
      filtered = reviews?.filter((review) => review?.description?.length >= 150);
    }

    setFilteredReviews(filtered);
  }, [selectedStars,short]);

  const handleStarFilter = (stars) => {
    setSelectedStars(stars);
  };
  console.log(selectedStars)

  const allReview = filteredReviews?.length || selectedStars ? filteredReviews:reviews

  
  return (
    <div className="md:py-12 pl-8 pr-[37px] py-4">
      <div className="relative flex justify-center">
        {/*  Title */}
        <h2 className="md:text-2xl text-lg absolute bg-red-100 -top-6 px-6 py-2 rounded-full font-bold uppercase">
          Testimonials
        </h2>
      </div>
      <div className="h-full bg-[#E7F4FC] rounded-md md:px-4">
        {/* Rating counts */}
        <div className="flex flex-col md:flex-row text-center md:justify-around pt-12 text-base md:text-xl py-5 ">
          <h3 className="font-bold">{reviews?.length} reviews</h3>
          <div className="flex md:gap-2 items-center justify-center">
            <h4>Average :{parseInt (averageStars)} </h4>
            <div className="flex gap-1">
            {
                            [...Array(parseInt(averageStars)).keys()].map((item,i)=>
                            <div key={i}>
                                <BsStarFill color="#1781CB" />
                            </div>
                            )
                        }
            </div>
          </div>
        </div>
        {/*  Stars */}
        <div className="grid grid-cols-5 md:gap-4 sm:gap-1">
          <div  onClick={() =>{
            setShort('')
             handleStarFilter(5)}}className="text-center border font-bold space-y-2 bg-white md:py-4 p-1 rounded-md">
            <h2  className="md:text-xl text-sm sm:text-base font-bold">5 Stars</h2>
            <div className="flex md:gap-2 items-center justify-center text-xl">
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
            </div>
            <p className="text-xs sm:text-sm">{filteredReviews?.length}</p>
          </div>
          <div onClick={() => {
            setShort('')
            handleStarFilter(4)}} className="text-center border font-bold space-y-2 bg-white md:py-4 p-1 rounded-md">
            <h2  className="md:text-xl text-sm sm:text-base font-bold">4 Stars</h2>
            <div className="flex md:gap-2 items-center justify-center text-xl">
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
           
            </div>
            <p className="sm:text-sm text-xs">{filteredReviews?.length}</p>
          </div>
          <div onClick={() => {
            setShort('')
            handleStarFilter(3)}} className="text-center border font-bold space-y-2 bg-white md:py-4 p-1 rounded-md">
            <h2  className="md:text-xl text-sm sm:text-base font-bold">3 Stars</h2>
            <div className="flex md:gap-2 items-center justify-center text-xl">
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
              
            </div>
            <p className="sm:text-sm text-xs">{filteredReviews?.length}</p>
          </div>
          <div  onClick={() => {
            setShort('')
            handleStarFilter(2)}}className="text-center border font-bold space-y-2 bg-white md:py-4 p-1 rounded-md">
            <h2  className="md:text-xl text-sm sm:text-base font-bold">2 Stars</h2>
            <div className="flex md:gap-2 items-center justify-center text-xl">
              <BsStarFill color="#1781CB" />
              <BsStarFill color="#1781CB" />
             
            </div>
            <p className="sm:text-sm text-xs">{filteredReviews?.length}</p>
          </div>
          <div onClick={() => {
            setShort('')
            handleStarFilter(1)}} className="text-center border font-bold space-y-2 bg-white md:py-4 p-1 rounded-md">
            <h2  className="md:text-xl text-sm sm:text-base font-bold">1 Stars</h2>
            <div className="flex md:gap-2 items-center justify-center text-xl">
              <BsStarFill color="#1781CB" />
             
            </div>
            <p className="sm:text-sm text-xs">{filteredReviews?.length}</p>
          </div>
        </div>
        <div>
          {/* Sort area */}
          <div className="my-6">
            <div className="flex w-full md:text-xl text-sm sm:text-base items-center border-b md:py-5 py-2 border-[#242627]">
              <p className="font-bold md:w-44 px-1 w-20">Sort By</p>
             <div className="flex items-center md:justify-between w-full px-6">
             <button onClick={() => {
              // handleStarFilter(null)
              setShort('relevant')
             }} className={`${short==='relevant' ? 'border bg-[#FFEFEF] border-[#8B8588]  rounded-md':''}  px-4 py-1`}>
                Most Relevant
              </button>
              <button onClick={() => {
                handleStarFilter(null)
                setShort('recent')
              }} className={`${short==='recent' ? 'border bg-[#FFEFEF] border-[#8B8588]  rounded-md':''}  px-4 py-1`}>Most Recent</button>
              <button onClick={()=>{
                handleStarFilter(null)
                setShort('image')
              }} className={`${short==='image' ? 'border bg-[#FFEFEF] border-[#8B8588]  rounded-md':''}  px-4 py-1`}>
                Delivery Images <span>(23)</span>
              </button>
             </div>
             
            </div>
            {/* User reviews */}
            <div>
                <Reviews filteredReviews ={allReview}></Reviews>
            </div>
          </div>
        </div>
       
      </div>
      <div className={`${router.asPath==='/'?'flex justify-start w-full':''}`}>
      <h2 className="md:text-xl text-lg text-left">If you have any questions or inquiries about our services, please feel free to contact us by filling out this form</h2>
        </div>
    </div>
  );
};

export default Testimonials;
