"use client"

import Link from "next/link";
import NavBarHook from "@/hooks/navbar/NavBar-Hook";
import * as React from "react";
import NavbarSearch from "@/app/_components/Navbar/Navbar-Search";
import './Navbar.css'
import {useEffect, useRef} from "react";
export default function Navbar() {

    const {isLogged, userData, handleIconClick} = NavBarHook()



    return (
        <div className="w-full bg-gray-800 py-2 flex justify-between items-center text-white items-center">
            <Link href="/" ><div className="text-2xl pl-4 w-max">{"My Chat"}</div></Link>


                {
                    isLogged ? (
                        <div className='px-4 flex justify-between w-full'>
                            <div className="nav_search w-full flex justify-center  mx-4 ">
                                <div className="bg-white md:w-2/4 w-full rounded-xl">
                                    <NavbarSearch />
                                </div>
                            </div>

                            <div className=' w-max flex items-center'>
                                <div className="nav_icon_container relative" style={{width:'40px'}}>
                                    <img onClick={handleIconClick} className='object-cover nav_icon cursor-pointer rounded-full' src={userData.profile_image} style={{width:'40px'}} />
                                    <div  className='nav_links absolute text-gray-950 hidden'>
                                        <Link href={'/profile'}><div className="px-4">Profile</div></Link>
                                        <Link href={'/private_chats'}><div className="px-4">Private Chats</div></Link>
                                        <Link href={'/groups'}><div className="px-4">Groups</div></Link>
                                        <Link href={'/logout'}><div className="px-4">logout</div></Link>
                                    </div>
                                </div>

                            </div>


                        </div>
                    ) : (<div className="flex justify-between">
                        <Link href={'/public_chat'}><div className="px-4">public Chat</div></Link>
                        <Link href={'/login'}><div className="px-4">Login</div></Link>
                        <Link href={'/register'}><div className="px-4">Register</div></Link>
                    </div>)
                }
        </div>
    )
}