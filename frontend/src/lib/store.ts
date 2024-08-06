import {configureStore} from '@reduxjs/toolkit'
import {AccountSlice} from "@/lib/slices/accountActions/accountSlice";
import {UserSlice} from "@/lib/slices/usersStore/userSlice";
import websocketMiddleware from "@/lib/webSockeMiddleware";
import {publicChatSlice} from "@/lib/slices/publicChatStore/publicChatSlice";
import {PrivateChatsSlice} from "@/lib/slices/privateChatsStore/privateChatsSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            'public_chat': publicChatSlice.reducer,
            'account': AccountSlice.reducer,
            'user': UserSlice.reducer,
            'private_chats': PrivateChatsSlice.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(websocketMiddleware),
        devTools: true,
})}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']