import { useUpdateProject } from "@/components/queries/mutation/updateProject.mutation";
import useToast from "@/components/utility/useToast";
import Link from "next/link";
import { FiDownloadCloud } from "react-icons/fi";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
function AdminRequirement({project}) {
    const requirement = project?.requirement
     // handle skip requirement
  // update project

    // toast
    const { showToast, Toast } = useToast();

  const { mutate: updateProject, isLoading } = useUpdateProject();

     const nowUTC = new Date(Date.now());

     const hoursToAdd = 24 * parseInt(requirement?.days || 2);

     // Add 6 hours
     nowUTC.setUTCHours((nowUTC.getUTCHours()* hoursToAdd) + 6 );   
     const deadline = nowUTC?.toISOString();

  const handleSkip = (projectId) => {
    if (projectId) {
      const requirementData = {
        id: projectId,
        deadline: deadline,
        categoryId: project?.categoryId,
        subcategoryId: project?.subcategoryId,
        track: 2,
        status: "Progress",
        requirement: {},
      };

      updateProject(requirementData, {
        onSuccess: (res) => {
          if (res?.data) {
            showToast("Project Start", "success");
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
  };
    return (
        <div>
            {/* Which industry do you work in */}
            <Toast />
          <div className="mb-2">
                <h2 className="font-bold text-xl text-left list-inside list-item list-disc">Which industry do you work in?</h2>
                <p>{requirement?.industry}</p>
                <div>
                   { requirement?.industryFile?.length ?
                   requirement?.industryFile?.map((file,i)=>{
                        return  <Link target="_blank" href={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} key={i} className="">
                          

                           <PhotoProvider>
      <PhotoView src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`}>
      <img className="w-[300px] h-[224px] rounded" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} alt="" />
      </PhotoView>
    </PhotoProvider>
    <div className='flex items-center gap-3'>  <p className="font-bold text-lg">            {file.fileName.slice(0, 14)}
      {[".png", ".jpg", ".svg"].some(extension => file.fileName.endsWith(extension)) ? ` (${file.fileName.slice(-4)})` : ""} {i+1}</p> 
                            <button><FiDownloadCloud size={23} /></button></div>
                        </Link>
                    }):''
                      }  
                </div>
            </div>
            {/* Do you have your own/company logo? */}
          <div className="mb-2">
                <h2 className="font-bold text-xl text-left list-inside list-item list-disc">Do you have your own/company logo?</h2>
                <p>{requirement?.companyLogo}</p>
                <div>
                   {requirement?.logoFile?.length ?
                    requirement?.logoFile?.map((file,i)=>{
                      console.log(file)
                        return  <Link target="_blank" href={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} key={i} className="">
                                         

                                         <PhotoProvider>
      <PhotoView src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`}>
      <img className="w-[300px] h-[224px rounded" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} alt="" />
      </PhotoView>
    </PhotoProvider>

    <div className='flex items-center gap-3'>  <p className="font-bold text-lg">            {file.fileName.slice(0, 14)}
      {[".png", ".jpg", ".svg"].some(extension => file.fileName.endsWith(extension)) ? ` (${file.fileName.slice(-4)})` : ""} {i+1}</p> 
                            <button><FiDownloadCloud size={23} /></button></div>
                        </Link>
                    }):''
                      }  
                </div>
            </div>
            {/* Do you have own/company website? */}
          <div>
                <h2 className="font-bold text-xl text-left list-inside list-item list-disc">Do you have own/company website?</h2>
                <p>{requirement?.website}</p>
                <div>
                   {requirement?.websiteFile?.length ?
                   requirement?.websiteFile?.map((file,i)=>{
                        return  <Link target="_blank" href={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} key={i} className="">
                           <img className="w-[300px] h-[224px rounded" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} alt="" />
                           <div className='flex items-center gap-3'>   <p className="font-bold text-lg">            {file.fileName.slice(0, 14)}
      {[".png", ".jpg", ".svg"].some(extension => file.fileName.endsWith(extension)) ? ` (${file.fileName.slice(-4)})` : ""} {i+1}</p> 
                            <button><FiDownloadCloud size={23} /></button></div>
                        </Link>
                    }):''
                      }  
                </div>
            </div>
            {/* Do you have any imaginary or specific design idea */}
          <div>
                <h2 className="font-bold text-xl text-left list-inside list-item list-disc">Do you have any imaginary or specific design idea?</h2>
                <p>{requirement?.designIdea}</p>
                <div>
                   {requirement?.ideaFile?.length ?
                   requirement?.ideaFile?.map((file,i)=>{
                        return  <Link target="_blank" href={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} key={i} className="">
                           <img className="w-[300px] h-[224px rounded" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} alt="" />
                           <div className='flex items-center gap-3'>  <p className="font-bold text-lg">            {file.fileName.slice(0, 14)}
      {[".png", ".jpg", ".svg"].some(extension => file.fileName.endsWith(extension)) ? ` (${file.fileName.slice(-4)})` : ""} {i+1}</p>  
                            <button><FiDownloadCloud size={23} /></button></div>
                        </Link>
                    }):''
                      }  
                </div>
            </div>
            {/* Do you have your specific design size */}
          <div>
                <h2 className="font-bold text-xl text-left list-inside list-item list-disc">Do you have your specific design size?</h2>
                <p>{requirement?.designSize}</p>
                <div>
                   {requirement?.sizeFile?.length ?
                    requirement?.sizeFile?.map((file,i)=>{
                        return  <a href={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} key={i} target="_blank" className="">
                          <img className="w-[300px] h-[224px rounded" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} alt="" />
                          <div className='flex items-center gap-3'> <p className="font-bold text-lg">            {file.fileName.slice(0, 14)}
      {[".png", ".jpg", ".svg"].some(extension => file.fileName.endsWith(extension)) ? ` (${file.fileName.slice(-4)})` : ""} {i+1}</p> 
                            <button><FiDownloadCloud size={23} /></button></div>
                        </a>
                    }):''
                      }  
                </div>
            </div>
            {/* You have to give clear information that you need in the design */}
          <div>
                <h2 className="font-bold text-xl text-left list-inside list-item list-disc">You have to give clear information that you need in the design?</h2>
                <p>{requirement?.designInfo}</p>
                <div>
                   {requirement?.informationFile?.length ?
                    requirement?.informationFile?.map((file,i)=>{
                        return  <Link target="_blank" href={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} key={i} className="">
                           <img className="w-[300px] h-[224px rounded" src={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} alt="" />
                           <div className='flex items-center gap-3'>     <p className="font-bold text-lg">            {file.fileName.slice(0, 14)}
      {[".png", ".jpg", ".svg"].some(extension => file.fileName.endsWith(extension)) ? ` (${file.fileName.slice(-4)})` : ""} {i+1}</p> 
                            <button><FiDownloadCloud size={23} /></button></div>
                        </Link>
                    }):''
                      }  
                </div>
            </div>
            {/* Skip */}
{ !requirement?.companyLogo?.length ?
     <div className="flex ">
     <div className="py-2 ">
             <button onClick={()=>handleSkip(project?.projectId)} className="btn btn-sm px-4 py-1 rounded-full bg-blue-600">
               Skip
             </button>
           </div>
</div>:''
}
           
        </div>
    );
}

export default AdminRequirement;