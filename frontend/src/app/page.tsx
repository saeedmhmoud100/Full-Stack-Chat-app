"use client";

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ChatBox from "@/app/_components/ChatBox";
import {websocketConnect, websocketDisconnect} from "@/lib/websocketActions";

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
    dispatch(websocketConnect(`ws://localhost:8000/ws/public_chat`,{
      websocket: true,
      onOpen: 'public_chat/open',
      onMessage: 'public_chat/message',
      onClose: 'public_chat/close',
      onError: 'public_chat/error',
    }))
    return () => {
      dispatch(websocketDisconnect({ onClose: 'public_chat/close' }));
    };

  }, []);

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
