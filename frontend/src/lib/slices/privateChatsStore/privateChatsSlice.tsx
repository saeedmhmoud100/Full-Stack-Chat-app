import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getAllPrivateChats} from "@/lib/slices/privateChatsStore/userActions";
// Define a type for the slice state
export interface PrivateChatsState {
    all_chats:[],
}

// Define the initial state using that type
const initialState: PrivateChatsState = {
    all_chats:[],
};



export const PrivateChatsSlice = createSlice({
    name: 'private_chats',

    initialState,
    reducers: {
        getAllChats: (state, action: PayloadAction<any>) => {
            // state.userData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPrivateChats.fulfilled, (state:PrivateChatsState, action:PayloadAction<any>) => {
                state.all_chats = action.payload.data
            })
    }


});
export const {} = PrivateChatsSlice.actions;

export default PrivateChatsSlice.reducer;