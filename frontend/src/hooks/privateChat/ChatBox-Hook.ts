import {useDispatch, useSelector} from "react-redux";
import {useParams} from "next/navigation";
import {useEffect, useRef} from "react";
import {websocketConnect, websocketSend} from "@/lib/websocketActions";


export default function ChatBoxHook() {
    const toScroll = useSelector(state => state.public_chat.messages)
    const dispatch = useDispatch()
    const messagesBoxRef = useRef<HTMLDivElement>(null)
    const {id} = useParams()
    useEffect(() => {
        messagesBoxRef.current?.scrollTo(0,messagesBoxRef.current.scrollHeight)
    },[toScroll])


    useEffect(()=>{
        handleInRoom(id)
    },[])

    const handleInRoom = (room_id) => {
        dispatch({type: 'private_chats/WEBSOCKET_DISCONNECT'})
        dispatch(websocketConnect(`ws://localhost:8000/ws/private_chat/${room_id}`,{
            websocket: true,
            onOpen: 'private_chats/open',
            onMessage: 'private_chats/message',
            onClose: 'private_chats/close',
            onError: 'private_chats/error',
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