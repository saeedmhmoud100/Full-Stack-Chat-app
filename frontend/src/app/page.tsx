"use client";

import {useEffect} from "react";
import Post from "@/hooks/serverActions/methods/Post";

export default function Home() {

  useEffect(() => {
    const x = async () => {
      await Post("http://127.0.0.1:8000/accounts/api/token/",{
        "email":"admin@gmail.com",
        "password":"123456"
      }).then(data => {
        console.log(data)
      })
    }

    x()
  }, []);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  );
}
