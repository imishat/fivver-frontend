import { useDeleteAction } from "@/components/queries/mutation/delete.mutation";
import useToast from "@/components/utility/useToast";
import { GET_SUBCATEGORIES } from "@/components/utils/constant";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

function SubCard({ sub }) {
    console.log(sub, "sub")

    // toast
    const { Toast, showToast } = useToast();

    const { mutate: deleteSubCat } = useDeleteAction()
    // router
    const router = useRouter();
    const queryClient = useQueryClient();
    // handle delete
    const handleDelete = id => {
        const deleteSub = {
            id: id,
            type: GET_SUBCATEGORIES
        }
        deleteSubCat(deleteSub, {
            onSuccess: (res) => {
                queryClient.invalidateQueries([GET_SUBCATEGORIES])
                showToast("Delete Sub Category", "success");
                router.push('/dashboard?n=subcategories')
            },
            onError: (err) => {
                showToast(err?.message);
            },
        })
    }
    return (
        <div className=" bg-[#F4F9FF] border border-gray-400 p-4">
            <Toast />
            <div className="sm:flex justify-between items-center ">
                <div className="sm:flex items-center gap-4">
                    <div className="flex py-3 sm:py-0 items-center gap-2">
                        <p className="font-bold">{sub?.name}
                        </p>
                    </div>
                </div>
                <div className=" sm:w-6/12">
                    <ul className="flex justify-between w-full items-center">
                        <li className="text-center">
                            <p>Price</p>
                            <span className="font-bold text-lg">{sub?.price}</span>
                        </li>
                        <li className="text-center">
                            <p>Tag line</p>
                            {/* <span className="font-bold text-lg">{moment(sub.createdAt).fromNow()}</span> */}
                            <span className="font-bold text-lg">{sub?.tagName}</span>
                        </li>
                        <li className="flex gap-2 items-center">
                            <Link className="font-bold text-lg text-[#1C8DDD]" href={`/update/subcategory/${sub.subcategoryId}`}>Edit</Link>
                            <button onClick={() => handleDelete(sub?.subcategoryId)} className="font-bold text-lg text-[#e64784]" href={'#'}>Delete</button>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default SubCard;