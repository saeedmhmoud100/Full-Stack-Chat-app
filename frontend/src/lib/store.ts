import { configureStore } from '@reduxjs/toolkit'
import {publicChatSlice} from "./slices/publicChatSlice";
import {AccountSlice} from "@/lib/slices/accountSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            'public_chat': publicChatSlice.reducer,
            'account': AccountSlice.reducer,
        },
        devTools: true
})}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']