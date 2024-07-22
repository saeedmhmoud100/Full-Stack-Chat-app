"use client"

import {Button, TextField} from "@mui/material";
import LoginHook from "@/hooks/login/Login-Hook";
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Login(){

    const {loading,LoginFormRef} = LoginHook();


    return (
        <div className="w-full pt-28 h-full">
            <form ref={LoginFormRef} className="w-3/4 flex flex-col gap-4 shadow-2xl rounded-2xl text-center p-8 bg-white m-auto">
                <h2 className="text-2xl mb-12">Login</h2>
                <TextField id="outlined-basic" label="Username or Email" variant="outlined" name='username'/>
                <TextField id="outlined-basic2" label="Password" variant="outlined" name='password' type='password'/>

                <LoadingButton
                    size="small"
                    color="secondary"
                    loading={loading}
                    loadingPosition="center"
                    variant="contained"
                    type='submit'
                ><span className='py-2' >Login</span></LoadingButton>

            </form>
        </div>
    )
}