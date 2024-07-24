"use client";

import {useSelector} from "react-redux";
import {useLayoutEffect} from "react";
import {useRouter} from "next/navigation";


export default function Profile(){
    const {userData:{user_id}, isLogged} = useSelector(state => state.account)
    const router = useRouter()

    return (
        <div className="w-full h-full mt-4 flex items-center">
            <h1 className="text-4xl text-center font-bold border-b-gray-500"> Welcome,  {user_id} </h1>
        </div>
    )
}