


import useToast from "@/components/utility/useToast";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { useUpdatePassword } from '@/components/queries/mutation/chengePass.mutation';
import { useUploadFile } from '@/components/queries/mutation/fileUpload.mutation';
import { useUpdateUser } from '@/components/queries/mutation/updateUser.mutation';











function BillingInformation() {
   // get user
   const { user } = useSelector((state) => state.user);
   console.log(user)
   //  react hook form
   const {
     register,
     handleSubmit,
     watch,
     formState: { errors },
   } = useForm();
 
   // toast
   const { Toast, showToast } = useToast();
   const router = useRouter()
   //  react hook form 2
   const {
     register: register2,
     handleSubmit: handleSubmit2,
     formState: { errors: error2 },
   } = useForm();
   // update user
   const { mutate: updateUser } = useUpdateUser();
   // image upload call
   const { mutate: sendFileData } = useUploadFile({watermark:false});
 
   // update password
   const {mutate: chengePassword} = useUpdatePassword()
 
   // handle update user
   const handleUserProfile = (data) => {
     // upload image
     const photo = data.image;
     const photoData = new FormData();
 
     photoData.append("files", photo[0]);
 
     // send desing data for create
     if (photo?.length) {
       sendFileData(photoData, {
         onSuccess: (res) => {
           const images = res?.data?.files;
           showToast("Photo Uploaded", "success");
           // user data
           const userData = {
             fullName: data.name,
             profilePicture: images[0].fileId,
             phoneNumber: data.number,
             country: data.country,
             LOcation:data.location
           };
           console.log(userData);
           if (userData) {
             updateUser(userData, {
               onSuccess: (res) => {
                 console.log(res);
                 showToast("Update Profile", "success");
                 router.reload();
 
 
               },
               onError: (err) => {
                 showToast(err?.message);
               },
             });
           }
         },
         onError: (err) => {
           showToast(err?.message);
         },
       });
     } else {
       // if image not select
       const userData = {
         fullName: data.name,
         profilePicture: user.profilePicture,
         phoneNumber: data.number,
         country: data.country,
       };
       console.log(userData);
       if (userData) {
         updateUser(userData, {
           onSuccess: (res) => {
             console.log(res);
             showToast("Update Profile", "success");
             router.reload();
           },
           onError: (err) => {
             showToast(err?.message);
           },
         });
       }
     }
   };
   // handle password
   const handlePassword = (data) => {
     const passwordData = {
       currentPassword: data.oldPassword,
       newPassword: data.newPassword,
       newConfirmPassword: data.confirmPassword,
     };
     chengePassword(passwordData,{
       onSuccess:(res)=>{
         console.log(res)
         showToast("Password Updated", "success");
         router.reload();
       },
       onError:(err)=>{
         showToast(err?.message)
       }
     })
   };
 
    return (
      
     
      <div>
      <Toast />
   
   
          <h3 className="font-bold text-lg">Edit Profile!</h3>
          <form onSubmit={handleSubmit2(handleUserProfile)}>
            <div className="flex w-full ">
              <div className="flex items-center mx-2 w-44">
                <label htmlFor="profile">
                  <p className="text-sm"> Profile Photo</p>
                  <Image
                    className="w-24 h-24 border p-1 rounded-full"
                    width={130}
                    height={130}
                    alt={user?.username}
                    src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${user?.profilePicture}`}
                  />
                  <div>
                    <label
                      className="px-4 inline-block py-1 my-2 rounded-md border border-gray-400"
                      htmlFor="upload"
                    >
                      Upload
                      <input
                        {...register2("image", { required: false })}
                        hidden
                        type="file"
                        id="upload"
                      />
                    </label>
                  </div>
                </label>
              </div>

              <div>
                <label htmlFor="fullName">
                  Name
                  <input
                    {...register2("name", { required: true })}
                    defaultValue={user?.fullName}
                    type="text"
                    placeholder="Name"
                    className="input w-full input-bordered"
                    id="fullName"
                  />
                </label>
                <label htmlFor="email
">
                  Email

                  <input
                    {...register2("email", { required: true })}
                    defaultValue={user?.email}
                    type="text"
                    placeholder="Email"
                    className="input w-full input-bordered"
                    id="email"
                  />
                </label>
                <label htmlFor="number">
                  Number
                  <input
                    {...register2("number", { required: true })}
                    defaultValue={user?.phoneNumber}
                    type="text"
                    placeholder="Phone Number"
                    className="input w-full input-bordered"
                    id="number"
                  />
                </label>
                <label htmlFor="country">
                  Country
                  <input
                    {...register2("country", { required: true })}
                    defaultValue={user?.country}
                    type="text"
                    placeholder="country"
                    className="input w-full input-bordered"
                    id="country"
                  />
                </label>
                <label htmlFor="location">
                Location
                  <input
                    {...register2("location", { required: true })}
                    defaultValue={user?.Location}
                    type="text"
                    placeholder="Location"
                    className="input w-full input-bordered"
                    id="location"
                  />
                </label>
                <label htmlFor="Facbook">
                Facbook
                  <input
                    {...register2("  Facbook", { required: true })}
                    defaultValue={user?.Facbook}
                    type="text"
                    placeholder=" Facbook"
                    className="input w-full input-bordered"
                    id="  Facbook"
                  />
                </label>
                <label htmlFor="Twitter">
                Twitter
                  <input
                    {...register2("Twitter", { required: true })}
                    defaultValue={user?.Twitter}
                    type="text"
                    placeholder="Twitter"
                    className="input w-full input-bordered"
                    id="Twitter"
                  />
                </label>
                <label htmlFor="
Instagram">
                
Instagram
                  <input
                    {...register2("location", { required: true })}
                    defaultValue={user?.
                      Instagram}
                    type="text"
                    placeholder="
                    Instagram"
                    className="input w-full input-bordered"
                    id="
                    Instagram"
                  />
                </label>
               



                <label htmlFor="LinkedIn">
                LinkedIn
                  <input
                    {...register2("LinkedIn", { required: true })}
                    defaultValue={user?.LinkedIn}
                    type="text"
                    placeholder="LinkedIn"
                    className="input w-full input-bordered"
                    id="LinkedIn"
                  />
                </label>
                <label htmlFor="Pinterest">
                Pinterest
                  <input
                    {...register2(" Pinterest", { required: true })}
                    defaultValue={user?.LinkedIn}
                    type="text"
                    placeholder=" Pinterest"
                    className="input w-full input-bordered"
                    id=" Pinterest"
                  />
                </label>
                <label htmlFor="Google">
                Google
                  <input
                    {...register2(" Google", { required: true })}
                    defaultValue={user?.LinkedIn}
                    type="text"
                    placeholder=" Google"
                    className="input w-full input-bordered"
                    id=" Google"
                  />
                </label>
                <label htmlFor="Youtube">
                Youtube
                  <input
                    {...register2(" Youtube", { required: true })}
                    defaultValue={user?.LinkedIn}
                    type="text"
                    placeholder=" Youtube"
                    className="input w-full input-bordered"
                    id=" Youtube"
                  />
                </label>
                <label htmlFor="Yelp">
                Yelp
                  <input
                    {...register2(" Yelp", { required: true })}
                    defaultValue={user?.LinkedIn}
                    type="text"
                    placeholder=" Yelp"
                    className="input w-full input-bordered"
                    id=" Yelp"
                  />
                </label>
                <label htmlFor="Tiktok">
                Tiktok
                  <input
                    {...register2(" Tiktok", { required: true })}
                    defaultValue={user?.LinkedIn}
                    type="text"
                    placeholder=" Tiktok"
                    className="input w-full input-bordered"
                    id=" Tiktok"
                  />
                </label>
                <label htmlFor="Nextdoor">
                Nextdoor
                  <input
                    {...register2(" Nextdoor", { required: true })}
                    defaultValue={user?.LinkedIn}
                    type="text"
                    placeholder=" Nextdoor"
                    className="input w-full input-bordered"
                    id=" Nextdoor"
                  />
                </label>
              </div>
            </div>
            


            <button className="btn btn-block bg-blue-400 text-white flex items-center mx-2 w-44">
              Update
            </button>
          </form>
          {/* Password */}
          <form onSubmit={handleSubmit(handlePassword)}>
            <p className="font-bold my-4">Chenge Password</p>
            <label htmlFor="password">
              Old Password
              <input
                {...register("oldPassword", { required: true })}
                defaultValue={user?.password}
                type="text"
                placeholder="password"
                className="input w-full input-bordered"
                id="password"
              />
            </label>
            <label htmlFor="newPassword">
              New Password
              <input
                {...register("newPassword", { required: true })}
                defaultValue={user?.password}
                type="text"
                placeholder="New Password"
                className="input w-full input-bordered"
                id="newPassword"
              />
            </label>
            <label htmlFor="confirmPassword">
              Confirm Password
              <input
                {...register("confirmPassword", { required: true })}
                defaultValue={user?.password}
                type="text"
                placeholder="Confirm Password"
                className="input w-full input-bordered"
                id="confirmPassword"
              />
            </label>
            {/* chenge passowrd btn */}
            <button className="btn btn-block bg-blue-400 text-white my-3 flex items-center mx-2 w-44">
              Chenge Password
            </button>
          </form>

          
     
    </div>
   
        
    );
}

export default BillingInformation;