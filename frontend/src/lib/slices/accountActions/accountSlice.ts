import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {removeUserToken, setUserToken} from "@/hooks/localStorage";
import {performLogin} from "@/lib/slices/accountActions/accountActions";

// Define a type for the slice state
export interface AccountState {
    refresh_token: string;
    access_token: string;
    isLogged: boolean;
    loading: boolean;
    isErrored: boolean;
    errors?: any;
}

// Define the initial state using that type
const initialState: AccountState = {
    refresh_token: '',
    access_token: '',
    isLogged: false,
    loading: false,
    isErrored: false,
};



export const AccountSlice = createSlice({
    name: 'account',

    initialState,
    reducers: {
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refresh_token = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.access_token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(performLogin.fulfilled, (state:AccountState, action:PayloadAction<{}>) => {
                console.log(action.payload);
                if(action.payload){
                    setUserToken(action.payload)
                    state.isLogged = true;
                    state.loading = false;
                    state.refresh_token = action.payload.refresh;
                    state.access_token = action.payload.access;
                    state.isErrored = false;
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
    },
});
export const {setRefreshToken, setAccessToken} = AccountSlice.actions;

export default AccountSlice.reducer;
