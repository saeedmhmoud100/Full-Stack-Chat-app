// src/app/slices/publicChatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PublicChatState {
    messages: string[];
}

const initialState: PublicChatState = {
    messages: [],
};

const publicChatSlice = createSlice({
    name: 'public_chat',
    initialState,
    reducers: {
        setAllMessages: (state, action: PayloadAction<{ message: string }[]>) => {
            state.messages = action.payload;
        },
        receiveMessage: (state, action: PayloadAction<string>) => {
            state.messages.push(action.payload);
        },
        sendMessage: (state, action: PayloadAction<string>) => {
            // This action will be handled by the middleware
        },
        connect: (state, action: PayloadAction<string>) => {
            // This action will be handled by the middleware
        },
    },
});

export const { receiveMessage, sendMessage, connect,setAllMessages } = publicChatSlice.actions;
export default publicChatSlice.reducer;