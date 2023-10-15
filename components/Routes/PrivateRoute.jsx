import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const PrivateRoute = ({children}) => {
    if (typeof window === "undefined") return null;
    // get user
    const {user} = useSelector(state=>state.user)
    // router
    const router = useRouter()
// token 
const token = typeof window !== 'undefined' && localStorage.getItem('accessToken')
    if(!user?.email && !token?.length || token==='undefined'){
        router.push('/join')
    }
    return token && children
};

export default PrivateRoute;