import {useRouter} from "next/navigation";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ErrorNotification, ErrorNotifications, SuccessNotification} from "@/hooks/Notification";
import { performRegister} from "@/lib/slices/accountActions/accountActions";
import {resetRegisterState} from "@/lib/slices/accountActions/accountSlice";


export default function RegisterHook() {
    const RegisterFormRef = useRef(null);
    const dispatch = useDispatch();
    const {registerLoading,registerErrors, isRegisterErrored,registerSuccess, isLogged} = useSelector((state) => state.account);
    const router = useRouter();
    useEffect(() => {
        const handleSubmit = async (e) => {
            e.preventDefault();

            const username = RegisterFormRef.current.username.value;
            const email = RegisterFormRef.current.email.value;
            const password = RegisterFormRef.current.password.value;
            const confirmPassword = RegisterFormRef.current.confirmPassword.value;

            if (!password || !confirmPassword || !email || !username) {
                ErrorNotification('Please fill in all fields');
                return;
            }

            if (password !== confirmPassword) {
                ErrorNotification('Passwords do not match');
                return;
            }

            if (!registerLoading) {
                dispatch(performRegister({ username, email, password }));
            }
        };

        const form = RegisterFormRef.current;
        form.addEventListener('submit', handleSubmit);

        return () => {
            form.removeEventListener('submit', handleSubmit);
        };
    },[dispatch,registerLoading])


    useEffect(() => {
        if(isRegisterErrored){
            ErrorNotifications(registerErrors);
        }
    },[isRegisterErrored,registerErrors])


    useEffect(() => {
        if(registerSuccess){
            SuccessNotification('Registration successful');
            router.push('/login');
            dispatch(resetRegisterState())
        }
    },[registerSuccess,dispatch])


    return {registerLoading,RegisterFormRef}
}