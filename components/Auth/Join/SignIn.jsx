import { useUserSingUp } from '@/components/queries/mutation/user.mutation';
import { Spin } from '@/components/utility/LoadingSpinner';
import useToast from '@/components/utility/useToast';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const SignIn = ({setToggle}) => {
     // react hook form
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm();



  // router 
  const router = useRouter()
  // toast
const { Toast, showToast } = useToast();
  // token
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
// get user 
const {user} = useSelector(state => state.user)

// redirect 
if(user?.email && token){
  router.push('/')
}

// import send singup data function

const{mutate:SingData,isLoading}=useUserSingUp()

  //   handle SingIn
  const handleSingIn = (data) => {
    //send singdata
    SingData(data,{
      onSuccess: (res) => {
        console.log(res)
        if(res?.data){
          showToast('Sign In Successfully','success');
          localStorage.setItem('accessToken',res?.data?.accessToken)
          
          reset()
          router.push('/')
        }else{
          showToast('Sign In Faild');
        }
      
    },
    onError: err => {
      showToast(err?.response?.data?.message)
    }
  })
  };
    return (
        <div>
          <Toast/>
             <form onSubmit={handleSubmit(handleSingIn)} className="flex flex-col space-y-3 px-4 pt-14 pb-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="px-2">
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  className="px-4 py-2 bg-white border border-gray-300 text-black w-full"
                  type="email"
                  id="email"
                />
                {errors.email && <span className='text-error'>This field is required</span>}
              </div>
              {/* Password */}
              <div>
                <label htmlFor="password" className="px-2">
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  className="px-4 py-2 bg-white border border-gray-300 text-black w-full"
                  type="password"
                  id="password"
                />
                {errors.password && <span className='text-error'>This field is required</span>}
              </div>
              {/* Remember me and forgot password */}
              <div className="flex justify-between px-3">
                {/* Remember me */}
                <div className="flex items-center gap-2">
                  <input  {...register("remember", { required: false })} type="checkbox" id="rememberme" />
                  <label className="select-none" htmlFor="rememberme">
                    Remember me
                  </label>
                </div>
                {/* forgot password */}
                <div>
                  <Link href={`/auth/forgot-password`} className="text-blue-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              {/* Sign in btn */}
              <div>
                
                <button disabled={isLoading} type="submit" className="w-full px-4 py-2 font-bold bg-[#1B8CDC] text-white text-xl ">
                    {isLoading? <Spin/> :"Sign In"}
                    </button>
              </div>
              {/* Don't have account */}
              <div className="flex justify-center py-4">
                <p>
                  Don't have Account?
                  <span
                    className="text-[#1B8CDC] font-bold cursor-pointer"
                    onClick={() => setToggle("signup")}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </form>
        </div>
    );
};

export default SignIn;