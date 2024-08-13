import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {removeUserToken, setAccessToken, setUserToken} from "@/hooks/localStorage";
import {
    getLoggedUserData,
    performChangeImage,
    performChangePassword,
    performLogin,
    performRegister,
    performUpdateToken
} from "@/lib/slices/accountActions/accountActions";
import {jwtDecode} from "jwt-decode";

// Define a type for the slice state
export interface AccountState {
    refresh_token: string;
    access_token: string;
    isLogged: boolean;
    performAuth: boolean;
    loading: boolean;
    isErrored: boolean;
    errors?: any;
    userData?: {
        username?: string;
        email?: string;
        profile_image?: string;
    };
    isRegisterErrored?: boolean;
    registerErrors?: any;
    registerSuccess?: boolean;
    registerLoading?: boolean;


    changeImageLoading: boolean,
    changeImageSuccess: boolean,

    changePasswordLoading: boolean,
    changePasswordSuccess: boolean,
    changePasswordErrored: boolean,
}

// Define the initial state using that type
const initialState: AccountState = {

    // login
    refresh_token: '',
    access_token: '',
    isLogged: false,
    performAuth: false,
    loading: false,
    isErrored: false,
    userData: {},

    // register
    isRegisterErrored: false,
    registerErrors: {},
    registerSuccess: false,
    registerLoading: false,

    // change image
    changeImageLoading: false,
    changeImageSuccess: false,

    // change password
    changePasswordLoading: false,
    changePasswordSuccess: false,
    changePasswordErrored: false,
};



export const AccountSlice = createSlice({
    name: 'account',

    initialState,
    reducers: {
        setLoggedInState: (state, action: PayloadAction<{refresh:string,access:string}>) => {
            state.refresh_token = action.payload.refresh;
            state.access_token = action.payload.access;
            state.isLogged = true;
            if(action.payload.access)
                state.userData!.username = jwtDecode(action.payload.access)['name']
        },
        performLogout: (state) => {
            state.refresh_token = '';
            state.access_token = '';
            state.isLogged = false;
            state.isLoading = false;
            state.isErrored = false;
            state.errors = {};
            state.userData = {};
            state.performAuth =true;

            removeUserToken();
        },
        resetRegisterState: (state) => {
            state.isRegisterErrored = false;
            state.registerErrors = {};
            state.registerSuccess = false;
            state.registerLoading = false;
        },
        resetChangeImageState: (state) => {
            state.changeImageLoading = false;
            state.changeImageSuccess = false;
        },


        open: (state) => {
            state.userData.is_online = true;
        },
        close: (state) => {
            state.userData.is_online = false;
        },



    },
    extraReducers: (builder) => {
        builder
            .addCase(performLogin.fulfilled, (state:AccountState, action:PayloadAction<{}>) => {
                if(action.payload){
                    setUserToken(action.payload)
                    state.isLogged = true;
                    state.loading = false;
                    state.refresh_token = action.payload.refresh;
                    state.access_token = action.payload.access;
                    state.isErrored = false;
                    state.userData!.username = jwtDecode(action.payload.access)['name']
                    state.performAuth = true;
                }
            })
            .addCase(performLogin.pending, (state:AccountState, action) => {
                state.loading = true;
                state.isLogged = false;
                state.refresh_token = '';
                state.access_token = '';
                state.isErrored = false;
                state.performAuth = false;
            })
            .addCase(performLogin.rejected, (state:AccountState, action) => {
                state.isLogged = false;
                state.loading = false;
                state.refresh_token = '';
                state.access_token = '';
                state.isErrored = true;
                state.errors = action.payload;
                state.performAuth = false;
                removeUserToken();
            })


        /*********************************/

        // Add the performUpdateToken extraReducers here

            .addCase(performUpdateToken.fulfilled, (state:AccountState, action:PayloadAction<{}>) => {
                    state.access_token = action.payload.access;
                    setAccessToken(action.payload.access);
                    state.userData!.username = jwtDecode(action.payload.access)['name']
            })
            .addCase(performUpdateToken.rejected, (state:AccountState, action) => {
                console.log(action)
                state.isLogged = false;
                state.loading = false;
                state.refresh_token = '';
                state.access_token = '';
                state.isErrored = true;
                state.errors = action.payload;
                removeUserToken();
            })


            /*********************************/

            // Add the performRegister extraReducers here
            .addCase(performRegister.pending, (state:AccountState, action) => {
                state.registerSuccess = false;
                state.isRegisterErrored = false;
                state.registerErrors = {};
                state.registerLoading = true;
            })
            .addCase(performRegister.fulfilled, (state:AccountState, action:PayloadAction<{}>) => {
                state.registerSuccess = true;
                state.isRegisterErrored = false;
                state.registerErrors = {};
                state.registerLoading = false;
            })
            .addCase(performRegister.rejected, (state:AccountState, action) => {
                state.registerSuccess = false;
                state.isRegisterErrored = true;
                state.registerErrors = action.payload;
                state.registerLoading = false;
            })

        ///////////////////////////// updateProfileImage /////////////////////

        // Add the performChangeImage extraReducers here
            .addCase(performChangeImage.pending, (state:AccountState, action) => {
                state.changeImageLoading = true;
                state.changeImageSuccess = false;
            })
            .addCase(performChangeImage.fulfilled, (state:AccountState, action:PayloadAction<{}>) => {
                state.changeImageLoading = false;
                state.changeImageSuccess = true;
                state.userData.profile_image = action.payload.profile_image;
            })
            .addCase(performChangeImage.rejected, (state:AccountState, action) => {
                if(action.payload.code == "token_not_valid") {
                    state.isLogged = false;
                    state.errors = action.payload.messages
                }
                state.changeImageLoading = false;
                state.changeImageSuccess = false;
            })

        ///////////////////////////////////////////////////////////

            .addCase(getLoggedUserData.fulfilled, (state:AccountState, action:PayloadAction<{}>) => {
                state.userData = action.payload;
            })
            .addCase(getLoggedUserData.rejected, (state:AccountState, action) => {
                state.isLogged = false;
                state.errors = action.payload;
            })

        //////////////////////////////////////////////////////////////

            .addCase(performChangePassword.fulfilled, (state:AccountState, action:PayloadAction<{}>) => {
                state.changePasswordErrored = false;
                state.changePasswordLoading = false;
                state.changePasswordSuccess = true;
            })
            .addCase(performChangePassword.rejected, (state:AccountState, action) => {
                state.changePasswordErrored = true;
                state.errors = action.payload;
                state.changePasswordLoading = false;
            })
            .addCase(performChangePassword.pending, (state:AccountState, action) => {
                state.changePasswordErrored = false;
                state.changePasswordLoading = true;
                state.changePasswordSuccess = false;
            })
    }


});
export const {setLoggedInState, performLogout, resetRegisterState,resetChangeImageState} = AccountSlice.actions;

export default AccountSlice.reducer;
