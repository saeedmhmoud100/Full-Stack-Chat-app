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
    const {friend_requests_change,userData:{private_chat_id}} = useSelector((state) => state.user)


    useEffect(() => {
        if(id)
            dispatch(performGetUserData({userId:id}))
    },[friend_requests_change])

    const handleFriendRequest = () => {
        dispatch(sendFriendRequest({id:id}))
    }
    const handleCancelFriendRequest = (user_id) => {
        if(!user_id)
            user_id = id
        dispatch(cancelFriendRequest({id:user_id}))
    }

    const handleAcceptFriendRequest =(user_id) => {
        if(!user_id)
            user_id = id
        dispatch(acceptFriendRequest({id:user_id}))
    }

    const handleDeclineFriendRequest = (user_id) => {
        if(!user_id)
            user_id = id
        dispatch(declineFriendRequest({id:user_id}))
    }

    const handleUnfriend =() => {
        dispatch(unFriend({id:id}))
    }

    const handleMessage = () => {
        router.push(`/private_chats/${private_chat_id}/`)

    }

    return {handleFriendRequest, handleCancelFriendRequest, handleAcceptFriendRequest, handleDeclineFriendRequest, handleUnfriend,router,handleMessage}
}

export default useUserDataSectionHook;