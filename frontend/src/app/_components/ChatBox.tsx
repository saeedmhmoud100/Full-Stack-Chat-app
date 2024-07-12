"use client";
import ChatNav from "@/app/_components/ChatNav";
import {useDispatch, useSelector} from "react-redux";
import {receive, send, setAllMessages} from "@/lib/slices/publicChatSlice";
import {FormEvent, useEffect, useRef} from "react";

type ChatBoxProps = {
    width: string,
    text: string,
    type: 'group' | 'chat'| 'public',
    messages: string[]
}


export default function ChatBox({width,text,type,messages}: ChatBoxProps) {
    const dispatch = useDispatch();
    const messagesBoxRef = useRef<HTMLDivElement>(null)
    const toScroll = useSelector(state => state.public_chat.messages)

    useEffect(() => {
        messagesBoxRef.current?.scrollTo(0,messagesBoxRef.current.scrollHeight)
        console.log(messagesBoxRef.current.scrollHeight)
    },[toScroll])


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const formData = (new FormData(e.target));
        const msg = formData.get('message')
        if(msg){
            const data = {'type':'add_message', 'message':msg, 'user_id':localStorage.getItem("user_id")}
            dispatch(send(JSON.stringify(data)))
            (e.target as HTMLFormElement).reset()
        }
    }


    return (
        <div className={`h-full ${width || "w-full"} m-auto flex bg-gray-300 flex-col pt-3`}>
            <ChatNav type={type} text={text}/>
            <div className="messages overflow-auto mt-1" style={{height:"100%"}} ref={messagesBoxRef}>

                {
                    messages?.map((message, index) => <div key={index} className={`message flex  ${message.user_id !== localStorage.getItem('user_id') ? "justify-start":"justify-end" }  my-2`}>
                            <span className={`px-12 py-4 ${message.user_id !== localStorage.getItem('user_id') ? "py-4 bg-white rounded-r-full border-s-2" :" bg-green-500 rounded-l-full border-e-2"} `}>
                                {message.message}
                            </span>
                    </div>)
                }
            </div>



            <form className="form flex w-full" style={{height:"min-content"}}  onSubmit={handleSubmit}>
                <input type="text" name={'message'} className="px-4 w-full h-12 border border-l-2" placeholder="Type a message..."/>
                <button className="w-min h-12 bg-blue-500 px-16">Send</button>
            </form>



        </div>
    )
}