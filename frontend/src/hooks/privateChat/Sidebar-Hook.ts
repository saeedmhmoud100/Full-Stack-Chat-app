import {useDispatch} from "react-redux";
import {useEffect, useRef} from "react";
import {getAllPrivateChats} from "@/lib/slices/privateChatsStore/privateChatsActions";
import {useRouter} from "next/navigation";
import {websocketConnect} from "@/lib/websocketActions";


export default function SidebarHook() {
    const router = useRouter()
    const ref = useRef(null);
    const dispatch = useDispatch()
    useEffect(()=>{
        // dispatch(getAllPrivateChats())

        dispatch({type: 'private_chats/WEBSOCKET_DISCONNECT',meta: {websocket: true, connectionId: 'all_private_chats'}})
        dispatch(websocketConnect(`ws://localhost:8000/ws/private_chats`,{
            connectionId: 'all_private_chats',
            websocket: true,
            onOpen: 'private_chats/allChatsOpen',
            onMessage: 'private_chats/allChatsMessage',
            onClose: 'private_chats/allChatsClose',
            onError: 'private_chats/allChatsError',
        }))

    },[])



    const handleShowSidebar = () => {
        const inp = ((ref.current as HTMLDivElement).parentElement?.firstElementChild.firstElementChild.firstElementChild.classList)
        inp.toggle('px-4')
        inp.toggle('border')
        inp.toggle('border-l-2')
        ref.current?.classList.toggle("show");
    }


    const handleClick = (room_id) => {
        router.push(`/private_chats/${room_id}/`)
    }

    return {handleClick,handleShowSidebar,ref}
}