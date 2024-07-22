import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {removeUserToken, setAccessToken, setUserToken} from "@/hooks/localStorage";
import {performLogin, performRegister, performUpdateToken} from "@/lib/slices/accountActions/accountActions";
import {isErrored} from "stream";
import {jwtDecode} from "jwt-decode";

// Define a type for the slice state
export interface AccountState {
    refresh_token: string;
    access_token: string;
    isLogged: boolean;
    loading: boolean;
    isErrored: boolean;
    errors?: any;
    userData?: {
        username?: string;
        email?: string;
    };
    isRegisterErrored?: boolean;
    registerErrors?: any;
    registerSuccess?: boolean;
    registerLoading?: boolean;
}

// Define the initial state using that type
const initialState: AccountState = {

    // login
    refresh_token: '',
    access_token: '',
    isLogged: false,
    loading: false,
    isErrored: false,
    userData: {},

    // register
    isRegisterErrored: false,
    registerErrors: {},
    registerSuccess: false,
    registerLoading: false,
};



export const AccountSlice = createSlice({
    name: 'account',

    initialState,
    reducers: {
        setLoggedInState: (state, action: PayloadAction<{refresh:string,access:string}>) => {
            state.refresh_token = action.payload.refresh;
            state.access_token = action.payload.access;
            state.isLogged = true;
            state.userData = jwtDecode(action.payload.access);
        },
        performLogout: (state) => {
            state.refresh_token = '';
            state.access_token = '';
            state.isLogged = false;
            state.isLoading = false;
            state.isErrored = false;
            state.errors = {};
            state.userData = {};

            removeUserToken();
        }
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
                    state.userData = jwtDecode(action.payload.access);
                }
            })
            .addCase(performLogin.pending, (state:AccountState, action) => {
                state.loading = true;
                state.isLogged = false;
                state.refresh_token = '';
                state.access_token = '';
                state.isErrored = false;
            })
            .addCase(performLogin.rejected, (state:AccountState, action) => {
                state.isLogged = false;
                state.loading = false;
                state.refresh_token = '';
                state.access_token = '';
                state.isErrored = true;
                state.errors = action.payload;
                removeUserToken();
            })


        /*********************************/

        // Add the performUpdateToken extraReducers here

            .addCase(performUpdateToken.fulfilled, (state:AccountState, action:PayloadAction<{}>) => {

                if(action.payload){
                    state.access_token = action.payload.access;
                    setAccessToken(action.payload.access);
                }
            })
            .addCase(performUpdateToken.rejected, (state:AccountState, action) => {
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
    }


});
export const {setLoggedInState, performLogout} = AccountSlice.actions;

export default AccountSlice.reducer;
