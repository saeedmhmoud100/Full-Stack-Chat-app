"use client";

import Link from "next/link";
import {useSelector} from "react-redux";

export default function SearchPage() {
    const {usersSearch} = useSelector(state => state.user)



    return (
        <div className="user-data w-full bg-white p-4 my-4 rounded-xl shadow flex flex-wrap">
            <h2 className="text-4xl text-start font-bold border-b-gray-500 w-full"> Users </h2>

            {
                usersSearch?.map((user) => {
                    return (
                        <>
                            <Link href={`/users/${user.id}`} className="md:w-[49%] w-full h-24 px-4 flex gap-3 my-3 items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md">
                                <img src={user.profile_image} style={{height:"60px",width:"60px"}}  className='rounded-3xl'/>
                                <h4>{user.username}</h4>
                            </Link>
                        </>
                    )
                })
            }


        </div>
    )
}