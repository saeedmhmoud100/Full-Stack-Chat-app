"use client";
import {useDispatch, useSelector} from "react-redux";
import ChatBoxHook from "@/hooks/privateChat/ChatBox-Hook";


export default function GroupoChatBox(){

    return (
        <div className={`h-full w-full m-auto flex bg-gray-300 flex-col pt-3`}>
            <div className="rounded-full w-full m-auto py-2 flex bg-gray-800 flex-col pt-3 text-white border-b border-gray-800 text-center">
                <span className="text-green-500">{"username"}</span>
            </div>
            <div className="messages overflow-auto mt-1" style={{height:"100%"}}>

            </div>



            <form className="form flex w-full" style={{height:"min-content"}}>
                <input type="text" name={'message'} className="px-4 w-full h-12 border border-l-2" placeholder="Type a message..." />
                <button className="w-min h-12 bg-blue-500 px-16">Send</button>
            </form>



        </div>
    )
}