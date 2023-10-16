import useToast from "@/components/utility/useToast";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUpdatePassword } from "../queries/mutation/chengePass.mutation";
import { useUploadFile } from "../queries/mutation/fileUpload.mutation";
import { useUpdateUser } from "../queries/mutation/updateUser.mutation";
import { useGetUserData } from "../queries/query/getUserProfile.query";

const EditModal = ({userId}) => {
  // get user
  const { user } = useSelector((state) => state.user);
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

    // get user by id
    const { data: userData } = useGetUserData({
      userId: userId,
      token: "",
      update: "",
    });

    const userInfo = userData?.data?.user

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
      <dialog id="editModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Profile!</h3>
          <form onSubmit={handleSubmit2(handleUserProfile)}>
            <div className="flex w-full">
              <div className="flex items-center mx-2 w-44">
                <label htmlFor="profile">
                  <p className="text-sm"> Profile Photo</p>
                  <Image
                    className="w-24 h-24 border p-1 rounded-full"
                    width={130}
                    height={130}
                    alt={userInfo?.username}
                    src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${userInfo?.profilePicture}`}
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
                    defaultValue={userInfo?.fullName}
                    type="text"
                    placeholder="Name"
                    className="input w-full input-bordered"
                    id="fullName"
                  />
                </label>
                <label htmlFor="number">
                  Number
                  <input
                    {...register2("number", { required: true })}
                    defaultValue={userInfo?.phoneNumber}
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
                    defaultValue={userInfo?.country}
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
                    defaultValue={userInfo?.Location}
                    type="text"
                    placeholder="Location"
                    className="input w-full input-bordered"
                    id="location"
                  />
                </label>
              </div>
            </div>
            <button className="btn btn-block bg-blue-400 text-white">
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
                defaultValue={userInfo?.password}
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
                defaultValue={userInfo?.password}
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
                defaultValue={userInfo?.password}
                type="text"
                placeholder="Confirm Password"
                className="input w-full input-bordered"
                id="confirmPassword"
              />
            </label>
            {/* chenge passowrd btn */}
            <button className="btn btn-block bg-blue-400 text-white my-3">
              Chenge Password
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditModal;
