import {useDispatch, useSelector} from "react-redux";
import {FormEvent, useEffect, useRef} from "react";
import {websocketConnect, websocketDisconnect, websocketSend} from "@/lib/websocketActions";


export default function PublicChatHook() {
    const dispatch = useDispatch();

    const toScroll = useSelector(state => state.public_chat.messages)
    const messagesBoxRef = useRef<HTMLDivElement>(null)

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


    useEffect(() => {
        messagesBoxRef.current?.scrollTo(0,messagesBoxRef.current.scrollHeight)
    },[toScroll])


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const formData = (new FormData(e.target));
        const msg = formData.get('message')
        if(msg){
            const data = {'type':'new_message', 'data':msg}
            dispatch(
                websocketSend( data, {websocket:true, onSend: 'public_chat/send' })
            );
            e.target.reset()
        }
    }

    return {messagesBoxRef,handleSubmit}
}