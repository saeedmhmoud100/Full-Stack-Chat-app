"use client";
import {LogoutHook} from "@/hooks/logout/Logout-Hook";
import {useLayoutEffect} from "react";


export default function LogoutPage() {
    const {logout} = LogoutHook();
    useLayoutEffect(() => {
        logout();
    } , [logout]);

    return (
        <></>
    )
}