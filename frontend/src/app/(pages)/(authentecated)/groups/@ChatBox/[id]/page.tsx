"use client";
import {useDispatch, useSelector} from "react-redux";
import ChatBoxHook from "@/hooks/privateChat/ChatBox-Hook";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {sendMessage} from "next/dist/client/components/react-dev-overlay/pages/websocket";
import {websocketSend} from "@/lib/websocketActions";
import {setCurrentGroupId} from "@/lib/slices/groupsStore/groupsSlice";


export default function GroupChatBox(){
    const {id} = useParams();
    const {all_groups} = useSelector(state => state.groups)
    const [group,setGroup] = useState({});
    const dispatch = useDispatch();
    useEffect(()=>{
        if(all_groups.length){
                setGroup(all_groups.find(item => item.id == id))
                dispatch(setCurrentGroupId(id))
                dispatch(websocketSend({type:'make_all_message_is_read',data:{group_id:id}},{websocket:true, onSend: 'groups/send',connectionId:`all_groups`}))
                dispatch(websocketSend({type:'current_user_group',data:{group_id:id}},{websocket:true, onSend: 'groups/send',connectionId:`all_groups`}))
        }
    },[id])



    const handleSubmit = (e) => {
        e.preventDefault();
        const message = e.target.message.value;
        if(message){
            dispatch(websocketSend({type:'new_message',message,group_id:id},{websocket:true, onSend: 'groups/send',connectionId:`all_groups`}))
            e.target.message.value = ''
        }
    }

    return (
        <div className={`h-full w-full m-auto flex bg-gray-300 flex-col pt-3`}>
            <div className="rounded-full w-full m-auto py-2 flex bg-gray-800 flex-col pt-3 text-white border-b border-gray-800 text-center">
                <span className="text-green-500">{group?.name}</span>
            </div>
            <div className="messages overflow-auto mt-1" style={{height:"100%"}}>

                {
                    group?.messages?.map((item,index) => (
                        <div key={item.id} className="message flex flex-col w-full p-2">
                            <div className="flex w-full justify-start items-center">
                                <div className="inline w-20 h-20">
                                    <img src={"https://via.placeholder.com/150"} className={'w-20 h-20 rounded-full'}/>
                                </div>
                                <div className="pl-3">
                                    <h1 className="text-lg font-bold">{group?.users.find(user => user.id == item.user_id)?.username}</h1>
                                    <p className="text-gray-500">{item.message}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>



            <form className="form flex w-full" style={{height:"min-content"}} onSubmit={handleSubmit}>
                <input type="text" name={'message'} className="px-4 w-full h-12 border border-l-2" placeholder="Type a message..." />
                <button className="w-min h-12 bg-blue-500 px-16">Send</button>
            </form>



        </div>
    )
}