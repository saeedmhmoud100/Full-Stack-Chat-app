import { configureStore } from '@reduxjs/toolkit'
import {publicChatSlice} from "./slices/publicChatSlice";
import {AccountSlice} from "@/lib/slices/accountActions/accountSlice";
import {UserSlice} from "@/lib/slices/usersStore/userSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            'public_chat': publicChatSlice.reducer,
            'account': AccountSlice.reducer,
            'user': UserSlice.reducer,
        },
        devTools: true
})}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']