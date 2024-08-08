'use client'

import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import {useEffect} from "react";
import {getUserFriends} from "@/lib/slices/usersStore/userActions";
import {Button} from "@mui/material";


export default function GetAllFriendsSection() {
    const {friends, friends_change} = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserFriends())
    }, [dispatch, friends_change])

    return (
        <div className='friends-list bg-white p-4  h-[355px] overflow-y-auto'>
            <h2 className="text-4xl text-center font-bold border-b-gray-500"> Your Friends({friends.length || 0}) </h2>

            {
                friends?.length ?
                    friends.map(friend =>
                        <div key={friend.id}
                             className='w-full  px-4 flex items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md'>
                            <Link href={`/users/${friend.id}/`}
                                  className="w-full h-20 flex gap-3 my-3 items-center rounded-e-none px-3">
                                <img src={friend.profile_image} style={{height: "60px", width: "60px"}}
                                     className='rounded-3xl'/>
                                <h4>{friend.username}</h4>
                            </Link>
                            <Link href={`/private_chats/${friend.private_chat_id}`}>

                                <Button variant='contained' color='primary' sx={{
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                }}
                                >
                                    <span className='p-5'>Message</span>
                                </Button>
                            </Link>
                        </div>
                    )
                    :
                    <h4 style={{margin: "70px auto", textAlign: 'center'}}>No friends</h4>
            }

        </div>
    )
}