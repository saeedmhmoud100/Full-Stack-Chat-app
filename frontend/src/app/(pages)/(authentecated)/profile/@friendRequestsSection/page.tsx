'use client'

import image from '../../../../../assets/images/default-profile-image.png'
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import {useEffect} from "react";
import {getFriendsRequests} from "@/lib/slices/usersStore/userActions";



export default function FriendRequestsSection(){
    const {friend_requests} = useSelector(state => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFriendsRequests())
    },[dispatch])





    return (
        <div className='friends-list bg-white p-4  h-[355px] overflow-y-auto'>
            <h2 className="text-4xl text-center font-bold border-b-gray-500"> Your Friend Requests </h2>

            {
                friend_requests?.length ?
                    friend_requests.map(friend =>
                        <Link href={`/users/${friend.from_user?.id}/`} key={friend.from_user?.id} className="w-full h-24 px-4 flex gap-3 my-3 items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md">
                            <img src={friend.from_user?.profile_image} style={{height:"60px",width:"60px"}}  className='rounded-3xl'/>
                            <h4>{friend.from_user?.username}</h4>
                        </Link>
                    )
                    :
                    <h4>No requests</h4>
            }

        </div>
    )
}