"use client";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {websocketConnect} from "@/lib/websocketActions";
import {useParams} from "next/navigation";
import ChatBoxHook from "@/hooks/privateChat/ChatBox-Hook";


export default function PrivateChatBox(){
    const {private_chat:{in_chat,user:{username}}} = useSelector(state => state.private_chats)
    const [messages] = useState([])
    const {messagesBoxRef } = ChatBoxHook()
    return in_chat ? (
        <div className={`h-full w-full m-auto flex bg-gray-300 flex-col pt-3`}>
            <div className="rounded-full w-full m-auto py-4 flex bg-gray-800 flex-col pt-3 text-white border-b border-gray-800 text-center">
                <span className="text-green-500">{username}</span>
            </div>
            <div className="messages overflow-auto mt-1" style={{height:"100%"}} ref={messagesBoxRef}>

                {
                    messages?.map((message, index) => <div key={index} className={`message flex  ${message.user_id !== localStorage.getItem('user_id') ? "justify-start":"justify-end" }  my-2`}>
                            <span className={`px-12 py-4 ${message.user_id !== localStorage.getItem('user_id') ? "py-4 bg-white rounded-r-full border-s-2" :" bg-green-500 rounded-l-full border-e-2"} `}>
                                {message.message}
                            </span>
                    </div>)
                }
            </div>



            <form className="form flex w-full" style={{height:"min-content"}}>
                <input type="text" name={'message'} className="px-4 w-full h-12 border border-l-2" placeholder="Type a message..."/>
                <button className="w-min h-12 bg-blue-500 px-16">Send</button>
            </form>



        </div>
    ) : null
}