import StockImageSites from "@/components/Home/DesignSection/StockImageSites/StockImageSites";
import { useUploadFile } from "@/components/queries/mutation/fileUpload.mutation";
import { useSendMail } from "@/components/queries/mutation/sendMail.mutate";
import { useUpdateProject } from "@/components/queries/mutation/updateProject.mutation";
import { useGetProject } from "@/components/queries/query/project.query";
import useToast from "@/components/utility/useToast";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineAttachment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AdminRequirement from "./AdminRequirement";
const Requirement = ({ project }) => {
 console.log(project)
  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch()

  // update project
  const { mutate: updateProject, isLoading } = useUpdateProject();

  // get project for requirement
  const requirementProject = JSON.parse(
    typeof window !== "undefined" && localStorage.getItem("projectRequirement")
  );
  // get project for requirement
  const requirementProjects = JSON.parse(
    typeof window !== "undefined" && localStorage.getItem("savedProjects")
  );
 

  // get user
  const { user } = useSelector((state) => state.user);

  // toast
  const { showToast, Toast } = useToast();
  // upload images
  const { mutate: sendFileData } = useUploadFile({ watermark: false });

  // router
  const router = useRouter();

  const { projectId } = router?.query;

  // loading
  const [loading, setLoading] = useState(false);

  // get requirement file
  const [industryFile, setIndustryFile] = useState([]);

  // get project by id
  const { data: singleProject } = useGetProject({
    projectId: projectId,
    status: "",
    search: "",
  });
  const requirementData = singleProject?.data?.project?.requirement;

  const handleIndustryFile = (data) => {
    setLoading(true);
    const photoData = new FormData();
    for (const p in data) {
      photoData.append("files", data[p]);
    }
    sendFileData(photoData, {
      onSuccess: (res) => {
        const images = res?.data?.files;

        setIndustryFile(images);
        setLoading(false);
        showToast("Photo Uploaded", "success");
      },
      onError: (err) => {
        showToast(err?.response?.data?.message);
        // loading stop
        setLoading(false);
      },
    });
  };
  // logoFile
  const [logoFile, setLogoFile] = useState([]);

  const handleLogoFile = (data) => {
    setLoading(true);
    const photoData = new FormData();
    for (const p in data) {
      photoData.append("files", data[p]);
    }
    sendFileData(photoData, {
      onSuccess: (res) => {
        const images = res?.data?.files;

        setLogoFile(images);
        setLoading(false);
        showToast("Photo Uploaded", "success");
      },
      onError: (err) => {
        showToast(err?.response?.data?.message);
        // loading stop
        setLoading(false);
      },
    });
  };
  // websiteFile
  const [websiteFile, setWebsiteFile] = useState([]);

  const handleWebsiteFile = (data) => {
    setLoading(true);
    const photoData = new FormData();
    for (const p in data) {
      photoData.append("files", data[p]);
    }
    sendFileData(photoData, {
      onSuccess: (res) => {
        const images = res?.data?.files;

        setWebsiteFile(images);
        setLoading(false);
        showToast("Photo Uploaded", "success");
      },
      onError: (err) => {
        showToast(err?.response?.data?.message);
        // loading stop
        setLoading(false);
      },
    });
  };

  // ideaFile
  const [ideaFile, setIdeaFile] = useState([]);

  const handleIdeaFile = (data) => {
    setLoading(true);
    const photoData = new FormData();
    for (const p in data) {
      photoData.append("files", data[p]);
    }
    sendFileData(photoData, {
      onSuccess: (res) => {
        const images = res?.data?.files;

        setIdeaFile(images);
        setLoading(false);
        showToast("Photo Uploaded", "success");
      },
      onError: (err) => {
        showToast(err?.response?.data?.message);
        // loading stop
        setLoading(false);
      },
    });
  };

  // /sizeFile
  const [sizeFile, setSizeFile] = useState([]);

  const handleSizeFile = (data) => {
    setLoading(true);
    const photoData = new FormData();
    for (const p in data) {
      photoData.append("files", data[p]);
    }
    sendFileData(photoData, {
      onSuccess: (res) => {
        const images = res?.data?.files;

        setSizeFile(images);
        setLoading(false);
        showToast("Photo Uploaded", "success");
      },
      onError: (err) => {
        showToast(err?.response?.data?.message);
        // loading stop
        setLoading(false);
      },
    });
  };

  // informationFile
  const [informationFile, setInformationFile] = useState([]);

  const handleInformationFile = (data) => {
    setLoading(true);
    const photoData = new FormData();
    for (const p in data) {
      photoData.append("files", data[p]);
    }
    sendFileData(photoData, {
      onSuccess: (res) => {
        const images = res?.data?.files;

        setInformationFile(images);
        setLoading(false);
        showToast("Photo Uploaded", "success");
      },
      onError: (err) => {
        showToast(err?.response?.data?.message);
        // loading stop
        setLoading(false);
      },
    });
  };

 

  let now = new Date();
let minus18Hours = new Date(now);

// Subtract 18 hours in milliseconds (18 hours * 60 minutes * 60 seconds * 1000 milliseconds)
minus18Hours.setTime(minus18Hours.getTime() + (24*((project?.isExtraFastDeliveryEnabled||requirementProjects?.[0]?.isExtraFastDeliveryEnabled)?1:2) * 60 * 60 * 1000));

// Format the date as YYYY-MM-DD
let utcDate1 = minus18Hours.toISOString()

console.log(utcDate1);  // This will print the UTC date that is 18 hours before the current time.



   
  const deadline = utcDate1
 

  /// handle submit requirement
  const handleRequirement = (data) => {
if(projectId||requirementProjects[0]?.projectId){
      const requirementData = {
        id: projectId||requirementProjects[0]?.projectId,
        deadline: deadline,
        categoryId: project?.categoryId || requirementProjects[0]?.categoryId,
        subcategoryId: project?.subcategoryId || requirementProjects[0]?.subcategoryId,
        track: 2,
        status: "Progress",
        requirement: {
          ...data,
          industryFile,
          logoFile,
          websiteFile,
          ideaFile,
          sizeFile,
          informationFile,
        },
      };
      console.log(requirementData);
      updateProject(requirementData, {
        onSuccess: (res) => {
          if (res?.data) {
            showToast("Requirement Send", "success");
            router.push(`/message/project/${res?.data?.project?.projectId}`)
            console.log(res?.data, "Project Update");
            handleSendMail(data)
            // reset()
          } else {
            showToast("Requirement Send Failed");
          }
        },
        onError: (err) => {
          showToast(err?.message);
        },
      });
    
    }
    // console.log(localProject[0])
    // router.push('/message/activity')
  };
    // project number 
    function projectNumberFun(input) {
      const mapping = {
        1: 'A',
        2: 2,
        3: 'C',
        4: 4,
        5: 'E',
        6: 6,
        7: 'G',
        8: 8,
        9: 'i',
        0: 'Z',
      };
    
      const result = [];
    
      for (let i = 0; i < input?.length; i++) {
        const digit = input[i];
        if (mapping[digit] !== undefined) {
          result.push(mapping[digit]);
        }
      }
    
      return result.join('');
    }
const projectNumber =  projectNumberFun(project?.projectNumber?.toString()||requirementProjects[0]?.projectNumber?.toString())

    // handle send mail
    const {mutate:sendMail} = useSendMail({style:true})

    const handleSendMail = (data) =>{
        console.log('email send')
      if(user?.role!=='ADMIN'){
      const emailData = {
        "sendToEmail": process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      "subject": `${user?.fullName} added project requirements`,
      "message": `<html lang='en'><head><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');.font{font-family: 'Inter', sans-serif;}</style></head> <body class='font' style='display: flex; color: #000; justify-content: center;margin-top: 20px;margin-bottom: 20px; background-color: #ddedfc;'><div style='justify-content: center; width: 70%; margin: 0 auto; height: fit-content; padding: 24px 48px; background-color: white; text-align: center;'><div><div><img src='https://res.cloudinary.com/dl1cxduy0/image/upload/w_450,h_200,c_scale/v1698946120/MR_Logo_Final_4_Black_lc11jd.png' alt='' /></div><div><h2>You just received a project from ${user?.fullName} <br/>Please review the requirements below:</h2></div><div><hr style='border-bottom: 1px solid #000; width: 35%' /></div><div style='text-align: left'><p>Project: #MR${projectNumber}PN is due ${moment(deadline).format('lll')}</p></div><table border='1' style='border-collapse:collapse;width:100%'><tr><th width='230'>Item</th><th>QTY</th><th>DUR</th><th>Price</th></tr><tr><td style='padding:8px;text-align:left'>${project?.title||requirementProjects[0]?.title} <br/><small>${project?.subcategory[0]?.name||requirementProjects[0]?.subcategory[0]?.name}</small></td><td align='center'>${project?.quantity||requirementProjects[0]?.quantity}</td><td align='center'>${project?.isExtraFastDeliveryEnabled||requirementProjects[0]?.isExtraFastDeliveryEnabled?1:2} days</td><td align='center'>$${project?.subcategory[0]?.price||requirementProjects[0]?.subcategory[0]?.price*project||requirementProjects[0]?.quantity}</td></tr><tr><td style='padding:8px;text-align:left; border:none'><p style='padding:0;margin:0;display:flex;align-items:center;gap:2;'><img src='https://res.cloudinary.com/dcckbmhft/image/upload/v1699625247/6928921_ljlana.png' style='width:16px;height:16px;margin-right:5px' />Unlimited revision</p><p style='padding:0;margin:0;display:flex;align-items:center;gap:2;'><img src='https://res.cloudinary.com/dcckbmhft/image/upload/v1699625247/6928921_ljlana.png' style='width:16px;height:16px;margin-right:5px' /> PSD Source File</p><p style='padding:0;margin:0;display:flex;align-items:center;gap:2;'><img src='https://res.cloudinary.com/dcckbmhft/image/upload/v1699625247/6928921_ljlana.png' style='width:16px;height:16px;margin-right:5px' /> Print ready PDF or JPEG</p></td></tr><tr style='border:1px solid'><td style='border:0;padding:8px'>Extra-fast 1 day delivery</td><td></td><td style='border:0;padding:8px'></td><td align='center' style='border:0;padding:8px;'>$${project?.isExtraFastDeliveryEnabled||requirementProjects[0]?.isExtraFastDeliveryEnabled ? 10:0}</td></tr><tr style='border:1px solid'><th style='border:0;padding:0px;text-align:left;padding-left:6px;'>Total</td><td></td><td style='border:0;padding:0px'></th><th align='center' style='border:0;padding:8px;'>$${project?.totalCost||requirementProjects[0]?.totalCost}</th></tr></table><br/><div style='text-align:left'><p>The buyer has provided the following project requirements</p><div><ul><li>Which industry do you work in?</li><p>${data?.industry}</p><p>${industryFile?.length ? `[${industryFile?.length} file attached]`:''}</p><li>Do you have your own/company logo?</li><p>${data?.companyLogo}</p><p>${logoFile?.length ? `[${logoFile?.length} file attached]`:''}</p><li>Do you have own/company website?</li><p>${data?.website}</p><p>${websiteFile?.length?`[${websiteFile?.length} file attached]`:""}</p><li>Do you have any imaginary or specific design idea?</li><p>${data?.designIdea}</p><p>${ideaFile?.length?`[${ideaFile?.length} file attached]`:''}</p><li>Do you have your specific design size?</li><p>${data?.designSize}</p><p>${sizeFile?.length?`[${sizeFile?.length} file attached]`:''}</p><li>You have to give clear information that you need in the design. <br/>(For example, all texts, all photos, logo, contact info, etc.) you work in?</li><p>${data?.designInfo}</p><p>${informationFile?.length?`[${informationFile?.length} file attached]`:''}</p></ul></div></div><div style='margin: 0px 0 33px 0'><a href='${process.env.NEXT_PUBLIC_URL}/message/project/${projectId||requirementProjects[0]?.projectId}' target='_blank'><button style='background-color: #1a8ce2; padding: 15px 30px; border: none; color: white; margin-top:22px; font-size: 16px; border-radius: 5px; font-weight: 700;'>View and Reply</button></a></div><div><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/f_logo_g0pwgu.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981561/i_logo_gsutpp.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/t_logo_ktnb5y.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/p_logo_gyq0rn.png' alt=''/></a><a target='_blank' href='#'><img style='width: 30px; margin:4px;' src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1698981562/in_logo_pvkie5.png' alt=''/></a></div></div></div></body></html>`
      }
      sendMail(emailData,{
        onSuccess: (res) => {
          console.log(res);
          showToast(`Email Send`, "success");
          dispatch(updateState(!messageUpdate?.update))
        },
        onError: (err) => {
          showToast(err?.message);
        },
      })
    }
    }



  const handleSkip = () => {
    if (projectId || requirementProjects[0]?.projectId) {
      const requirementData = {
        id: projectId || requirementProjects[0]?.projectId,
        categoryId: project?.categoryId || requirementProjects[0]?.categoryId,
        subcategoryId: project?.subcategoryId || requirementProjects[0]?.subcategoryId,
        requirement: {},
      };

      updateProject(requirementData, {
        onSuccess: (res) => {
          if (res?.data) {
            showToast("Project Start", "success");
            console.log(res?.data, "Project Update");
            router.push(`/message/project/${projectId || requirementProjects[0]?.projectId}`)
            // reset()
          } else {
            showToast("Requirement Send Failed");
          }
        },
        onError: (err) => {
          showToast(err?.response?.data?.message);
        },
      });
    }
  };

 
  return (
    <>
      {user?.role === "ADMIN" ? (
        <AdminRequirement project={project} />
      ) : (
        <div className="md:flex gap-6 my-8 justify-between">
          <Toast />
          <div
            className={`${
              router?.pathname === "/message/project/[projectId]"
                ? ""
                : "md:w-9/12 flex justify-center"
            } `}
          >
            <div className="text-center">
              {/* Title */}
              <div className="md:w-9/12 px-2 mx-auto my-6">
                <h2 className="text-xl font-semibold">
                  Please attach to the questions below, so that we can create
                  the design with your own information
                </h2>
              </div>
              <div className="md:w-4/5 mx-auto">
                {/* body */}
                <form onSubmit={handleSubmit(handleRequirement)}>
                  <div className="w-full bg-[#1B8CDC] py-3 flex justify-center text-xl font-bold text-white">
                    Project Requirement
                  </div>
                  {/* Industry */}
                  <div className="text-left px-3 bg-[#F2F9FF] py-4">
                    <div className="text-left">
                      <div className="flex flex-col w-full">
                        <label
                          htmlFor="industry"
                          className="font-bold flex items-center gap-2 px-3 py-2"
                        >
                          <span className="text-blue-400">1.</span>Which
                          industry do you work in?
                        </label>
                        <textarea
                          defaultValue={requirementData?.industry}
                          {...register("industry", { required: true })}
                          className="textarea rounded-none textarea-bordered"
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      <label
                        className="flex cursor-pointer items-center py-2 px-3 gap-1"
                        htmlFor="fileWork"
                      >
                        <span>
                          <MdOutlineAttachment />
                        </span>
                        {industryFile?.length}
                        <p>
                          {loading ? "Uploading..." : "Attachment"}
                          {industryFile?.length > 1 ? "s" : ""}
                        </p>
                        <p>{industryFile?.length ? "Selected" : ""}</p>
                        <input
                          hidden
                          onChange={(e) => handleIndustryFile(e.target.files)}
                          type="file"
                          multiple
                          id="fileWork"
                        />
                      </label>
                    </div>
                  </div>
                  {/* Company Logo */}
                  <div className="text-left px-3 bg-[#F2F9FF] py-4">
                    <div className="text-left">
                      <div className="flex flex-col w-full">
                        <label
                          htmlFor="companyLogo"
                          className="font-bold flex items-center gap-2 px-3 py-2"
                        >
                          <span className="text-blue-400">2.</span>
                          Do you have your own/company logo?
                        </label>
                        <textarea
                          defaultValue={requirementData?.companyLogo}
                          {...register("companyLogo", { required: true })}
                          className="textarea rounded-none textarea-bordered"
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      <label
                        className="flex cursor-pointer items-center py-2 px-3 gap-1"
                        htmlFor="fileLogo"
                      >
                        <span>
                          <MdOutlineAttachment />
                        </span>
                        {logoFile?.length}
                        <p>Attachment{logoFile?.length > 1 ? "s" : ""}</p>
                        <p>{logoFile?.length ? "Selected" : ""}</p>
                        <input
                          hidden
                          onChange={(e) => handleLogoFile(e.target.files)}
                          type="file"
                          id="fileLogo"
                          multiple
                        />
                      </label>
                    </div>
                  </div>
                  {/* Company Website */}
                  <div className="text-left px-3 bg-[#F2F9FF] py-4">
                    <div className="text-left">
                      <div className="flex flex-col w-full">
                        <label
                          htmlFor="website"
                          className="font-bold flex items-center gap-2 px-3 py-2"
                        >
                          <span className="text-blue-400">3.</span>
                          Do you have own/company website?
                        </label>
                        <textarea
                          defaultValue={requirementData?.website}
                          {...register("website", { required: true })}
                          className="textarea rounded-none textarea-bordered"
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      <label
                        className="flex cursor-pointer items-center py-2 px-3 gap-1"
                        htmlFor="fileWebsite"
                      >
                        <span>
                          <MdOutlineAttachment />
                        </span>
                        {websiteFile?.length}
                        <p>Attachment{websiteFile?.length > 1 ? "s" : ""}</p>
                        <p>{websiteFile?.length ? "Selected" : ""}</p>
                        <input
                          hidden
                          onChange={(e) => handleWebsiteFile(e.target.files)}
                          type="file"
                          id="fileWebsite"
                          multiple
                        />
                      </label>
                    </div>
                  </div>
                  {/* Deisgn Idea */}
                  <div className="text-left px-3 bg-[#F2F9FF] py-4">
                    <div className="text-left">
                      <div className="flex flex-col w-full">
                        <label
                          htmlFor="designIdea"
                          className="font-bold flex items-center gap-2 px-3 py-2"
                        >
                          <span className="text-blue-400">4.</span>
                          Do you have any imaginary or specific design idea?
                        </label>
                        <textarea
                          defaultValue={requirementData?.designIdea}
                          {...register("designIdea", { required: true })}
                          className="textarea rounded-none textarea-bordered"
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      <label
                        className="flex cursor-pointer items-center py-2 px-3 gap-1"
                        htmlFor="ideaFile"
                      >
                        <span>
                          <MdOutlineAttachment />
                        </span>
                        {ideaFile?.length}
                        <p>Attachments{ideaFile?.length > 1 ? "s" : ""}</p>
                        <p>{ideaFile?.length ? "Selected" : ""}</p>
                        <input
                          hidden
                          onChange={(e) => handleIdeaFile(e.target.files)}
                          type="file"
                          id="ideaFile"
                          multiple
                        />
                      </label>
                    </div>
                  </div>
                  {/* Deisgn Size */}
                  <div className="text-left px-3 bg-[#F2F9FF] py-4">
                    <div className="text-left">
                      <div className="flex flex-col w-full">
                        <label
                          htmlFor="designSize"
                          className="font-bold flex items-center gap-2 px-3 py-2"
                        >
                          <span className="text-blue-400">5.</span>Do you have
                          your specific design size?
                        </label>
                        <textarea
                          defaultValue={requirementData?.designSize}
                          {...register("designSize", { required: true })}
                          className="textarea rounded-none textarea-bordered"
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      <label
                        className="flex cursor-pointer items-center py-2 px-3 gap-1"
                        htmlFor="sizeFile"
                      >
                        <span>
                          <MdOutlineAttachment />
                        </span>
                        {sizeFile?.length}
                        <p>Attachment{sizeFile?.length > 1 ? "s" : ""}</p>
                        <p>{sizeFile?.length ? "Selected" : ""}</p>
                        <input
                          hidden
                          onChange={(e) => handleSizeFile(e.target.files)}
                          type="file"
                          id="sizeFile"
                          multiple
                        />
                      </label>
                    </div>
                  </div>
                  {/* Deisgn Information */}
                  <div className="text-left px-3 bg-[#F2F9FF] py-4">
                    <div className="text-left">
                      <div className="flex flex-col w-full">
                        <label
                          htmlFor="designInfo"
                          className="font-bold flex items-center gap-2 px-3 py-2"
                        >
                          <span className="text-blue-400">6.</span>
                          You have to give clear information that you need in
                          the design. <br />
                          (For example, all texts, all photos, logo, contact
                          info, etc.) you work in?
                        </label>
                        <textarea
                          defaultValue={requirementData?.designInfo}
                          {...register("designInfo", { required: true })}
                          className="textarea rounded-none textarea-bordered"
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      <label
                        className="flex cursor-pointer items-center py-2 px-3 gap-1"
                        htmlFor="file"
                      >
                        <span>
                          <MdOutlineAttachment />
                        </span>
                        {informationFile?.length}
                        <p>
                          Attachment{informationFile?.length > 1 ? "s" : ""}
                        </p>
                        <p>{informationFile?.length ? "Selected" : ""}</p>
                        <input
                          hidden
                          onChange={(e) =>
                            handleInformationFile(e.target.files)
                          }
                          type="file"
                          id="file"
                          multiple
                        />
                      </label>
                    </div>
                  </div>
                  {/* btn */}
                  <div className="px-3  bg-[#F2F9FF] py-4">
                    <button className="py-2 w-full font-bold text-white text-2xl flex justify-center bg-[#1B8CDC]">
                      {isLoading ? "Loading..." : "Start Now"}
                    </button>
                    {
                    router?.query?.projectId !== projectId && requirementData?.industry?.length ? '' : (
                      <div className="text-accent">
                        <Link onClick={()=>handleSkip()} href={"#"}>Skip</Link>
                      </div>
                    )}
                  </div>
                  {/* Hint */}
                  <div className=" bg-[#F2F9FF] py-4">
                    <p>Start your project by clicking "Start Now"</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Stock */}
          {router?.pathname === "/message/project/[projectId]" ? (
            ""
          ) : (
            <div className="md:w-3/12">
              <StockImageSites />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Requirement;
