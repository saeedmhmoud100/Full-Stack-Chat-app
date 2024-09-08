import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createGroup} from "@/lib/slices/groupsStore/groupsActions";

// Define a type for the slice state
export interface GroupsState {

    all_groups?: any,
    create_loading: boolean,
    create_success?: boolean,
    errors?: any,
    current_group_id?: number | null
}

// Define the initial state using that type
const initialState: GroupsState = {
    create_loading: false,
    create_success: false,
    all_groups: [],
    current_group_id: null
};


export const GroupsSlice = createSlice({
    name: 'groups',

    initialState,
    reducers: {
        setCreateSuccess: (state: GroupsState, action: PayloadAction<boolean>) => {
            state.create_success = action.payload;
        },
        setCurrentGroupId: (state: GroupsState, action: PayloadAction<number>) => {
            state.current_group_id = action.payload;
        },

        message: (state: GroupsState, action: PayloadAction<any>) => {
            const {type, data} = JSON.parse(action.payload);
            switch (type) {
                case 'all_groups':
                    state.all_groups = data;
                    break;
                case 'new_message':
                    const group = state.all_groups.find(group => group.id == data.group_id);
                    if (group) {
                        group.messages.push(data);
                        state.all_groups = [group, ...state.all_groups.filter(group => group.id !== data.group_id)]
                    }
                    break;
                case 'unread_messages_count':
                    state.all_groups = state.all_groups.map(group => {
                        return group.id == data.group_id ? {...group, unread_messages_count: data.count} : group
                    })
                    break;
                case 'new_group':
                    console.log(data)
                    state.all_groups = [data, ...state.all_groups]
            }
        },
        send: (state: GroupsState, action: PayloadAction<any>) => {
            const {type, data} = action.payload;
            switch (type) {
                case 'make_all_message_is_read':
                    state.all_groups = state.all_groups.map(group => {
                        return group.id == data.group_id ? {...group, unread_messages_count: 0} : group
                    })
                    break;
            }
        },
    },
    extraReducers: (builder) => {

        builder
            .addCase(createGroup.fulfilled, (state: GroupsState, action) => {
                state.create_loading = false;
                state.create_success = true;
                state.all_groups.unshift(action.payload.group_data);
            })
            .addCase(createGroup.pending, (state: GroupsState) => {
                state.create_loading = true;
            })
            .addCase(createGroup.rejected, (state: GroupsState, action) => {
                state.create_loading = false;
                state.errors = action.error.message;
            });
    }


});
export const {setCreateSuccess, setCurrentGroupId} = GroupsSlice.actions;

export default GroupsSlice.reducer;