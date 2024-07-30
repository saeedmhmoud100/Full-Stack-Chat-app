"use client";

import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import "./style.css"
import ProfileAvatar from "@/app/(pages)/(authentecated)/profile/@userDataSection/profile_avatar";
import {useEffect, useState} from "react";
import {getLoggedUserData} from "@/lib/slices/accountActions/accountActions";
import {performGetUserData} from "@/lib/slices/usersStore/userActions";
import {useParams, useRouter} from "next/navigation";


export default function UserDataSection(){
    const {userData:{username,email,profile_image}} = useSelector(state => state.user)
    const [hydrated,setHydrated] = useState(false)
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch(performGetUserData({userId:id}))
        setHydrated(true)
    },[])


    if(!hydrated){
        return null
    }


    return (
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="profile_image md:p-20 sm:pt-20 sm:pb-4">
                    <div className="image rounded-full overflow-hidden relative">
                        <img src={profile_image} alt="profile image" style={{width: "300px"}}/>
                    </div>
                </div>
                <div className="profile_data ms-4 md:pt-20 text-6xl sm:text-center md:text-start">
                    <p className="text-lg my-6 text-3xl">Username:  {username} </p>
                    <p className="text-lg my-6 text-3xl">Email:  {email} </p>

                    <Button variant="contained" color='primary' size="large"  href="#">
                        <span className='px-6 py-1 text-lg'>send friend request</span>
                    </Button>
                </div>
            </div>
    )
}