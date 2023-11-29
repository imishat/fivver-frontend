import { useDeleteCatagory } from "@/components/queries/mutation/createCategory.mutation";
import useToast from "@/components/utility/useToast";
import { GET_CATEGORIES } from "@/components/utils/constant";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";

const CategoryCard = ({ category }) => {

    const { Toast, showToast } = useToast();
const {mutate}=useDeleteCatagory()



    const queryClient = useQueryClient();


    const handleDelete = (id) => {

        mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries([GET_CATEGORIES])
                showToast('Delete Catagory Successfully', 'success');
            },
            onError: (err) => {
                showToast(err?.response?.data?.message, "Error");
            },
        })

    }
    return (
        <>
            <Toast />
            <div className=" bg-[#F4F9FF] border border-gray-400 p-4">
                <div className="sm:flex justify-between items-center ">
                    <div className="sm:flex items-center gap-4">
                        <div className="flex py-3 sm:py-0 items-center gap-2">
                            <p className="font-bold">{category?.name}
                                <br />
                                {
                                    category?.subcategories?.map(sub => <span key={sub._id} className="font-normal text-sm mr-1 bg-blue-50 text-blue-400 px-1">{sub?.name}({sub?.price})</span>)
                                }

                            </p>
                        </div>
                    </div>
                    <div className=" sm:w-6/12">
                        <ul className="flex justify-between w-full items-center">
                            <li className="text-center">
                                <p>Time</p>
                                <span className="font-bold text-lg">{moment(category.createdAt).fromNow()}</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <Link className="font-bold text-lg text-[#1C8DDD]" href={`/update/category/${category.categoryId}`}>Edit</Link>
                                <div className="font-bold text-lg text-[#e64784] cursor-pointer " onClick={() => handleDelete(category.categoryId
                                )}>Delete</div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    );
};

export default CategoryCard;