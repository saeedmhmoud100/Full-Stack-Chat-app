// src/app/middleware/webSocketMiddleware.ts
import { MiddlewareAPI, Dispatch, AnyAction } from '@reduxjs/toolkit';
import {receiveMessage, setAllMessages} from '@/lib/slices/publicChatSlice';

const createWebSocketMiddleware = () => {
    let socket: WebSocket | null = null;

    return (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
        if (action.type === 'public_chat/connect') {
            if (socket) {
                socket.close();
            }
            socket = new WebSocket(action.payload);

            socket.onopen = () => {
                console.log('WebSocket connected');
            };

            socket.onmessage = (event) => {
                console.log('WebSocket message received:', event.data.type);
                const data = JSON.parse(event.data)
                if(data.type == 'all_messages')
                    store.dispatch(setAllMessages(data.data));
                else if(data.type == 'add_message')
                    store.dispatch(receiveMessage(data.data));
            };

            socket.onclose = () => {
                console.log('WebSocket disconnected');
                socket = null;
            };
        }
        console.log(action)
        if (socket && action.type === 'public_chat/sendMessage') {
            socket.send(action.payload);
        }

        return next(action);
    };
};

export default createWebSocketMiddleware;
