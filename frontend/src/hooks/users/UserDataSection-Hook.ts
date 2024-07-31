import {useDispatch, useSelector} from "react-redux";
import {useParams, useRouter} from "next/navigation";
import {
    acceptFriendRequest,
    cancelFriendRequest,
    declineFriendRequest, performGetUserData,
    sendFriendRequest, unFriend
} from "@/lib/slices/usersStore/userActions";
import {useEffect} from "react";


const useUserDataSectionHook = (props) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const router = useRouter()
    const {friend_requests_change} = useSelector((state) => state.user)
    useEffect(() => {
        dispatch(performGetUserData({userId:id}))
    },[friend_requests_change])

    const handleFriendRequest = () => {
        dispatch(sendFriendRequest({id:id}))
    }
    const handleCancelFriendRequest = (id=id) => {
        dispatch(cancelFriendRequest({id:id.toString()}))
    }

    const handleAcceptFriendRequest =(id=id) => {
        dispatch(acceptFriendRequest({id:id}))
    }

    const handleDeclineFriendRequest = (id=id) => {
        dispatch(declineFriendRequest({id:id}))
    }

    const handleUnfriend =() => {
        dispatch(unFriend({id:id}))
    }

    return {handleFriendRequest, handleCancelFriendRequest, handleAcceptFriendRequest, handleDeclineFriendRequest, handleUnfriend,router}
}

export default useUserDataSectionHook;