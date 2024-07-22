"use client"

import Link from "next/link";
import NavBarHook from "@/hooks/navbar/NavBar-Hook";

export default function Navbar() {

    const [isLogged] = NavBarHook()
    return (
        <div className="w-full bg-gray-800 h-12 flex justify-between items-center text-white">
            <div className="text-2xl pl-4">Chat</div>
            <div className="flex justify-between">
                <Link href={'public_chat'}><div className="px-4">public Chat</div></Link>
                {
                    isLogged ? (
                        <>
                            <Link href={'private_chats'}><div className="px-4">Private Chats</div></Link>
                            <Link href={'groups'}><div className="px-4">Groups</div></Link>
                            <Link href={'Profile'}><div className="px-4">Profile</div></Link>
                        </>
                    ) : (<>
                        <Link href={'login'}><div className="px-4">Login</div></Link>
                        <Link href={'register'}><div className="px-4">Register</div></Link>
                    </>)
                }
            </div>
        </div>
    )
}