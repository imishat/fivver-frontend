import StockImageSites from "@/components/Home/DesignSection/StockImageSites/StockImageSites";
import { useUploadFile } from "@/components/queries/mutation/fileUpload.mutation";
import { useUpdateProject } from "@/components/queries/mutation/updateProject.mutation";
import { useGetProject } from "@/components/queries/query/project.query";
import useToast from "@/components/utility/useToast";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineAttachment } from "react-icons/md";
import { useSelector } from "react-redux";
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
    // console.log(localProject[0])
    // router.push('/message/activity')
  };
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
                      <div className="py-2">
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
