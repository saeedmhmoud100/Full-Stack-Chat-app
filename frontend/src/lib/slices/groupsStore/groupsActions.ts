import Post from "@/hooks/serverActions/methods/Post";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const createGroup = createAsyncThunk('groups/createGroup',
    async (credentials: FormData, { rejectWithValue }) => {
            const response = await Post(`/api/groups/create_group`, credentials,true)

            if(response.ok){
                return await response.json();
            }else {
                return rejectWithValue(await response.json());
            }
});
