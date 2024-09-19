import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
export interface NotificationsState {
    all_notifications: any[];
    unseen_notifications_count: number;
}

// Define the initial state using that type
const initialState: NotificationsState = {
    all_notifications: [],
    unseen_notifications_count: 0
};



export const NotificationsSlice = createSlice({
    name: 'notifications',

    initialState,
    reducers: {
        message: (state, action: PayloadAction<any>) => {
            const {type,data} = JSON.parse(action.payload);
            switch (type) {
                case "all_notifications":
                    state.all_notifications = data.all_notifications;
                    state.unseen_notifications_count = data.unseen_notifications_count;
                    break;
                case "new_notification":
                    state.all_notifications.unshift(data);
                    state.unseen_notifications_count += 1;
                    break;
                case "delete_notification":
                    state.all_notifications = state.all_notifications.filter((notification) => notification.id !== data);
                    state.unseen_notifications_count -= 1;
                    break;
            }
        },
        makeNotificationSeen: (state,action) => {
            state.all_notifications = state.all_notifications.map((notification) => {
                if(notification.id === action.payload){
                    if (state.unseen_notifications_count > 0 && !notification.is_seen)
                       state.unseen_notifications_count -= 1;
                    notification.is_seen = true;
                }
                return notification;
            })

        }

    },

});
export const {makeNotificationSeen} = NotificationsSlice.actions;

export default NotificationsSlice.reducer;
