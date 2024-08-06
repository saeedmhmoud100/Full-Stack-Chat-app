"use client"
import {useDispatch, useSelector} from "react-redux";
import {FormEvent, useEffect, useRef} from "react";
import {websocketConnect, websocketDisconnect, websocketSend} from "@/lib/websocketActions";
import PublicChatHook from "@/hooks/home/publicChat-Hook";


export default function PublicChat() {
    const {messagesBoxRef,handleSubmit} = PublicChatHook()
    const {messages,online_users_count} = useSelector(state => state.public_chat);
    const {isLogged,userData:{id}} = useSelector(state => state.account)


  return (
    <div>
        {
            isLogged &&

            <div className=" border-t-4 w-full flex justify-center flex-col w-full p-8  shadow-2xl rounded-xl" style={{height: "calc(100vh - 50px)"}}>
                <h2 className='text-xl text-center mb-4 font-bold'>Public Chat</h2>
                <div className={`h-full w-full m-auto flex bg-gray-300 flex-col pt-3`}>
                    <div className="rounded-full w-full m-auto py-4 flex bg-gray-800 flex-col pt-3 text-white border-b border-gray-800 text-center">
                        <span className="text-green-500">{online_users_count} Online</span>
                    </div>
                    <div className="messages overflow-auto mt-1" style={{height:"100%"}} ref={messagesBoxRef}>

                        {
                            messages?.map((message, index) =>
                                <div key={index} className={`flex ${message.user.id !== id ? "items-start" : "items-end" } flex-col  mt-3 mb-2`}>
                                    <span className='text-xs'>{message.timestamp}</span>
                                    <div className={`message flex  ${message.user.id !== id ? "justify-start" : "flex-row-reverse" }`}>
                                        <img src={message.user.profile_image} style={{width:'60px',height:'60px'}} />
                                        <span className={`px-12 py-4 ${message.user.id !== id ? "py-4 bg-white rounded-r-full border-s-2" :" bg-green-500 rounded-l-full border-e-2"} `}>
                                        {message.message}
                                    </span>
                                    </div>
                                </div>)
                        }
                    </div>



                    <form className="form flex w-full" style={{height:"min-content"}} onSubmit={handleSubmit}>
                        <input type="text" name={'message'} className="px-4 w-full h-12 border border-l-2" placeholder="Type a message..."/>
                        <button className="w-min h-12 bg-blue-500 px-16">Send</button>
                    </form>

                </div>
            </div>
        }
    </div>
  )
}