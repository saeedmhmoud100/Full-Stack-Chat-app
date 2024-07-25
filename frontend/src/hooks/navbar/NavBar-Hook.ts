import {useDispatch, useSelector} from "react-redux";
import {useEffect, useLayoutEffect} from "react";
import {getUserToken} from "@/hooks/localStorage";
import {setLoggedInState} from "@/lib/slices/accountActions/accountSlice";
import {getLoggedUserData, performUpdateToken} from "@/lib/slices/accountActions/accountActions";
import {ErrorNotifications, InfoNotification} from "@/hooks/Notification";


export default function NavBarHook () {
    const {isLogged,userData, refresh_token, isErrored, access_token, errors} = useSelector((state) => state.account);
    const dispatch = useDispatch();


    useLayoutEffect(() => {
        const token = getUserToken();
        if(token && !isLogged){
            dispatch(setLoggedInState(token))
        }
    }, []);

    useEffect(() => {
        if(isLogged && refresh_token){
            dispatch(getLoggedUserData())
            const timeToRefresh = 1000 * 60 * 4;
            let interval = setInterval(() => {
                dispatch(performUpdateToken({refresh:refresh_token}))
            }, timeToRefresh)
            return () => clearInterval(interval);
        }
    }, [isLogged,access_token,refresh_token]);

    useEffect(() => {
        if(isErrored){
            InfoNotification('please login again')
        }
    }, [isErrored]);


    useEffect(() => {
        if(errors){
            ErrorNotifications(errors)
        }
    }, [errors]);

    const handleIconClick = (e) => {
        e.target.nextElementSibling.classList.toggle('hidden')
    }
    return {isLogged,userData,handleIconClick};
}