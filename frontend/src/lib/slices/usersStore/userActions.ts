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
export const unFriend = createAsyncThunk('user/unFriend',
    async (credentials: { id: string}, { rejectWithValue }) => {
        const response = await Post(`/api/friends/unfriend/${credentials.id}/`)
        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});
export const getFriendsRequests = createAsyncThunk('user/getFriendsRequests',
    async (credentials: { id: string}, { rejectWithValue }) => {
        const response = await Get(`/api/friends/get_friends_requests/`)
        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});
export const getUserFriends = createAsyncThunk('user/getUserFriends',
    async (credentials: { id: string}, { rejectWithValue }) => {
        const response = await Get(`/api/friends/get_user_friends/`)
        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});
export const getFriendsRequestsYouSent = createAsyncThunk('user/getFriendsRequestsYouSent',
    async (credentials: { id: string}, { rejectWithValue }) => {
        const response = await Get(`/api/friends/get_friend_requests_you_sent/`)
        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});
export const getMutualFriends = createAsyncThunk('user/getMutualFriends',
    async (credentials: { id: string}, { rejectWithValue }) => {
        const response = await Get(`/api/friends/get_mutual_friends/${credentials.id}/`)
        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});