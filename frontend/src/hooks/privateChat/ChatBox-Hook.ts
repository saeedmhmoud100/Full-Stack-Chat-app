import {useDispatch, useSelector} from "react-redux";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {websocketConnect, websocketSend} from "@/lib/websocketActions";
import {backendUrlSocket} from "@/hooks/serverActions/methods/customFeatch";


export default function ChatBoxHook() {
    const {is_new_message} = useSelector(state => state.private_chats.private_chat)
    const dispatch = useDispatch()
    const messagesBoxRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLDivElement>(null)
    const {id} = useParams()
    const [value, setValue] = useState('')
    useEffect(() => {
        messagesBoxRef.current?.scrollTo(0,messagesBoxRef.current.scrollHeight)
    },[is_new_message])


    useEffect(()=>{
        handleInRoom(id)

    },[])


    useEffect(()=>{
        if(value) {
            handleTypingStatus(true)
        }else{
            handleTypingStatus(false)
        }
    },[value])

    const handleTypingStatus = (state) => {
        const data = {
            type:'typing_status',
            is_typing:state,
        }
        dispatch(websocketSend(data,{websocket:true, onSend: 'private_chats/send',connectionId:`private_chat_${id}`}))
    }

    const handleInRoom =(room_id) => {
        dispatch(websocketConnect(backendUrlSocket +`/ws/private_chat/${room_id}`,{
            websocket: true,
            onOpen: 'private_chats/open',
            onMessage: 'private_chats/message',
            onClose: 'private_chats/close',
            onError: 'private_chats/error',
            onSend: 'private_chats/send',
            connectionId: `private_chat_${room_id}`
        })


        )
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        const message = value
        const data = {
            message,
            type:'new_message',
        }
        dispatch(websocketSend(data,{websocket:true, onSend: 'private_chats/send',connectionId:`private_chat_${id}`}))
        handleTypingStatus(false)
        setValue('')

    }

    return {messagesBoxRef,inputRef,handleSendMessage,value, setValue,handleTypingStatus}
}