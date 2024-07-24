"use client";

import ChatBox from "@/app/_components/ChatBox";
import SideBarBox from "@/app/_components/SideBarBox";
import {useDispatch, useSelector} from "react-redux";


export default function Groups() {
    const messages = useSelector(state => state.public_chat.messages);
    const dispatch = useDispatch();
    return (
        <div>
            <div className="w-full flex"  style={{height:"calc(100vh - 50px)"}}>
                <SideBarBox width={"w-1/4"} type={'chat'}/>
                <ChatBox width={"w-full"}  text={"Group Name"}  type={'chat'} messages={messages}/>
            </div>
        </div>
    )


}