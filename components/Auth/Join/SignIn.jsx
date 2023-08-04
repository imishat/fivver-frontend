import Link from 'next/link';
import { useForm } from 'react-hook-form';

const SignIn = ({setToggle}) => {
     // react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //   handle SingIn
  const handleSingIn = (data) => {
    console.log(data);
  };
    return (
        <div>
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
                <button className="w-full px-4 py-2 font-bold bg-[#1B8CDC] text-white text-xl ">
                  Sign In
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