"use client";

import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {InfoNotification} from "@/hooks/Notification";
import {getUserToken} from "@/hooks/localStorage";


export default function Layout({children}:{ children: React.ReactNode }) {
    const { isLogged, performAuth} = useSelector(state => state.account)
    const [hasHydrated, setHasHydrated] = useState(false);
    const [redirect, setRedirect] = useState(false)
    const router = useRouter()
    useEffect(() => {
        setHasHydrated(true);
    }, []);



    useEffect(() => {
        if (!getUserToken() && hasHydrated && !isLogged) {
            setRedirect(true)
        }
    }, [isLogged,router,hasHydrated]);


    useEffect(() => {
        if (redirect) {
            if(!performAuth)
                InfoNotification("Please login to access this page")
            router.push("/login");
        }
    }, [redirect]);


    if (!hasHydrated || redirect) {
        return null;
    }


    return (
        <div className="w-full h-full">
            {children}
        </div>
    )
}