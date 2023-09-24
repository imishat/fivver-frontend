
const ProjectCard = ({project}) => {
    console.log(project,"project")
    const color = 
    project.status==='Revision' && 'text-[#DF7138]' 
    || 
    project.status==='Progress' && 'text-[#5BAA5F]'
    || 
    project.status==='Waiting' && 'text-[#4AAAB2]'
    || 
    project.status==='Delivered' && 'text-[#9D0E65]'
    || 
    project.status==='Completed' && 'text-[#1B8CDD]'
    ||
    project.status==='Active' && 'text-[#DA560A]'
    return (
        <div className="border p-3 w-full ">
            <div className="flex gap-2">
                <img src={project.design} className="h-14 bg-rose-200 w-20" alt="" />
              <div className="flex flex-col w-full">
              <p className="text-base">{project.title}</p>
                <p className="text-xl font-bold">${project.category?.at(0).price}</p>
              </div>
            </div>
            <div className="flex justify-between pt-2 items-center">
                <p>{project.time}</p>
                <p className={`font-bold ${color}`}>{project.status}</p>
            </div>
        </div>
    );
};

export default ProjectCard;