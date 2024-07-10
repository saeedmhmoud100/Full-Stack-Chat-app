"use client";
import {useDispatch, useSelector} from "react-redux";
import ChatBox from "@/app/_components/ChatBox";


export default function PublicChatPage() {
    const messages = useSelector(state => state.public_chat.messages);
    const dispatch = useDispatch();

    return (
        <div className=" border-t-4 w-full flex justify-center flex-col w-full " style={{height:"calc(100vh - 50px)"}}>
            <ChatBox text={"1 online"} type={'public'} messages={messages}/>
        </div>
    )
}