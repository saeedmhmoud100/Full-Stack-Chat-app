import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

// Define a type for the slice state
export interface PublicChatState {
    messages: string[];
    socket: WebSocket | null;
}

// Define the initial state using that type
const initialState: PublicChatState = {
    messages: ["hi 1", "hi 2", "hi 3"],
    socket:null
};

export const publicChatSlice = createSlice({
    name: 'public_chat',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setWebSocket: (state, action: PayloadAction<string>) => {
            state.socket = new WebSocket(action.payload);
        },
        setAllMessages: (state, action: PayloadAction<{ message: string }[]>) => {
            state.messages = action.payload.map((msg) => msg.message);
        },
        connect: (state, action: PayloadAction<() => void>) => {
            state.socket.onopen = action.payload;
        },
        receive: (state, action: PayloadAction<(event: MessageEvent) => void>) => {
            state.socket.onmessage = action.payload;
        },
        send: (state, action: PayloadAction<string>) => {
            state.socket.send(action.payload);
        },
    },
});

export const { setAllMessages, connect, receive, send,setWebSocket} = publicChatSlice.actions;

export default publicChatSlice.reducer;