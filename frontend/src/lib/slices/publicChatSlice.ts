import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface publicChatState {
    messages: string[]
}

// Define the initial state using that type
const initialState: publicChatState = {
    messages: ["hi 1", "hi 2", "hi 3"]
}

export const publicChatSlice = createSlice({
    name: 'public_chat',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<string>) => {
            state.messages.push(action.payload)
        },
        removeMessage: (state) => {
            state.messages.pop()
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    }
})

export const { addMessage, removeMessage } = publicChatSlice.actions

export default publicChatSlice.reducer