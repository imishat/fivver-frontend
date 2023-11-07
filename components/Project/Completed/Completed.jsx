import { useGetProject } from "@/components/queries/query/project.query";
import { useRouter } from "next/router";
import { useState } from "react";
import Feedback from "../Feedback/Feedback";

function Completed() {

    const router = useRouter()
    const [toggle,setToggle] = useState('feedback')
    const {completedId:projectId} = router.query
    const {data:singleProject} = useGetProject({projectId:projectId,search:'',status:''})

   

    return (
        <div>
            <Feedback singleProject={singleProject} />
        </div>
    );
}

export default Completed;