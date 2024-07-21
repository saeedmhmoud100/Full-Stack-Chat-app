"use client"

import {useRouter} from "next/navigation";


export default function Login(){
    const router = useRouter();
    const handleClick = _=>{
        router.push('/public_chat')
    }

    return (
        <div className="w-full pt-28 h-full">
            <div className="w-2/4 flex flex-col shadow-2xl rounded-2xl text-center p-8 bg-white m-auto">
            <h2 className="text-2xl mb-12">Login</h2>
                <input type="text" className="h-12 my-4 border border-l-2 px-3" placeholder="Username"/>
                <input type="password" className="h-12 my-4  border border-l-2 px-3" placeholder="Password"/>
                <button className="h-12 bg-blue-500 text-white" onClick={handleClick}>Login</button>
            </div>
        </div>
    )
}