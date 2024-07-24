"use client";

import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import "./style.css"
import {Button, TextField} from "@mui/material";
import {backendUrl} from "@/hooks/serverActions/methods/customFeatch";

export default function Profile(){
    const {userData:{name,image,email}, isLogged} = useSelector(state => state.account)
    const router = useRouter()

    return (
        <div className="w-full h-full mt-4 flex flex-col justify-center">
            <h1 className="text-4xl text-center font-bold border border-b-gray-500 border-b-4 w-full text-start"> Profile </h1>
            <div className="user-data  w-full bg-white p-4 my-4 rounded-xl shadow flex sm:flex-col sm:items-center md:flex-row md:items-start ">
                <div className="profile_image md:p-20 sm:pt-20 sm:pb-4">
                    <div className="image rounded-full overflow-hidden relative">
                        <img src={backendUrl + image} alt="profile image" style={{width:"300px"}}/>
                        <div className="layout absolute w-full h-full top-0 left-0 rounded-full flex items-center justify-center">
                            <Button variant="contained" color='primary' size="large"  href="#">
                                edit
                            </Button>
                        </div>
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

            <div className="change-password pe-4 w-2/4">
                <div className="bg-white p-4 rounded-xl">
                    <h2 className="text-4xl text-center font-bold border-b-gray-500"> Change Password </h2>
                    <div className="flex flex-col gap-4 mt-4">
                        <TextField id="filled-basic1" label="Current password" variant="outlined" />
                        <TextField id="filled-basic2" label="New password" variant="outlined" />
                        <TextField id="filled-basic3" label="Confirm new password" variant="outlined" />
                        <Button variant="contained" color='primary' size="large"  href="#">
                            <span className='px-6 py-1 text-lg'>Change Password</span>
                        </Button>
                    </div>
                </div>
            </div>


        </div>

    )
}