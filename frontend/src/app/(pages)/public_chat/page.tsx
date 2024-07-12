"use client";
import {useDispatch, useSelector} from "react-redux";
import ChatBox from "@/app/_components/ChatBox";
import {useEffect, useState} from "react";
import {
    addMessage,
    receive,
    setAllMessages,
    setWebSocket,
    closeSocket,
    setOnlineUsersCount
} from "@/lib/slices/publicChatSlice";


export default function PublicChatPage() {
    const messages = useSelector(state => state.public_chat.messages);
    const online_counter = useSelector(state => state.public_chat.online_users_count);
    const dispatch = useDispatch();
    const socketStatus = useSelector(state => state.public_chat.socket)


    useEffect(() => {
        if(!localStorage.getItem("user_id")){
            localStorage.setItem("user_id", Math.random().toString(36).substring(7));
        }
        dispatch(setWebSocket("ws://localhost:8000/ws/public_chat/"))
        return () =>{
            dispatch(closeSocket())
        }

    }, []);

    useEffect(()=>{
        if(socketStatus){
            const handleReceive = (data) => {
                data = JSON.parse(data.data)
                if(data.type === "all_messages"){
                    dispatch(setAllMessages(data.data))
                }else if(data.type == "add_message"){
                    dispatch(addMessage(data.message))
                }else if(data.type == "online_users_count"){
                    dispatch(setOnlineUsersCount(data.count))
                }
            }
            dispatch(receive(data=>handleReceive(data)))
        }
    },[socketStatus])


    return (
        <div className=" border-t-4 w-full flex justify-center flex-col w-full " style={{height:"calc(100vh - 50px)"}}>
            <ChatBox text={`${online_counter} online`} type={'public'} messages={messages}/>
        </div>
    )
}