import Link from "next/link";
import { FiDownloadCloud } from "react-icons/fi";

function AdminRequirement({project}) {
    const requirement = project?.requirement
    console.log(requirement)
    return (
        <div>
            {/* Which industry do you work in */}
          <div>
                <h2 className="font-bold text-xl text-left list-inside list-item list-disc">Which industry do you work in?</h2>
                <p>{requirement?.industry}</p>
                <div>
                   {
                   requirement?.industryFile.map((file,i)=>{
                        return  <Link target="_blank" href={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} key={i} className="flex items-center gap-3">
                            <p className="font-bold text-lg">Attachments {i+1}</p> 
                            <button><FiDownloadCloud size={23} /></button>
                        </Link>
                    })
                      }  
                </div>
            </div>
            {/* Do you have your own/company logo? */}
          <div>
                <h2 className="font-bold text-xl text-left list-inside list-item list-disc">Do you have your own/company logo?</h2>
                <p>{requirement?.companyLogo}</p>
                <div>
                   {
                    requirement?.logoFile.map((file,i)=>{
                        return  <Link href={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} key={i} className="flex items-center gap-3">
                            <p className="font-bold text-lg">Attachments {i+1}</p> 
                            <button><FiDownloadCloud size={23} /></button>
                        </Link>
                    })
                      }  
                </div>
            </div>
            {/* Do you have own/company website? */}
          <div>
                <h2 className="font-bold text-xl text-left list-inside list-item list-disc">Do you have own/company website?</h2>
                <p>{requirement?.website}</p>
                <div>
                   {
                   requirement?.websiteFile.map((file,i)=>{
                        return  <Link href={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} key={i} className="flex items-center gap-3">
                            <p className="font-bold text-lg">Attachments {i+1}</p> 
                            <button><FiDownloadCloud size={23} /></button>
                        </Link>
                    })
                      }  
                </div>
            </div>
            {/* Do you have any imaginary or specific design idea */}
          <div>
                <h2 className="font-bold text-xl text-left list-inside list-item list-disc">Do you have any imaginary or specific design idea?</h2>
                <p>{requirement?.designIdea}</p>
                <div>
                   {
                   requirement?.ideaFile.map((file,i)=>{
                        return  <Link href={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} key={i} className="flex items-center gap-3">
                            <p className="font-bold text-lg">Attachments {i+1}</p> 
                            <button><FiDownloadCloud size={23} /></button>
                        </Link>
                    })
                      }  
                </div>
            </div>
            {/* Do you have your specific design size */}
          <div>
                <h2 className="font-bold text-xl text-left list-inside list-item list-disc">Do you have your specific design size?</h2>
                <p>{requirement?.designSize}</p>
                <div>
                   {
                    requirement?.sizeFile.map((file,i)=>{
                        return  <Link href={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file}`} key={i} className="flex items-center gap-3">
                            <p className="font-bold text-lg">Attachments {i+1}</p> 
                            <button><FiDownloadCloud size={23} /></button>
                        </Link>
                    })
                      }  
                </div>
            </div>
            {/* You have to give clear information that you need in the design */}
          <div>
                <h2 className="font-bold text-xl text-left list-inside list-item list-disc">You have to give clear information that you need in the design?</h2>
                <p>{requirement?.designInfo}</p>
                <div>
                   {
                    requirement?.informationFile.map((file,i)=>{
                        return  <Link href={`${process.env.NEXT_PUBLIC_DOWNLOAD}/${file?.fileId}`} key={i} className="flex items-center gap-3">
                            <p className="font-bold text-lg">Attachments {i+1}</p> 
                            <button><FiDownloadCloud size={23} /></button>
                        </Link>
                    })
                      }  
                </div>
            </div>
        </div>
    );
}

export default AdminRequirement;