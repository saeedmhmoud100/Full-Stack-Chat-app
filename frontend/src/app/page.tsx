"use client";

import {useEffect} from "react";
import Post from "@/hooks/serverActions/methods/Post";
import {useDispatch, useSelector} from "react-redux";
import {
  addMessage,
  closeSocket,
  receive,
  setAllMessages,
  setOnlineUsersCount,
  setWebSocket
} from "@/lib/slices/publicChatSlice";
import {getUserToken} from "@/hooks/localStorage";
import ChatBox from "@/app/_components/ChatBox";

export default function Home() {

  const messages = useSelector(state => state.public_chat.messages);
  const online_counter = useSelector(state => state.public_chat.online_users_count);
  const dispatch = useDispatch();
  const socketStatus = useSelector(state => state.public_chat.socket)
  const {isLogged} = useSelector(state => state.account)

  useEffect(() => {
    if(!localStorage.getItem("user_id")){
      localStorage.setItem("user_id", Math.random().toString(36).substring(7));
    }
    dispatch(setWebSocket(`ws://localhost:8000/ws/public_chat?token=${JSON.stringify(getUserToken())} `))
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
          isLogged &&
        <div className=" border-t-4 w-full flex justify-center flex-col w-full p-8  shadow-2xl rounded-xl" style={{height: "calc(100vh - 50px)"}}>
        <h2 className='text-xl text-center mb-4 font-bold'>Public Chat</h2>
          <ChatBox text={`${online_counter} online`} type={'public'} messages={messages}/>
      </div>}
    </main>
  );
}
