import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createGroup, getUserGroups} from "@/lib/slices/groupsStore/groupsActions";
// Define a type for the slice state
export interface GroupsState {

    all_groups?: any,
    create_loading:boolean,
    create_success?: boolean,
    errors?: any
}

// Define the initial state using that type
const initialState: GroupsState = {
    create_loading:false,
    create_success: false,
    all_groups: []
};



export const GroupsSlice = createSlice({
    name: 'groups',

    initialState,
    reducers: {
        setCreateSuccess: (state:GroupsState, action: PayloadAction<boolean>) => {
            state.create_success = action.payload;
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(getUserGroups.fulfilled, (state:GroupsState, action) => {
                state.all_groups = action.payload.groups;

            })


            .addCase(createGroup.fulfilled, (state:GroupsState, action) => {
                state.create_loading = false;
                state.create_success = true;
                state.all_groups.unshift(action.payload.group_data)
            })
            .addCase(createGroup.pending, (state:GroupsState, action) => {
                state.create_loading = true;
            })
            .addCase(createGroup.rejected, (state:GroupsState, action) => {
                state.create_loading = false;
                state.errors = action.error;
            })
    }


});
export const {setCreateSuccess} = GroupsSlice.actions;

export default GroupsSlice.reducer;