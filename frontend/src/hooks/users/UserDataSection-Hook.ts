import {useDispatch} from "react-redux";
import {useParams, useRouter} from "next/navigation";
import {
    acceptFriendRequest,
    cancelFriendRequest,
    declineFriendRequest, performGetUserData,
    sendFriendRequest, unFriend
} from "@/lib/slices/usersStore/userActions";
import {getLoggedUserData} from "@/lib/slices/accountActions/accountActions";
import {useEffect} from "react";


const useUserDataSectionHook = (props) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const router = useRouter()
    useEffect(() => {
        dispatch(performGetUserData({userId:id}))
    },[])
    const handleFriendRequest = () => {
        dispatch(sendFriendRequest({id:id}))
    }

    const handleCancelFriendRequest = () => {
        dispatch(cancelFriendRequest({id:id}))
    }

    const handleAcceptFriendRequest =async () => {
        await dispatch(acceptFriendRequest({id:id}))
        await dispatch(getLoggedUserData())
    }

    const handleDeclineFriendRequest = () => {
        dispatch(declineFriendRequest({id:id}))
    }

    const handleUnfriend = () => {
        dispatch(unFriend({id:id}))
    }

    return {handleFriendRequest, handleCancelFriendRequest, handleAcceptFriendRequest, handleDeclineFriendRequest, handleUnfriend,router}
}

export default useUserDataSectionHook;