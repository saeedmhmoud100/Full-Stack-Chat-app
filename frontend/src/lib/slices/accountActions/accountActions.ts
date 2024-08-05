import {createAsyncThunk} from "@reduxjs/toolkit";
import Post from "@/hooks/serverActions/methods/Post";
import Put from "@/hooks/serverActions/methods/Put";
import Get from "@/hooks/serverActions/methods/Get";


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

export const getLoggedUserData = createAsyncThunk('account/getLoggedUserData',
async (credentials: { }, { rejectWithValue }) => {
        const response = await Get('/api/accounts/me/', credentials)
        if(response?.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});


export const performChangePassword = createAsyncThunk('account/changePassword',
async (credentials: { old_password: string, new_password: string }, { rejectWithValue }) => {
        const response = await Put('/api/accounts/change_password/', credentials,true)
        if(response?.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
})