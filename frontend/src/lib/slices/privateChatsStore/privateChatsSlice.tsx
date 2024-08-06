import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getAllPrivateChats} from "@/lib/slices/privateChatsStore/userActions";
// Define a type for the slice state
export interface PrivateChatsState {
    all_chats:[],
    private_chat:{
        in_chat:boolean,
        user:{},
        messages?:[]
    },
    errors?: any
}

// Define the initial state using that type
const initialState: PrivateChatsState = {
    all_chats:[],
    private_chat:{
        in_chat:false,
        user:{},
        messages:[]
    }
};



export const PrivateChatsSlice = createSlice({
    name: 'private_chats',

    initialState,
    reducers: {
        open: (state, action: PayloadAction<any>) => {
            state.private_chat.in_chat = true
        },
        message: (state, action: PayloadAction<any>) => {
            state.private_chat.in_chat = true
            const {type,data} = JSON.parse(action.payload)
            switch (type) {
                case 'connected':
                    state.private_chat.messages = data.all_messages
                    state.private_chat.user = data.user_data
                default:
            }
        },
        close: (state, action: PayloadAction<any>) => {
            state.private_chat.in_chat = false
        },
        error: (state, action: PayloadAction<any>) => {
            state.private_chat.in_chat = false
            state.errors = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPrivateChats.fulfilled, (state:PrivateChatsState, action) => {
            state.all_chats = action.payload.data
        });

    }


});
export const {} = PrivateChatsSlice.actions;

export default PrivateChatsSlice.reducer;