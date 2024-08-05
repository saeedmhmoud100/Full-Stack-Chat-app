import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface PublicChatState {
    connected: boolean;
    messages: string[];
    error: string | null;
    online_users_count: number;
}

const initialState: PublicChatState = {
    connected: false,
    messages: [],
    error: null,
    online_users_count: 0,
};

export const publicChatSlice = createSlice({
    name: 'public_chat',
    initialState,
    reducers: {
        open: (state) => {
            state.connected = true;
        },
        close: (state) => {
            state.connected = false;
        },
        message: (state, action: PayloadAction<string>) => {
            const { type, data } = JSON.parse(action.payload);
            switch (type){
                case 'online_users_count':
                    state.online_users_count = data;
                    break;
                case 'all_messages':
                    state.messages = data;
                    break;
            }
        },
        error: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { open, close, message, error } = publicChatSlice.actions;

