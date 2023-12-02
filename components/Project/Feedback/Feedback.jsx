import { useReviewMutation } from "@/components/queries/mutation/review.mutation";
import useToast from "@/components/utility/useToast";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { useSelector } from "react-redux";

const Feedback = ({ singleProject }) => {
  const { handleSubmit, reset, register } = useForm();

  // router
  const router = useRouter()

  // create review
  const { mutate: createReview } = useReviewMutation()

  // toast 
  const { showToast, Toast } = useToast()

  const project = singleProject?.data?.project;
  // get user
  const { user } = useSelector((state) => state.user);
  // get date distance
  function dateDiffInDays(date1, date2) {
    // Convert both dates to milliseconds
    let date1_ms = new Date(date1).getTime();
    let date2_ms = new Date(date2).getTime();

    // Calculate the difference in milliseconds
    let difference_ms = Math.abs(date1_ms - date2_ms);

    // Convert back to days and return
    return Math.round(difference_ms / (1000 * 60 * 60 * 24));
  }

  // get review
  const [star, setStar] = useState(null);
  const [review, setReview] = useState(0);

  const [isSelected, setIsSelected] = useState(false)
  console.log(isSelected)

  const projectImage = isSelected ? project?.featuredImageId || project?.imageIds?.[0] : ''

  // create review
  const handleCreateReview = (data) => {
    const reviewData = {
      userId: user?.role === 'ADMIN' ? project?.startedBy : user?.userId,
      projectUserId: project?.startedBy,
      reviewer: { name: user?.fullName, profilePicture: user?.profilePicture, userName: user?.username },
      description: data?.message,
      projectId: project?.projectId,
      stars: review,
      projectImage: projectImage,
      addToReview: data.addHome
    };
    createReview({ type: 'POST', reviewData }, {
      onSuccess: (res) => {
        console.log(res)
        if (res?.data) {
          showToast('Review Created', 'success');
          reset()
          router.push(`/project/completed/tip/${project?.projectId}`)
        } else {
          showToast('Try Again');
        }

      },
      onError: err => {
        showToast(err?.response?.data?.message)
      }
    })
  };
  return (
    <div className="mt-6 lg:mx-20 md:flex gap-12 justify-between">
      <Toast />
      <div className="md:w-7/12">
        <div className="pb-5 border-b mx-4 md:mx-0 border-black">
          <h2 className="text-3xl font-bold">Public Feedback</h2>
          <p>Please share your valuable experience with this project.</p>
        </div>
        <div className="flex w-full justify-center my-10">
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
                {...register("message", { required: true })}
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
                <input onChange={() => setIsSelected(!isSelected)}
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
              <button className="bg-[#1881cc] md:w-60 px-3 py-1 text-2xl font-bold text-white rounded">
                Send Feedback
              </button>
            </div>
            <Link href={`/project/completed/tip/${project?.projectId}`}>
              {" "}
              <p className="md:w-10 w-20 cursor-pointer">Skip</p>
            </Link>
          </div>
        </form>
      </div>
      {/* Project details */}
      <div className="h-full md:w-80">
        <div className="bg-blue-50 p-4">
          <div>
            <h2 className="text-xl font-bold py-2">Project Details</h2>
          </div>
          <div className="flex bg-white p-1 px-2">
            <img
              src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${project?.imageIds[0]}`}
              className="bg-rose-100 w-20 h-16 m-2"
              alt=""
            />
            <div>
              <p className="leading-5 py-1">{project?.title}</p>
              <Link className="text-blue-500 font-bold" href={"#"}>
                {project?.status}
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <ul>
              <li className="flex py-1 items-center justify-between w-full">
                <p>Project by</p>
                <strong>Client Name</strong>
              </li>
              <li className="flex py-1 items-center justify-between w-full">
                <p>Quantity</p>
                <strong>{project?.quantity}</strong>
              </li>
              <li className="flex py-1 items-center justify-between w-full">
                <p>Duration</p>
                <strong>
                  {dateDiffInDays(project?.createdAt, project?.deadline)} Days
                </strong>
              </li>
              <li className="flex py-1 items-center justify-between w-full">
                <p>Total Price</p>
                <strong>${project?.totalCost}</strong>
              </li>
              <li className="flex py-1 items-center justify-between w-full">
                <p>Project Number</p>
                <strong>#{project?.projectId}</strong>
              </li>
            </ul>
          </div>
        </div>
        {/* Back btn */}
        <div className="my-12 font-bold flex justify-center">
          <Link className="text-xl" href={"#"}>
            Back to the project page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
