import {useDispatch, useSelector} from "react-redux";
import {FormEvent, useEffect, useRef} from "react";
import {websocketConnect, websocketDisconnect, websocketSend} from "@/lib/websocketActions";


export default function PublicChatHook() {
    const dispatch = useDispatch();

    const toScroll = useSelector(state => state.public_chat.messages)
    const messagesBoxRef = useRef<HTMLDivElement>(null)
    const {isLogged} = useSelector(state => state.account)

    useEffect(() => {
        if(isLogged){
            dispatch(websocketConnect(`ws://localhost:8000/ws/public_chat`,{
                websocket: true,
                onOpen: 'public_chat/open',
                onMessage: 'public_chat/message',
                onClose: 'public_chat/close',
                onError: 'public_chat/error',
            }))
        }else{
            dispatch(websocketDisconnect('public_chat/close'))
        }
        return () => {
            dispatch(websocketDisconnect({ onClose: 'public_chat/close' }));
        };
    },[isLogged])


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
//