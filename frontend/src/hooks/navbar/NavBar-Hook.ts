import {useDispatch, useSelector} from "react-redux";
import {useEffect, useLayoutEffect} from "react";
import {getUserToken} from "@/hooks/localStorage";
import {setLoggedInState} from "@/lib/slices/accountActions/accountSlice";
import {performUpdateToken} from "@/lib/slices/accountActions/accountActions";
import {InfoNotification} from "@/hooks/Notification";


export default function NavBarHook () {
    const {isLogged,userData, refresh_token, isErrored} = useSelector((state) => state.account);
    const dispatch = useDispatch();




    useLayoutEffect(() => {
        const token = getUserToken();
        if(token && !isLogged){
            dispatch(setLoggedInState(token))
        }
    }, []);


    useEffect(() => {
        if(isLogged && refresh_token){
            const timeToRefresh = 1000 * 60 * 4;
            let interval = setInterval(() => {
                dispatch(performUpdateToken({refresh:refresh_token}))
            }, timeToRefresh)
            return () => clearInterval(interval);
        }
    }, [isLogged,refresh_token]);

    useEffect(() => {
        if(isErrored){
            InfoNotification('please login again')
        }
    }, [isErrored]);



    return {isLogged,userData};
}