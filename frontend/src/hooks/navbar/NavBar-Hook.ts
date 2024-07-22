import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUserToken} from "@/hooks/localStorage";
import {setLoggedInState} from "@/lib/slices/accountActions/accountSlice";


export default function NavBarHook () {
    const {isLogged} = useSelector((state) => state.account);
    const dispatch = useDispatch();
    useEffect(() => {
        const token = getUserToken();
        if(token && !isLogged){
            dispatch(setLoggedInState(token))
        }


    }, []);




    return [isLogged];
}