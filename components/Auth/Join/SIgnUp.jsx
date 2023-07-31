import { useForm } from "react-hook-form";

const SIgnUp = ({ setToggle }) => {
  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //   handle signup
  const handleSignUp = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="flex flex-col space-y-3 px-4 pt-14 pb-4"
      >
        {/* Country */}
        <div>
          <label htmlFor="country" className="px-2">
            Country
          </label>
          <input
            {...register("country", { required: true })}
            className="px-4 py-2 bg-white border border-gray-300 text-black w-full"
            type="text"
            id="country"
          />
          {/* Handle input error */}
          {errors.country && (
            <span className="text-error">This field is required</span>
          )}
        </div>
        {/* fullName */}
        <div>
          <label htmlFor="fullName" className="px-2">
            Full Name
          </label>
          <input
            {...register("fullName", { required: true })}
            className="px-4 py-2 bg-white border border-gray-300 text-black w-full"
            type="text"
            id="fullName"
          />
          {/* Handle input error */}
          {errors.fullName && (
            <span className="text-error">This field is required</span>
          )}
        </div>
        {/* Username */}
        <div>
          <label htmlFor="username" className="px-2">
            Username
          </label>
          <input
            {...register("username", { required: true })}
            className="px-4 py-2 bg-white border border-gray-300 text-black w-full"
            type="text"
            id="username"
          />
          {/* Handle input error */}
          {errors.username && (
            <span className="text-error">This field is required</span>
          )}
        </div>
        {/* Phone number */}
        <div>
          <label htmlFor="phoneNumber" className="px-2">
            Phone Number
          </label>
          <input
            {...register("phoneNumber", { required: true })}
            className="px-4 py-2 bg-white border border-gray-300 text-black w-full"
            type="text"
            id="phoneNumber"
          />
          {/* Handle input error */}
          {errors.phoneNumber && (
            <span className="text-error">This field is required</span>
          )}
        </div>
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
          {/* Handle input error */}
          {errors.email && (
            <span className="text-error">This field is required</span>
          )}
        </div>
        {/* Set password */}
        <div>
          <label htmlFor="password" className="px-2">
            Set Password
          </label>
          <input
            {...register("password", { required: true })}
            className="px-4 py-2 bg-white border border-gray-300 text-black w-full"
            type="password"
            id="password"
          />
          {/* Handle input error */}
          {errors.password && (
            <span className="text-error">This field is required</span>
          )}
        </div>
        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="px-2">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword", { required: true })}
            className="px-4 py-2 bg-white border border-gray-300 text-black w-full"
            type="password"
            id="confirmPassword"
          />
          {/* Handle input error */}
          {errors.confirmPassword && (
            <span className="text-error">This field is required</span>
          )}
        </div>
        {/* Sign up btn */}
        <div>
          <button className="w-full px-4 py-2 font-bold bg-[#1B8CDC] text-white text-xl ">
            Sign Up
          </button>
        </div>
        {/* already have account */}
        <div className="flex justify-center py-4">
          <p>
            Already have an Account?{" "}
            <span
              className="text-[#1B8CDC] font-bold cursor-pointer"
              onClick={() => setToggle("signin")}
            >
              Sign In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SIgnUp;