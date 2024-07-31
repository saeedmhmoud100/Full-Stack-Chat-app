'use client'

import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import {useEffect} from "react";
import {getUserFriends} from "@/lib/slices/usersStore/userActions";



export default function GetAllFriendsSection(){
    const {friends,friends_change} = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserFriends())
    },[dispatch,friends_change])

    return (
        <div className='friends-list bg-white p-4  h-[355px] overflow-y-auto'>
            <h2 className="text-4xl text-center font-bold border-b-gray-500"> Your Friends </h2>

            {
                friends?.length ?
                    friends.map(friend =>
                        <Link href={`/users/${friend.id}/`} key={friend.id} className="w-full h-24 px-4 flex gap-3 my-3 items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md">
                            <img src={friend.profile_image} style={{height:"60px",width:"60px"}}  className='rounded-3xl'/>
                            <h4>{friend.username}</h4>
                        </Link>
                    )
                    :
                    <h4>No friends</h4>
            }

        </div>
    )
}