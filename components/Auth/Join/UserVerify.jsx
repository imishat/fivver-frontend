import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
const UserVerify = () => {
    const { user } = useSelector((state) => state.user);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const router = useRouter()
      // handle forgot password
      const handleSendOtp = data =>{
        console.log(data)
        router.push('/auth/user-verify')
      }
    
    return (
        <div className="flex justify-center">
            <div className="my-12">
           
            <form onSubmit={handleSubmit(handleSendOtp)} className=" items-center w-96">
                    <input  placeholder="Enter email..." {...register("email", { required: true })}defaultValue={user?.email} className="px-4 py-2 border border-gray-400 mb-2 w-full" type="email" />
                  
                    <button  className="px-4 py-2 border w-full text-[#1B8CDC]">Verify</button>
                </form>
            </div>
        </div>
    );
};

export default UserVerify;