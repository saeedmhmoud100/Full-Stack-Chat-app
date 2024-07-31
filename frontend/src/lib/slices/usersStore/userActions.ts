import {createAsyncThunk} from "@reduxjs/toolkit";
import Post from "@/hooks/serverActions/methods/Post";
import Put from "@/hooks/serverActions/methods/Put";
import Get from "@/hooks/serverActions/methods/Get";


export const performGetUserData = createAsyncThunk('user/getUserData',
    async (credentials: { userId: string}, { rejectWithValue }) => {
        const response = await Get(`/api/friends/${credentials.userId}/`)
        console.log(response)
        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});
export const performUserSearch = createAsyncThunk('user/performUserSearch',
    async (credentials: { q: string}, { rejectWithValue }) => {
        const response = await Get(`/api/friends/search?q=${credentials.q}`)
        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});