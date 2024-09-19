import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
export interface NotificationsState {
    all_notifications: any[];
}

// Define the initial state using that type
const initialState: NotificationsState = {
    all_notifications: [],
};



export const NotificationsSlice = createSlice({
    name: 'notifications',

    initialState,
    reducers: {
        message: (state, action: PayloadAction<any>) => {
            const {type,data} = JSON.parse(action.payload);
            switch (type) {
                case "all_notifications":
                    state.all_notifications = data;
                    break;
            }
        },

    },
    extraReducers: (builder) => {


    }


});
export const {} = NotificationsSlice.actions;

export default NotificationsSlice.reducer;
