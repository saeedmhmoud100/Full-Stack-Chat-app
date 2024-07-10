"use client";
import {useDispatch, useSelector} from "react-redux";
import ChatBox from "@/app/_components/ChatBox";
import {useEffect} from "react";
import {connect, receive, setWebSocket} from "@/lib/slices/publicChatSlice";


export default function PublicChatPage() {
    const public_chat_data = useSelector(state => state.public_chat);
    const dispatch = useDispatch();

    useEffect(() => {

        if(!localStorage.getItem("user_id")){
            localStorage.setItem("user_id", Math.random().toString(36).substring(7));
        }

        dispatch(setWebSocket("ws://localhost:8000/ws/public_chat/"))
    }, []);

    return (
        <div className=" border-t-4 w-full flex justify-center flex-col w-full " style={{height:"calc(100vh - 50px)"}}>
            <ChatBox text={"1 online"} type={'public'} messages={public_chat_data.messages}/>
        </div>
    )
}