import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import Post from "@/hooks/serverActions/methods/Post";
import {setUserToken} from "@/hooks/localStorage";

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


const performLogin = createAsyncThunk('account/performLogin',
    async (credentials: { email: string, password: string }) => {
        const response = await Post('/accounts/api/login/', credentials).then((response) => {
            return response;
        }).catch((error) => {
            throw error;
        });

        return response;
    });


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
            .addCase(performLogin.fulfilled, (state, action) => {
                if(action.payload){
                    setUserToken(action.payload)
                    state.isLogged = true;
                    state.loading = false;
                    state.refresh_token = action.payload.refresh;
                    state.access_token = action.payload.access;
                    state.isErrored = false;
                }
            })
            .addCase(performLogin.rejected, (state, action) => {
                state.isLogged = false;
                state.loading = false;
                console.log(action)
            })
            .addCase(performLogin.pending, (state, action) => {
                state.loading = true;
                state.isLogged = false;
                console.log(action)
            });
    },
});
export const {setRefreshToken, setAccessToken} = AccountSlice.actions;

export default AccountSlice.reducer;

export {performLogin};