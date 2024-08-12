import {createAsyncThunk} from "@reduxjs/toolkit";
import Post from "@/hooks/serverActions/methods/Post";
import Put from "@/hooks/serverActions/methods/Put";
import Get from "@/hooks/serverActions/methods/Get";


export const getAllPrivateChats = createAsyncThunk('private_chats/getAllPrivateChats',
    async (credentials: { userId: string}, { rejectWithValue }) => {
        const response = await Get(`/api/private_chats/get_all_private_chats/`)
        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});