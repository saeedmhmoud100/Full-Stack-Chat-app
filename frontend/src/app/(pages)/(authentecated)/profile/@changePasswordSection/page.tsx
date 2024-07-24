import {Button, TextField} from "@mui/material";


export default function ChangePasswordSection() {


    return (
        <div className="change-password pe-4 w-2/4">
            <div className="bg-white p-4 rounded-xl">
                <h2 className="text-4xl text-center font-bold border-b-gray-500"> Change Password </h2>
                <div className="flex flex-col gap-4 mt-4">
                    <TextField id="filled-basic1" label="Current password" variant="outlined" />
                    <TextField id="filled-basic2" label="New password" variant="outlined" />
                    <TextField id="filled-basic3" label="Confirm new password" variant="outlined" />
                    <Button variant="contained" color='primary' size="large"  href="#">
                        <span className='px-6 py-1 text-lg'>Change Password</span>
                    </Button>
                </div>
            </div>
        </div>
    )

}