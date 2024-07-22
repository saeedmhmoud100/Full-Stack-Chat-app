import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {performLogin} from "@/lib/slices/accountSlice";


export default function LoginHook() {
    const router = useRouter();
    const LoginFormRef = useRef(null);
    const dispatch = useDispatch();
    const {loading , isLogged} = useSelector((state) => state.account);



    useEffect(() => {
        LoginFormRef.current.addEventListener('submit', async (e) => {
            e.preventDefault();
            dispatch(performLogin({"email":LoginFormRef.current.username.value,"password":LoginFormRef.current.password.value}));
        });
    }, [dispatch]);

    useEffect(() => {
        if(isLogged){
            router.push('/');
        }
    }, [isLogged]);


    return {loading,LoginFormRef}
}