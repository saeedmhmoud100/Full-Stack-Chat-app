import {createAsyncThunk} from "@reduxjs/toolkit";
import Post from "@/hooks/serverActions/methods/Post";
import Put from "@/hooks/serverActions/methods/Put";
import Get from "@/hooks/serverActions/methods/Get";


export const performGetUserData = createAsyncThunk('user/getUserData',
    async (credentials: { userId: string}, { rejectWithValue }) => {
        const response = await Get(`/api/friends/${credentials.userId}/`)
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

export const sendFriendRequest = createAsyncThunk('user/sendFriendRequest',
    async (credentials: { id: string}, { rejectWithValue }) => {
        const response = await Post(`/api/friends/send_friend_request/${credentials.id}/`)
        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});
export const cancelFriendRequest = createAsyncThunk('user/cancelFriendRequest',
    async (credentials: { id: string}, { rejectWithValue }) => {
        const response = await Post(`/api/friends/cancel_friend_request/${credentials.id}/`)
        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});
export const acceptFriendRequest = createAsyncThunk('user/acceptFriendRequest',
    async (credentials: { id: string}, { rejectWithValue }) => {
        const response = await Post(`/api/friends/accept_friend_request/${credentials.id}/`)
        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});
export const declineFriendRequest = createAsyncThunk('user/declineFriendRequest',
    async (credentials: { id: string}, { rejectWithValue }) => {
        const response = await Post(`/api/friends/decline_friend_request/${credentials.id}/`)
        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});