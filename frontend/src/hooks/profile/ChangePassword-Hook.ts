import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {SuccessNotification, WarningNotification} from "@/hooks/Notification";
import {performChangePassword, performUpdateToken} from "@/lib/slices/accountActions/accountActions";


export default function ChangePasswordHook () {
    const dispatch = useDispatch();
    const {changePasswordLoading, changePasswordSuccess,refresh_token} = useSelector((state: any) => state.account);
    const formRef = useRef(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if(!data.old_password || !data.new_password || !data.confirm_new_password){
            WarningNotification('All fields are required');
            return
        }else if(data.new_password !== data.confirm_new_password){
            WarningNotification('New password and confirm new password do not match');
            return;
        }else{
            delete data.confirm_new_password;
            await dispatch(performChangePassword(data));
        }
    }

    useEffect(() => {
        if(changePasswordSuccess){
            SuccessNotification('Password changed successfully');
            dispatch(performUpdateToken({refresh:refresh_token}));
            formRef.current.reset();
        }
    }, [changePasswordSuccess])


    return {formRef, handleSubmit, changePasswordLoading}
}