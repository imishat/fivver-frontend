import Image from "next/image";
import success from "/public/images/Vector.png";
import Link from "next/link";
import { useSelector } from "react-redux";






const Successfully=()=>{
    const { user } = useSelector((state) => state.user);



    return(

        <div className="authCard">
        <Image
          src={success}
          alt="success"
          width={190}
          height={190}
          className="my-12 mx-auto max-w-[100px] md:max-w-[150px] xl:max-w-full mb-3"
        />
        <h3 className="text-[#F47458] text-center  text-base sm:text-lg md:text-xl lg:text-2xl font-semibold ">
        User account is verified
        </h3>
    <Link href={`/user/account${user?.userId
}`}>
    <button   type="submit" className="px-4 py-2  w-full text-[#1B8CDC]">Profile</button>
    </Link>
      </div>



    )
}
export default Successfully;