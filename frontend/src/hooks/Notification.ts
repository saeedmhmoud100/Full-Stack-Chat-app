import {toast} from "react-toastify";

export const ErrorNotification = (e) => toast.error(e,{closeOnClick: true,closeButton:true});
export const ErrorNotifications = (data) => {
    console.log(data);
    Object.entries(data).forEach((e) => ErrorNotification(e[0]+': '+e[1].toString()));
};

export const SuccessNotification = (e) => toast.success(e,{closeOnClick: true,closeButton:true});

