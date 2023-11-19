import { useReviewMutation } from "@/components/queries/mutation/review.mutation";
import { useGetReviews } from "@/components/queries/query/getReviews.qurey";
import { updateState } from "@/components/redux/features/update/updateSlice";
import useToast from "@/components/utility/useToast";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsStarFill } from "react-icons/bs";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import Tip from "../Tip/Tip";

function ProjectFeedback({project}) {
    const { handleSubmit,reset, register } = useForm();
    const messageUpdate = useSelector((state) => state.update);
    // router
    const router = useRouter()
    
    const dispatch = useDispatch()
    // create review
    const {mutate:createReview} = useReviewMutation()
  
    // toast 
    const {showToast,Toast} = useToast()

    // get project review
    const {data:projectReviewData} = useGetReviews({userId:project?.startedBy,projectId:project?.projectId,update:messageUpdate})
    // reviews
  const projectReview = projectReviewData?.data?.reviews
  
    
  // get user
    const { user } = useSelector((state) => state.user);

  // get review
  const [star, setStar] = useState(null);
  const [review, setReview] = useState(0);

  const [isSelected,setIsSelected] = useState(false)
  // console.log(isSelected)

  const projectImage =  project?.featuredImageId||project?.imageIds?.[0]

  // create review
  const handleCreateReview = (data) => {
      const reviewData = {
      userId: user?.role === 'ADMIN' ? project?.startedBy :user?.userId,
      reviewer:{name:user?.fullName,profilePicture:user?.profilePicture,userName:user?.username},
      projectId:project?.projectId,
      description: data?.message,
      stars: review,
      projectImage:projectImage,
      addToReview:isSelected
    };
    console.log(reviewData)
    createReview({type:'POST',reviewData},{
      onSuccess: (res) => {
        console.log(res)
        if(res?.data){
          showToast('Review Created','success');
          dispatch(updateState(!messageUpdate?.update))
          reset()
          // router.push(`/project/completed/tip/${project?.projectId}`)
        }else{
          showToast('Try Again');
        }
    },
    onError: err => {
      showToast(err?.response?.data?.message)
    }
  })
  };


  const filteredData = projectReview?.length && projectReview?.filter(item => item?.reviewer?.userName?.includes(user?.username));

  console.log(filteredData,'filteredData')
    return (
        <div>
          <Toast />
          {
            projectReview?.length  ? 
            <div>
              {
                projectReview?.map((review,i)=>{
                  return <div className="border border-gray-500 mb-8">
                    <div className="bg-blue-50 text-2xl text-black px-4 py-2">
                      <h2>{review?.reviewer?.name}'s Review</h2>
                    </div>
                    <div className="px-2 sm:px-3 py-5">
            <div className="flex items-center gap-2">
                <img className="w-8 h-8 rounded-full" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${review?.reviewer?.profilePicture}`} alt="" />
                <h3 className="text-lg font-bold">{review?.reviewer?.name}</h3>
            </div>
            {/* review body */}
            <div className="py-2">
                {review.description}
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
                    <p>{moment(review?.createdAt).fromNow()}</p>
                </div>
            </div>
        </div>
                  </div>
                })
              }
            </div>
            :''}
            
           {
             !filteredData?.length ?
            <div className="">
            <div className="flex w-full justify-center ">
              <button
                className={`${review > 0 ? "" : ""}`}
                onMouseLeave={() => setStar("")}
                onClick={() => setReview(1)}
                onMouseEnter={() => setStar(1)}
              >
                {star > 0 || review >= 1 ? (
                  <PiStarFill className="hover:fill-blue-300 fill-blue-400" size={44} />
                ) : (
                  <PiStarLight size={44} />
                )}
              </button>
    
              <button
                className={`${review > 1 ? "" : ""}`}
                onMouseLeave={() => setStar("")}
                onClick={() => setReview(2)}
                onMouseEnter={() => setStar(2)}
              >
                {star > 1 || review >= 2 ? (
                  <PiStarFill className="hover:fill-blue-300 fill-blue-400" size={44} />
                ) : (
                  <PiStarLight size={44} />
                )}
              </button>
    
              <button
                className={`${review > 2 ? "" : ""}`}
                onMouseLeave={() => setStar("")}
                onClick={() => setReview(3)}
                onMouseEnter={() => setStar(3)}
              >
                {star > 2 || review >= 3 ? (
                  <PiStarFill className="hover:fill-blue-300 fill-blue-400" size={44} />
                ) : (
                  <PiStarLight size={44} />
                )}
              </button>
    
              <button
                className={`${review > 3 ? "" : ""}`}
                onMouseLeave={() => setStar("")}
                onClick={() => setReview(4)}
                onMouseEnter={() => setStar(4)}
              >
                {star > 3 || review >= 4 ? (
                  <PiStarFill className="hover:fill-blue-300 fill-blue-400" size={44} />
                ) : (
                  <PiStarLight size={44} />
                )}
              </button>
    
              <button
                className={`${review > 4 ? "" : ""}`}
                onMouseLeave={() => setStar("")}
                onClick={() => setReview(5)}
                onMouseEnter={() => setStar(5)}
              >
                {star > 4 || review >= 5 ? (
                  <PiStarFill className="hover:fill-blue-300 fill-blue-400" size={44} />
                ) : (
                  <PiStarLight size={44} />
                )}
              </button>
            </div>
            <form onSubmit={handleSubmit(handleCreateReview)}>
              <div className="md:flex mx-4 md:mx-0 items-center gap-2">
                <div className="w-full">
                  <textarea
                    {...register("message",{required:true})}
                    placeholder="Type your experience"
                    className="w-full p-3 h-36 border-gray-500 border"
                  ></textarea>
                </div>
                <div className="md:w-56">
                  <p className="text-base text-center">Add you review</p>
                  <label
                    htmlFor="item"
                    className="w-full h-32 inline-block relative bg-rose-100 mb-2"
                  >
                    <input onChange={()=>setIsSelected(!isSelected)}
                      className="absolute checkbox rounded-none bg-white checkbox-info checkbox-sm right-1 bottom-1"
                      type="checkbox"
                      id="item"
                    />
                     <img
                  src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${project?.imageIds[0]}`}
                  className="bg-rose-100 w-full h-full"
                  alt=""
                />
                  </label>
                </div>
              </div>
              <div className="flex mb-12 items-center mt-6">
                <div className="w-full flex items-center justify-center">
                  <button className="bg-blue-500 md:w-60 px-3 py-1 text-2xl font-bold text-white rounded">
                    Send Feedback
                  </button>
                </div>
                <Link href={`/project/completed/tip/${project?.projectId}`}>
                  <p className="md:w-10 w-20 cursor-pointer">Skip</p>
                </Link>
              </div>
            </form>
          </div>  
          :
          <div>
            {
              user?.role==='ADMIN' ? '':
              <div>
                <Tip />
              </div>
            }
          </div>
           }     
            
        </div>
    );
}

export default ProjectFeedback;