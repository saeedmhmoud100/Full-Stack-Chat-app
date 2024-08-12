import {useDispatch, useSelector} from "react-redux";
import {useEffect, useLayoutEffect} from "react";
import {getUserToken} from "@/hooks/localStorage";
import {performLogout, setLoggedInState} from "@/lib/slices/accountActions/accountSlice";
import {getLoggedUserData, performUpdateToken} from "@/lib/slices/accountActions/accountActions";
import {ErrorNotifications, InfoNotification} from "@/hooks/Notification";
import {websocketConnect} from "@/lib/websocketActions";


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
        if(isLogged){
            dispatch(websocketConnect(
                `ws://localhost:8000/ws/account`,
                {
                    websocket: true,
                    onOpen: 'account/open',
                    onMessage: 'account/message',
                    onClose: 'account/close',
                    onError: 'account/error',
                    onSend: 'account/send',
                }
            ))
        }

    },[isLogged])


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
            if(errors.code === 'token_not_valid') {
                InfoNotification('please login again')
                dispatch(performLogout())

            }else{
                ErrorNotifications(errors)
            }
        }
    }, [errors]);

    const handleIconClick = (e) => {
        e.target.nextElementSibling.classList.toggle('hidden')
    }
    return {isLogged,userData,handleIconClick};
}