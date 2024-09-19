"use client"

import Link from "next/link";
import NavBarHook from "@/hooks/navbar/NavBar-Hook";
import * as React from "react";
import NavbarSearch from "@/app/_components/Navbar/Navbar-Search";
import './Navbar.css'
import bellIcon from '@/assets/icons/bell-regular.svg'
import defaulImage from '@/assets/images/default-profile-image.png'
import {useSelector} from "react-redux";
export default function Navbar() {

    const {isLogged, userData,handleMakeNotificationsSeen,handleMakeSeen} = NavBarHook()
    const {all_notifications,unseen_notifications_count} = useSelector((state) => state.notifications);



    return (
        <div className="w-full bg-gray-800 py-2 flex justify-between items-center text-white items-center">
            <Link href="/" ><div className="text-2xl pl-4 w-max">{"My Chat"}</div></Link>


                {
                    isLogged ? (
                        <div className='px-4 flex justify-between w-full'>
                            <div className="nav_search w-full flex justify-center  mx-4 ">
                                <div className="bg-white md:w-2/4 w-full rounded-xl overflow-hidden">
                                    <NavbarSearch />
                                </div>
                            </div>

                            <div className=' w-max flex items-center'>
                                <div className="nav_icon_container relative mx-4" style={{width:'20px'}}>
                                    <img onClick={handleMakeNotificationsSeen} id='nav_icons_1' className='nav_icons_1 object-cover nav_icon cursor-pointer rounded-full' src={bellIcon.src} style={{width:'40px'}} />
                                    <div  className='nav_icons_1 nav_notifications absolute text-gray-950 hidden'>
                                        {
                                            all_notifications.map((notification,index) => {
                                                return (
                                                    <Link onClick={_=>handleMakeSeen(notification.id)} key={notification.id} href={`/users/${notification.sender.id}`} className={`flex flex-col gap-2 ${notification.is_seen ? 'seen' :"" }`}>
                                                        <div className="flex gap-2 text-xs items-center">
                                                            <img src={notification.sender.profile_image} className='w-8 h-8 rounded-full' />
                                                            <div className="px-4 notification-item">{notification.text_preview}</div>
                                                        </div>
                                                        <div className="time text-xs">{notification.timestamp}</div>
                                                    </Link>
                                                )
                                            })
                                        }

                                    </div>
                                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center">{unseen_notifications_count}</div>
                                </div>

                                <div className="nav_icon_container relative" style={{width:'40px'}}>
                                    <img id={'nav_icons_2'} className='nav_icons_2 object-cover nav_icon cursor-pointer rounded-full' src={userData.profile_image} style={{width:'40px'}} />
                                    <div  className='nav_icons_2 nav_links absolute text-gray-950 hidden nav_icons_2'>
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