'use client'

import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import {useEffect} from "react";
import {getFriendsRequests, getFriendsRequestsYouSent} from "@/lib/slices/usersStore/userActions";
import {Button} from "@mui/material";
import useUserDataSectionHook from "@/hooks/users/UserDataSection-Hook";



export default function FriendRequestsYouSentSection(){
    const {friend_requests_you_sent,friend_requests_you_sent_change} = useSelector(state => state.user)
    const {handleCancelFriendRequest} = useUserDataSectionHook()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFriendsRequestsYouSent())
    },[dispatch,friend_requests_you_sent_change])


    return (
        <div className='friends-list bg-white p-4  h-[355px] overflow-y-auto'>
            <h2 className="text-4xl text-center font-bold border-b-gray-500 mb-3"> Friend Requests You Sent({friend_requests_you_sent.length || 0})</h2>

            {
                friend_requests_you_sent?.length ?
                    friend_requests_you_sent.map(friend =>
                            <div key={friend.to_user?.id} className="w-full h-24 px-4 flex items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md">
                                <Link href={`/users/${friend.to_user?.id}/`} className="w-full h-24 px-4 flex gap-3 my-3 items-center  ">
                                    <div  style={{height: "60px", width: "60px"}} className={`inline  ${friend.to_user.is_online ? 'img-online-on' : 'img-online-off'}`}>
                                        <img src={friend.to_user.profile_image} style={{height: "60px", width: "60px"}} className={'rounded-3xl'}/>
                                    </div>
                                    <h4>{friend.to_user?.username}</h4>
                                </Link>
                                <Button color='error' size='large' onClick={_=>handleCancelFriendRequest(friend.to_user?.id)}>
                                    <span className='px-3 '>Cancel</span>
                                </Button>
                            </div>
                    )
                    :
                    <h4 style={{margin:"70px auto",textAlign:'center'}}>No requests you send yet</h4>
            }

        </div>
    )
}