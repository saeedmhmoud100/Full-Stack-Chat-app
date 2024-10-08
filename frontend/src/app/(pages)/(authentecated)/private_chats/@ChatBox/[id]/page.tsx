"use client";
import {useDispatch, useSelector} from "react-redux";
import ChatBoxHook from "@/hooks/privateChat/ChatBox-Hook";


export default function PrivateChatBox(){
    const {private_chat:{in_chat,user:{username,is_typing,is_online},messages}} = useSelector(state => state.private_chats)
    const {messagesBoxRef,inputRef,handleSendMessage,value, setValue,handleTypingStatus} = ChatBoxHook()
    const {userData:{id}} = useSelector(state => state.account)
    return in_chat ? (
        <div className={`h-full w-full m-auto flex bg-gray-300 flex-col pt-3`}>
            <div className="rounded-full w-full m-auto py-2 flex bg-gray-800 flex-col pt-3 text-white border-b border-gray-800 text-center">
                <span className="text-green-500">{username}</span>
                <span className="text-xs">{is_typing ? "Typing...":is_online ? "Online":"Offline"}</span>
            </div>
            <div className="messages overflow-auto mt-1" style={{height:"100%"}} ref={messagesBoxRef}>

                {
                    messages?.map((message, index) =>
                        <div key={index} className={`message flex flex-col ${message.user_id != id ? "items-start":"items-end" }  my-2`}>
                        <span className='text-xs'>{message.timestamp}</span>
                        <span style={{wordBreak:'break-word'}} className={`px-12 py-4 ${message.user_id != id ? "py-4 bg-white rounded-r-full border-s-2 me-2" :" bg-green-500 rounded-l-full border-e-2 ms-2"} `}>
                                {message.message}
                            </span>
                    </div>)
                }
            </div>



            <form className="form flex w-full" style={{height:"min-content"}} onSubmit={handleSendMessage}>
                <input onBlur={_=>handleTypingStatus(false)} value={value} onChange={e => setValue(e.target.value)} type="text" name={'message'} className="px-4 w-full h-12 border border-l-2" placeholder="Type a message..." ref={inputRef}/>
                <button className="w-min h-12 bg-blue-500 px-16">Send</button>
            </form>



        </div>
    ) : null
}