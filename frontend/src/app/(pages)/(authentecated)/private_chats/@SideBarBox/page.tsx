"use client";
import {useEffect, useRef, useState} from "react";
import defaultGroupImage from "@/assets/images/group_image.png";
import {useDispatch, useSelector} from "react-redux";
import {getAllPrivateChats} from "@/lib/slices/privateChatsStore/userActions";


export default function PrivateChatBox(){
    const dispatch = useDispatch()
    const ref = useRef(null);
    const {all_chats} = useSelector(state => state.private_chats)
    useEffect(()=>{
        dispatch(getAllPrivateChats())
    },[])



    const handleShowSidebar = () => {
        const inp = ((ref.current as HTMLDivElement).parentElement?.firstElementChild.firstElementChild.firstElementChild.classList)
        inp.toggle('px-4')
        inp.toggle('border')
        inp.toggle('border-l-2')
        ref.current?.classList.toggle("show");
    }



    return(
        <div className="relative">

            <div ref={ref} className={`sidebar overflow-x-hidden h-full m-auto flex bg-gray-300 flex-col pt-3 border-r-4 border-gray-950`}>

                <div className="form flex w-full" style={{height: "min-content"}}>
                    <input type="text" className="w-full  h-12  rounded-full" placeholder="Search..."/>
                </div>


                <div className="w-full overflow-y-auto px-3" style={{height: "100%"}}>
                    {all_chats.map(item =>
                        <div key={item.id} className=" flex justify-start items-center w-full cursor-pointer my-4">
                            <img className="w-20 h-20 rounded-full" src={item.user.profile_image } />
                            <div className="pl-3">
                                <h1 className="text-lg font-bold">{item.user.username}</h1>
                            </div>
                        </div>
                    )}

                </div>

            </div>
            <div className="after" onClick={handleShowSidebar}> {''} </div>
        </div>
    )
}