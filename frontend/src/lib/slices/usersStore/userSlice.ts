import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {removeUserToken, setAccessToken, setUserToken} from "@/hooks/localStorage";
import {
    getLoggedUserData,
    performChangeImage, performChangePassword,
    performLogin,
    performRegister,
    performUpdateToken
} from "@/lib/slices/accountActions/accountActions";
import {jwtDecode} from "jwt-decode";
import {
    acceptFriendRequest,
    cancelFriendRequest, declineFriendRequest, getFriendsRequests, getUserFriends,
    performGetUserData,
    performUserSearch,
    sendFriendRequest, unFriend
} from "@/lib/slices/usersStore/userActions";
// Define a type for the slice state
export interface UserState {
    userData?: {};
    usersSearch?: [];
    friends?: [];
    friends_change: boolean;
    friend_requests?: [];
    friend_requests_change: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
    userData: {},
    usersSearch: [],
    friends: [],
    friends_change: false,
    friend_requests: [],
    friend_requests_change: false
};



export const UserSlice = createSlice({
    name: 'user',

    initialState,
    reducers: {
        getUserData: (state, action: PayloadAction<any>) => {
            state.userData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(performGetUserData.fulfilled, (state:UserState, action:PayloadAction<any>) => {
                state.userData = action.payload;
            })
            .addCase(performGetUserData.rejected, (state:UserState, action:PayloadAction<any>) => {
                state.userData = {};
            })
            .addCase(performUpdateToken.pending, (state:UserState, action:PayloadAction<any>) => {
                state.userData = action.payload;
            })

        ///////////////////////////////////////////
            .addCase(performUserSearch.fulfilled, (state:UserState, action:PayloadAction<any>) => {
                state.usersSearch = action.payload;
            })

        ///////////////////////////////////////////
            .addCase(sendFriendRequest.fulfilled, (state:UserState, action:PayloadAction<any>) => {
                state.friend_requests_change = !state.friend_requests_change;
            })

            .addCase(cancelFriendRequest.fulfilled, (state:UserState, action:PayloadAction<any>) => {
                state.friend_requests_change = !state.friend_requests_change;
            })
            .addCase(acceptFriendRequest.fulfilled, (state:UserState, action:PayloadAction<any>) => {
                state.friends_change = !state.friends_change;
                state.friend_requests_change = !state.friend_requests_change;
            })
            .addCase(declineFriendRequest.fulfilled, (state:UserState, action:PayloadAction<any>) => {
                state.friend_requests_change = !state.friend_requests_change;
            })
            .addCase(unFriend.fulfilled, (state:UserState, action:PayloadAction<any>) => {
                state.friends_change = !state.friends_change;
                state.friend_requests_change = !state.friend_requests_change;
            })

            .addCase(getFriendsRequests.fulfilled, (state:UserState, action:PayloadAction<any>) => {
                state.friend_requests = action.payload?.friend_requests;
            })

            .addCase(getUserFriends.fulfilled, (state:UserState, action:PayloadAction<any>) => {
                state.friends = action.payload?.friends;
            })
    }


});
export const {} = UserSlice.actions;

export default UserSlice.reducer;
