'use client'

import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import {useEffect} from "react";
import {getFriendsRequests, getFriendsRequestsYouSent} from "@/lib/slices/usersStore/userActions";



export default function FriendRequestsYouSentSection(){
    const {friend_requests_you_sent,friend_requests_you_sent_change} = useSelector(state => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFriendsRequestsYouSent())
    },[dispatch,friend_requests_you_sent_change])





    return (
        <div className='friends-list bg-white p-4  h-[355px] overflow-y-auto'>
            <h2 className="text-4xl text-center font-bold border-b-gray-500"> Friend Requests You Sent</h2>

            {
                friend_requests_you_sent?.length ?
                    friend_requests_you_sent.map(friend =>
                        <Link href={`/users/${friend.to_user?.id}/`} key={friend.to_user?.id} className="w-full h-24 px-4 flex gap-3 my-3 items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md">
                            <img src={friend.to_user?.profile_image} style={{height:"60px",width:"60px"}}  className='rounded-3xl'/>
                            <h4>{friend.to_user?.username}</h4>
                        </Link>
                    )
                    :
                    <h4 style={{margin:"70px auto",textAlign:'center'}}>No requests you send yet</h4>
            }

        </div>
    )
}