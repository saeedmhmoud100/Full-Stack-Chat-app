"use client";

import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ChangePasswordHook from "@/hooks/profile/ChangePassword-Hook";


export default function ChangePasswordSection() {
    const {formRef, handleSubmit, changePasswordLoading} = ChangePasswordHook()

    return (
            <div className="bg-white p-4 rounded-xl">
                <h2 className="text-4xl text-center font-bold border-b-gray-500"> Change Password </h2>
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                    <TextField type='password' name='old_password' id="filled-basic1" label="Current password" variant="outlined" />
                    <TextField type='password' name='new_password' id="filled-basic2" label="New password" variant="outlined" />
                    <TextField type='password' name='confirm_new_password' id="filled-basic3" label="Confirm new password" variant="outlined" />
                    <LoadingButton loading={changePasswordLoading} variant="contained" color='primary' size="large" type='submit'>
                        <span className='px-6 py-1 text-lg'>Change Password</span>
                    </LoadingButton>
                </form>
            </div>
    )

}