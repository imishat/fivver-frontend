import Main from "@/Layout/Main";
import Activity from "@/components/Message/Activity";
import { useGetMessagesById } from "@/components/queries/query/getMessagesById.query";
import { useRouter } from "next/router";

const activity = () => {
    // router 
    const router = useRouter()
    const {projectId} = router.query
console.log(projectId)
    // get message by projectId
    const {data:messageData} = useGetMessagesById({projectId:projectId,userId:''})
    // console.log(messageData)
    return (
        <Main title={'Activity'}>
            <Activity messageData={messageData} />
        </Main>
    );
};

export default activity;