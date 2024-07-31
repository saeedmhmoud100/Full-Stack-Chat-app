'use client'

import {useDispatch, useSelector} from "react-redux";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Link from "next/link";
import {useEffect} from "react";
import {getFriendsRequests} from "@/lib/slices/usersStore/userActions";
import useUserDataSectionHook from "@/hooks/users/UserDataSection-Hook";



export default function FriendRequestsSection(){
    const {friend_requests,friend_requests_change} = useSelector(state => state.user)
    const {handleAcceptFriendRequest,handleDeclineFriendRequest} = useUserDataSectionHook()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFriendsRequests())
    },[dispatch,friend_requests_change])





    return (
        <div className='friends-list bg-white p-4  h-[355px] overflow-y-auto'>
            <h2 className="text-4xl text-center font-bold border-b-gray-500"> Your Friend Requests </h2>

            {
                friend_requests?.length ?
                    friend_requests.map(friend =>
                        <div key={friend.from_user?.id} className='flex w-full h-24 px-4 gap-3 items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md'>
                            <Link href={`/users/${friend.from_user?.id}/`} key={friend.from_user?.id} className="w-full flex gap-3 my-3 items-center ">
                                <img src={friend.from_user?.profile_image} style={{height:"60px",width:"60px"}}  className='rounded-3xl'/>
                                <h4>{friend.from_user?.username}</h4>
                            </Link>
                            <div className="flex gap-2">
                                <CheckIcon onClick={_=>handleAcceptFriendRequest(friend.from_user.id)}  color='success' className='hover:bg-gray-400 p-1 transition delay-100 ' fontSize='large'/>
                                <ClearIcon onClick={_=>handleDeclineFriendRequest(friend.from_user.id)} color='error' className='hover:bg-gray-400 p-1 transition delay-100 ' fontSize='large'/>
                            </div>
                        </div>
                    )
                    :
                    <h4 style={{margin:"70px auto",textAlign:'center'}}>No requests</h4>
            }

        </div>
    )
}