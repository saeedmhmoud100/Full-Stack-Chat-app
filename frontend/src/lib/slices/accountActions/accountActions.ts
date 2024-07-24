import {createAsyncThunk} from "@reduxjs/toolkit";
import Post from "@/hooks/serverActions/methods/Post";
import Put from "@/hooks/serverActions/methods/Put";


export const performLogin = createAsyncThunk('account/performLogin',
    async (credentials: { email: string, password: string }, { rejectWithValue }) => {
        const response = await Post('/api/accounts/login/', credentials)

        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }

});

export const performRegister = createAsyncThunk('account/performRegister',
    async (credentials: {username:string, email: string, password: string }, { rejectWithValue }) => {
        const response = await Post('/api/accounts/register/', credentials)

        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }

});
export const performUpdateToken = createAsyncThunk('account/performUpdateToken',
    async (credentials: { refresh:string }, { rejectWithValue }) => {
        const response = await Post('/api/accounts/token/refresh/', credentials)

        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});


export const performChangeImage = createAsyncThunk('account/performChangeImage',
async (credentials: { image: string }, { rejectWithValue }) => {
        const response = await Put('/api/accounts/update_image/', credentials,true)
        if(response?.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});
