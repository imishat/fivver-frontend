import { useForm } from "react-hook-form";

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      // handle forgot password
      const handleForgotPassword = data =>{
        console.log(data)
      }
    
    return (
        <div className="flex justify-center">
            <div className="my-12">
           
                <form onSubmit={handleSubmit(handleForgotPassword)} className="items-center w-96">
                    <input  placeholder="Enter email..." {...register("email", { required: true })} className="px-4 py-2 border border-gray-400 mb-2 w-full" type="email" />
                    <input placeholder="Enter otp..." {...register("number", { required: true })} className="px-4 py-2 border border-gray-400 mb-2 w-full" type="email" />
                    <button className="px-4 py-2 border w-full text-[#1B8CDC]">Send Code</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;