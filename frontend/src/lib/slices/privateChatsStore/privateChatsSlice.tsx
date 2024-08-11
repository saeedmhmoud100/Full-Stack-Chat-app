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
                    break;
                case 'new_message':
                    state.private_chat.messages.push(data.message)
                    break;

            }
        },
        close: (state, action: PayloadAction<any>) => {
            state.private_chat.in_chat = false
        },
        error: (state, action: PayloadAction<any>) => {
            state.private_chat.in_chat = false
            state.errors = action.payload
        },

        allChatsOpen: (state, action: PayloadAction<any>) => {
            console.log('allChatsOpen')
        },
        allChatsMessage: (state, action: PayloadAction<any>) => {
            const {type , data} = JSON.parse(action.payload)
            switch (type) {
                case 'connected':
                    state.all_chats = data;
                    break;
                case 'update_chat_unread_messages_count':
                    let updatedChat;
                    state.all_chats = state.all_chats.map((chat:any) => {
                        if(chat.id == data.chat_id){
                            updatedChat = {...chat, unread_messages_count: data.unread_messages_count};
                            return updatedChat;
                        }
                        return chat;
                    })
                    if (updatedChat){
                        state.all_chats = [updatedChat, ...state.all_chats.filter(chat => chat.id !== data.chat_id)];
                    }
                    break;

            }
        },
        allChatsClose: (state, action: PayloadAction<any>) => {
            console.log('allChatsClose')
        },
        allChatsError: (state, action: PayloadAction<any>) => {
            console.log('allChatsError')
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