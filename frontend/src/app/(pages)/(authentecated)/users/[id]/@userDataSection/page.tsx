"use client";

import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import "./style.css"
import {useEffect, useState} from "react";
import useUserDataSectionHook from "@/hooks/users/UserDataSection-Hook";


export default function UserDataSection(){
    const {userData:{username,email,profile_image,is_friend,is_you,request_from_you,request_to_you,is_online}} = useSelector(state => state.user)
    const [hydrated,setHydrated] = useState(false)
    const {handleFriendRequest, handleCancelFriendRequest, handleAcceptFriendRequest, handleDeclineFriendRequest, handleUnfriend,router,handleMessage} = useUserDataSectionHook()

    useEffect(() => {
        setHydrated(true)
    },[])


    if(!hydrated){
        return null
    }

    if(is_you){
        router.push('/profile')
    }



    return (
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="profile_image md:p-20 sm:pt-20 sm:pb-4">
                    <div className={`inline  ${is_online ? 'img-online-on' : 'img-online-off'} img-online-profile image rounded-full relative`}>
                        <img src={profile_image} alt="profile image" style={{width: "300px"}} className={'rounded-full'}/>
                    </div>
                </div>
                <div className="profile_data w-full ms-4 md:pt-20 text-6xl sm:text-center md:text-start">
                    <p className="text-lg my-6 text-3xl">Username:  {username} </p>
                    <p className="text-lg my-6 text-3xl">Email:  {email} </p>

                    {
                        is_friend ?
                            (
                                <div className='flex flex-col gap-3'>
                                    <Button onClick={_ =>handleMessage()} variant="contained" color='primary' size="large">
                                    <span className='px-6 py-1 text-lg'>Message</span>
                                    </Button>
                                    <Button onClick={_=>handleUnfriend()} variant="contained" color='error' size="large">
                                    <span className='px-6 py-1 text-lg'>Unfriend</span>
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    {
                                        request_from_you ? (
                                            <>
                                                <Button onClick={_=>handleCancelFriendRequest()} variant="contained" color='error' size="large"  href="#">
                                                    <span className='px-6 py-1 text-lg'>cancel friend request</span>
                                                </Button>
                                            </>
                                        ) :
                                            (
                                                <>
                                                    {
                                                        request_to_you ?(
                                                            <div className='flex flex-col gap-3'>
                                                                <Button onClick={_=>handleAcceptFriendRequest()} variant="contained" color='success' size="large">
                                                                    <span className='px-6 py-1 text-lg'>accept request</span>
                                                                </Button>
                                                                <Button onClick={_=>handleDeclineFriendRequest()} variant="contained" color='error' size="large">
                                                                    <span className='px-6 py-1 text-lg'>Cancel request</span>
                                                                </Button>
                                                            </div>
                                                        ) :(
                                                            <Button onClick={_=>handleFriendRequest()} variant="contained" color='primary' size="large">
                                                                <span className='px-6 py-1 text-lg'>send friend request</span>
                                                            </Button>
                                                        )
                                                    }
                                                </>
                                            )
                                    }

                                </>
                            )
                    }

                </div>
            </div>
    )
}