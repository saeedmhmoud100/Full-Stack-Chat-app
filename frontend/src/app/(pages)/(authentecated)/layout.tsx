"use client";

import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {InfoNotification} from "@/hooks/Notification";


export default function Layout({children}) {
    const { isLogged, performAuth} = useSelector(state => state.account)
    const [hasHydrated, setHasHydrated] = useState(false);
    const [redirect, setRedirect] = useState(false)
    const router = useRouter()
    useEffect(() => {
        setHasHydrated(true);
    }, []);



    useEffect(() => {
        if (!isLogged && hasHydrated) {
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


    if (!hasHydrated) {
        return null;
    }


    return (
        <div className="w-full h-full">
            {children}
        </div>
    )
}