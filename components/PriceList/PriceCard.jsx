import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi2';
import { useAllDesigns } from '../queries/query/designs.query';
const PriceCard = ({category}) => {
    // router 
    const router = useRouter()
    // get design id
    const [desingId,setDesingId] = useState('')
    // get all designs by categories
    const {data:designData} = useAllDesigns({designId:desingId,page:1,limit:1000})

    const handleStartProject = id =>{
     
        setDesingId(id)
        // console.log(designData)
        const categoryData = designData?.data?.designs?.filter(design=>design.categoryId===id)
        // set data in selected data
        localStorage.setItem('designs',JSON.stringify(categoryData))
        router.push('/project')
    }
    return (
        <div className="h-full sm:h-62 rounded-xl overflow-hidden border border-[#D4C9C9] relative">
            {/* Title */}
            <div className=" w-full bg-[#FFEFEF] flex justify-center items-center h-12 ">
                <h3 className="text-2xl font-bold">{category.name}</h3>
            </div>
            {/* Prices */}
            <div className="flex flex-col sm:flex-row justify-around w-full items-center py-5">
                <div className='flex sm:justify-around justify-between sm:w-2/3 px-3'>
               {
                category?.subcategories.map((sub,i)=>{
                    return (
                    <div key={i}>
                    <p className="sm:text-xl">{sub.name}</p>
                    <h3 className="text-center text-[#1B8CDC] sm:text-xl font-bold">${sub.price}USD</h3>
                    <h3 className='text-center'> { sub?.regulardays} Days Delivery</h3>
                    <h3>  Extra- Fast {sub?.fastDay} Day Delivery ${sub?.FD_Amount}</h3>
                </div>)
                })
               }
                </div>
                <div className="sm:w-40 sm:h-16 flex justify-center items-center">
                    <button onClick={()=>handleStartProject(category.categoryId)} className="w-full py-3 sm:py-0 px-2 h-full sm:text-lg font-semibold text-center uppercase text-white rounded-xl leading-5 bg-[#2791DD]">Project <br className='hidden sm:block' /> Start Here</button>
                </div>
            </div>
            <div>
                <ul className="sm:flex justify-around">
                    <li className="flex items-center gap-1"><span className='text-[#1B8CDC]'><HiCheckCircle /></span>Unlimited Revisions</li>
                    <li className="flex items-center gap-1"><span className='text-[#1B8CDC]'><HiCheckCircle /></span>PSD Source File</li>
                    <li className="flex items-center gap-1"><span className='text-[#1B8CDC]'><HiCheckCircle /></span>Print Ready PDF or JPEG File</li>
                </ul>
            </div>
        </div>
    );
};

export default PriceCard;