import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ErrorNotifications} from "@/hooks/Notification";
import {performLogin} from "@/lib/slices/accountActions/accountActions";


export default function LoginHook() {
    const LoginFormRef = useRef(null);
    const dispatch = useDispatch();
    const {loading , isLogged,isErrored,errors} = useSelector((state) => state.account);



    useEffect(() => {
        LoginFormRef.current.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = LoginFormRef.current.username.value;
            const password = LoginFormRef.current.password.value;
            if(email && password){
                dispatch(performLogin({"email":email,"password":password}));
            }
        });
    }, [dispatch]);

    // useEffect(() => {
    //     if(isLogged){
    //         router.push('/profile');
    //     }
    // }, [isLogged]);

    useEffect(() => {
        if(isErrored){
            ErrorNotifications(errors);
        }
    }, [isErrored]);


    return {loading,LoginFormRef}
}