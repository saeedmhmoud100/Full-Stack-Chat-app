import {createAsyncThunk} from "@reduxjs/toolkit";
import Post from "@/hooks/serverActions/methods/Post";


export const performLogin = createAsyncThunk('account/performLogin',
    async (credentials: { email: string, password: string }, { rejectWithValue }) => {
        const response = await Post('/accounts/api/login/', credentials)

        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }

});
export const performUpdateToken = createAsyncThunk('account/performUpdateToken',
    async (credentials: { email: string, password: string }, { rejectWithValue }) => {
        const response = await Post('/accounts/api/token/refresh/', credentials)

        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});