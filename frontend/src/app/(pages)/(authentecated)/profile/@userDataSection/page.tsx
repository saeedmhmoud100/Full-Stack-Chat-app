"use client";

import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import "./style.css"
import ProfileAvatar from "@/app/(pages)/(authentecated)/profile/@userDataSection/profile_avatar";
import {useEffect} from "react";
import {getLoggedUserData} from "@/lib/slices/accountActions/accountActions";


export default function UserDataSection(){
    const {userData:{username,email}} = useSelector(state => state.account)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLoggedUserData())
    }, [])


    return (
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="profile_image md:p-20 sm:pt-20 sm:pb-4">
                    <div className="image rounded-full overflow-hidden relative">
                        <ProfileAvatar  />
                    </div>
                </div>
                <div className="profile_data ms-4 md:pt-20 text-6xl sm:text-center md:text-start">
                    <p className="text-lg my-6 text-3xl">Username:  {username} </p>
                    <p className="text-lg my-6 text-3xl">Email:  {email} </p>
                    <p className="text-lg my-6 text-3xl">phone:  user_id </p>
                    <p className="text-lg my-6 text-3xl">location:  user_id </p>

                    <Button variant="contained" color='primary' size="large"  href="#">
                        <span className='px-6 py-1 text-lg'>edit</span>
                    </Button>
                </div>
            </div>
    )
}