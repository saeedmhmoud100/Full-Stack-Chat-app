"use client";

import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import "./style.css"
import ProfileAvatar from "@/app/(pages)/(authentecated)/profile/@userDataSection/profile_avatar";


export default function UserDataSection(){
    const {userData:{name,image,email}, isLogged} = useSelector(state => state.account)




    return (
        <div className="user-data  w-full bg-white p-4 my-4 rounded-xl shadow flex sm:flex-col sm:items-center md:flex-row md:items-start ">
            <div className="profile_image md:p-20 sm:pt-20 sm:pb-4">
                <div className="image rounded-full overflow-hidden relative">
                    <ProfileAvatar  />
                </div>
            </div>
            <div className="profile_data ms-4 md:pt-20 text-6xl sm:text-center md:text-start">
                <p className="text-lg my-6 text-3xl">Username:  {name} </p>
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