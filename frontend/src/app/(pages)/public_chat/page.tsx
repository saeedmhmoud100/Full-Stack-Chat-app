"use client";
import {useDispatch, useSelector} from "react-redux";
import ChatBox from "@/app/_components/ChatBox";
import {useEffect, useState} from "react";
import {addMessage, connect, receive, setAllMessages, setWebSocket,closeSocket} from "@/lib/slices/publicChatSlice";


export default function PublicChatPage() {
    const messages = useSelector(state => state.public_chat.messages);
    const dispatch = useDispatch();



    useEffect(() => {
        console.log("yes")
        if(!localStorage.getItem("user_id")){
            localStorage.setItem("user_id", Math.random().toString(36).substring(7));
        }
        const handleReceive = (data) => {
            data = JSON.parse(data.data)
            if(data.type === "all_messages"){
                dispatch(setAllMessages(data.data))
            }else if(data.type == "add_message"){
                dispatch(addMessage(data.message))
            }
        }

        dispatch(setWebSocket("ws://localhost:8000/ws/public_chat/"))
        dispatch(receive(data=>handleReceive(data)))

        return () =>{
            dispatch(closeSocket())
        }

    }, []);


    return (
        <div className=" border-t-4 w-full flex justify-center flex-col w-full " style={{height:"calc(100vh - 50px)"}}>
            <ChatBox text={"1 online"} type={'public'} messages={messages}/>
        </div>
    )
}