import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createGroup} from "@/lib/slices/groupsStore/groupsActions";
// Define a type for the slice state
export interface GroupsState {
    create_loading:boolean,
    create_success?: boolean,
    errors?: any
}

// Define the initial state using that type
const initialState: GroupsState = {
    create_loading:false,
    create_success: false,
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
            .addCase(createGroup.pending, (state:GroupsState, action) => {
                state.create_loading = true;
            })
            .addCase(createGroup.fulfilled, (state:GroupsState, action) => {
                state.create_loading = false;
                state.create_success = true;
            })
            .addCase(createGroup.rejected, (state:GroupsState, action) => {
                state.create_loading = false;
                state.errors = action.error;
            })
    }


});
export const {setCreateSuccess} = GroupsSlice.actions;

export default GroupsSlice.reducer;