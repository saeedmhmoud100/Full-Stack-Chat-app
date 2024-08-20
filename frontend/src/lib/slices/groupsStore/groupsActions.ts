import {createAsyncThunk} from "@reduxjs/toolkit";
import Get from "@/hooks/serverActions/methods/Get";
import Post from "@/hooks/serverActions/methods/Post";


export const createGroup = createAsyncThunk('groups/createGroup',
    async (credentials: { name: string,description:string, users:string[]}, { rejectWithValue }) => {
        const response = await Post(`/api/groups/create_group`, credentials)
        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});

export const getUserGroups = createAsyncThunk('groups/getUserGroups',
    async (credentials: {  }, { rejectWithValue }) => {
        const response = await Get(`/api/groups/get_user_groups`)
        if(response.ok){
            return await response.json();
        }else {
            return rejectWithValue(await response.json());
        }
});