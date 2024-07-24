"use client";

import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import "./style.css"
import {Button} from "@mui/material";

export default function Profile(){
    const {userData:{name}, isLogged} = useSelector(state => state.account)
    const router = useRouter()

    return (
        <div className="w-full h-full mt-4 flex flex-col justify-center">
            <h1 className="text-4xl text-center font-bold border border-b-gray-500 border-b-4 w-full text-start"> Profile </h1>
            <div className="bg-white p-4 my-4 rounded-xl shadow flex sm:flex-col sm:items-center md:flex-row md:items-start ">
                <div className="profile_image md:p-20 sm:pt-20 sm:pb-4">
                    <div className="image rounded-full overflow-hidden relative">
                        <img src="https://placehold.co/300" alt="profile image"/>
                        <div className="layout absolute w-full h-full top-0 left-0 rounded-full flex items-center justify-center">
                            <Button variant="contained" color='primary' size="large"  href="#">
                                edit
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="profile_data ms-4 md:pt-20 text-6xl sm:text-center md:text-start">
                    <p className="text-lg my-6 text-3xl">Username:  username </p>
                    <p className="text-lg my-6 text-3xl">Email:  email </p>
                    <p className="text-lg my-6 text-3xl">User ID:  user_id </p>
                    <p className="text-lg my-6 text-3xl">phone:  user_id </p>
                    <p className="text-lg my-6 text-3xl">location:  user_id </p>


                </div>
            </div>
        </div>

    )
}