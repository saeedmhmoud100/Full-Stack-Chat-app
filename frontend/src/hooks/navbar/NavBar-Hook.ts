import {useEffect, useState} from "react";
import Post from "@/hooks/serverActions/methods/Post";


export default function NavBarHook () {
    const [isLogged, setIsLogged] = useState<boolean>(false);



    // useEffect(() => {
    //     const x = async () => {
    //         await Post("http://127.0.0.1:8000/accounts/api/login/",localStorage.getItem("token"),{
    //             "email":"admin@gmail.com",
    //             "password":"123456"
    //         }).then(async data => {
    //             const response = await data
    //             // console.log(response)
    //             // console.log(await response.json())
    //         })
    //     }
    //
    //     x()
    // }, []);

    return [isLogged];
}