import Main from "@/Layout/Main";
import Activity from "@/components/Message/Activity";
import { useGetMessagesById } from "@/components/queries/query/getMessagesById.query";
import { useGetProject } from "@/components/queries/query/project.query";
import { useRouter } from "next/router";

const activity = () => {
    // router 
    const router = useRouter()
    const {projectId} = router.query


    // get project b y id
    const {data:projectData} = useGetProject({projectId:projectId,search:'',status:''})

   const project = projectData?.data?.project
  
    // get message by projectId
    const {data:messageData} = useGetMessagesById({projectId:projectId,userId:project?.startedBy})
    console.log(project?.startedBy)
    // console.log(messageData)
    return (
        <Main title={'Activity'}>
            <Activity messageData={messageData} project={project} />
        </Main>
    );
};

export default activity;