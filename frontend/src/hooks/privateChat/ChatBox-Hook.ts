import {useDispatch, useSelector} from "react-redux";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useRef} from "react";
import {websocketConnect, websocketSend} from "@/lib/websocketActions";


export default function ChatBoxHook() {
    const {is_new_message} = useSelector(state => state.private_chats.private_chat)
    const dispatch = useDispatch()
    const messagesBoxRef = useRef<HTMLDivElement>(null)
    const {id} = useParams()
    const router = useRouter()
    useEffect(() => {
        messagesBoxRef.current?.scrollTo(0,messagesBoxRef.current.scrollHeight)
    },[is_new_message])


    useEffect(()=>{
        handleInRoom(id)
    },[])

    const handleInRoom =(room_id) => {
        dispatch({type: 'private_chats/WEBSOCKET_DISCONNECT'})
        dispatch(websocketConnect(`ws://localhost:8000/ws/private_chat/${room_id}`,{
            websocket: true,
            onOpen: 'private_chats/open',
            onMessage: 'private_chats/message',
            onClose: 'private_chats/close',
            onError: 'private_chats/error',
            onSend: 'private_chats/send',
        }))

    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        const message = e.target.elements.message.value
        const data = {
            message,
            type:'new_message',
        }
        dispatch(websocketSend(data,{websocket:true, onSend: 'private_chats/send'}))
        e.target.elements.message.value = ''

    }

    return {messagesBoxRef,handleSendMessage}
}