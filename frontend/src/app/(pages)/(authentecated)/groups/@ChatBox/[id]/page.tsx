"use client";
import {useDispatch, useSelector} from "react-redux";
import ChatBoxHook from "@/hooks/privateChat/ChatBox-Hook";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";


export default function GroupChatBox(){
    const {id} = useParams();
    const {all_groups} = useSelector(state => state.groups)
    const [{messages,users},setGroup] = useState({});

    useEffect(()=>{
        if(all_groups.length){
            setGroup(all_groups.find(item => item.id == id))
        }
    },[all_groups,id])

    console.log('messages',messages)
    console.log('users',users)
    return (
        <div className={`h-full w-full m-auto flex bg-gray-300 flex-col pt-3`}>
            <div className="rounded-full w-full m-auto py-2 flex bg-gray-800 flex-col pt-3 text-white border-b border-gray-800 text-center">
                <span className="text-green-500">{"username"}</span>
            </div>
            <div className="messages overflow-auto mt-1" style={{height:"100%"}}>

                {
                    messages?.map((item,index) => (
                        <div key={item.id} className="message flex flex-col w-full p-2">
                            <div className="flex w-full justify-start items-center">
                                <div className="inline w-20 h-20">
                                    <img src={"https://via.placeholder.com/150"} className={'w-20 h-20 rounded-full'}/>
                                </div>
                                <div className="pl-3">
                                    <h1 className="text-lg font-bold">{users.find(user => user.id = item.user.id).username}</h1>
                                    <p className="text-gray-500">{item.message}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>



            <form className="form flex w-full" style={{height:"min-content"}}>
                <input type="text" name={'message'} className="px-4 w-full h-12 border border-l-2" placeholder="Type a message..." />
                <button className="w-min h-12 bg-blue-500 px-16">Send</button>
            </form>



        </div>
    )
}