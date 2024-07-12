"use client";
import {useDispatch, useSelector} from "react-redux";
import ChatBox from "@/app/_components/ChatBox";
import {useEffect, useState} from "react";
import { RootState } from '@/lib/store';
import { connect, sendMessage } from '@/lib/slices/publicChatSlice';


export default function PublicChatPage() {
    const dispatch = useDispatch();
    const messages = useSelector((state: RootState) => state.public_chat.messages);
    useEffect(() => {
        dispatch(connect("ws://localhost:8000/ws/public_chat/"));

        return () => {
            dispatch(connect(null)); // Close the WebSocket connection when the component unmounts
        };
    }, [dispatch]);

    return (
        <div className=" border-t-4 w-full flex justify-center flex-col w-full " style={{height:"calc(100vh - 50px)"}}>
            <ChatBox text={"1 online"} type={'public'} messages={messages}/>
        </div>
    )
}