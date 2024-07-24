"use client"

import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import RegisterHook from "@/hooks/register/Register-Hook";


export default function Register(){
    const {registerLoading,RegisterFormRef} = RegisterHook();
    return (
        <div className="w-full pt-28 h-full">
            <form method="POST" ref={RegisterFormRef} className="w-3/4 flex flex-col gap-4 shadow-2xl rounded-2xl text-center p-8 bg-white m-auto">
                <h2 className="text-2xl mb-12">Sign Up</h2>
                <TextField id="outlined-basic" label="Username" variant="outlined" name='username'/>
                <TextField id="outlined-basic2" label="Email" variant="outlined" name='email'/>
                <TextField id="outlined-basic3" label="Password" variant="outlined" name='password' type='password'/>
                <TextField id="outlined-basic4" label="Confirm Password" variant="outlined" name='confirmPassword' type='password'/>

                <LoadingButton
                    size="small"
                    color="primary"
                    loading={registerLoading}
                    loadingPosition="center"
                    variant="contained"
                    type='submit'
                ><span className='py-2' >Sign Up</span></LoadingButton>

            </form>
        </div>
    )
}