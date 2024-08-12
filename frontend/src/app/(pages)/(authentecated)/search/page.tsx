"use client";

import Link from "next/link";
import {useSelector} from "react-redux";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {Button} from "@mui/material";

export default function SearchPage() {
    const {usersSearch} = useSelector(state => state.user)


    return (
        <div className="user-data w-full bg-white p-4 my-4 rounded-xl shadow flex flex-wrap">
            <h2 className="text-4xl text-start font-bold border-b-gray-500 w-full"> Users </h2>

            {
                usersSearch?.map((user) => {
                    return (
                        <div key={user.id} className='md:w-[49%] w-full h-24 px-4 flex items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md'>
                            <Link href={`/users/${user.id}`} className="w-full h-24 flex gap-3 my-3 items-center ">
                                <div  style={{height: "60px", width: "60px"}} className={`inline  ${user.is_online ? 'img-online-on' : 'img-online-off'}`}>
                                    <img src={user.profile_image} style={{height: "60px", width: "60px"}} className={'rounded-3xl'}/>
                                </div>
                                <h4>{user.username}</h4>
                            </Link>
                            <div className='border border-gray-400 px-4 py-2 rounded-md'>
                                {user.is_friend ? <Button size='large' sx={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color:"black",
                                    display: "flex",
                                    alignItems: "center",
                                }}>
                                    <span className='mt-[3px]'>Friends</span>
                                    <CheckIcon color='success' fontSize='medium' className='mx-2' style={{border:"3px solid #2e7d32",borderRadius:"50%"}}/>
                                </Button> :

                                    <Button size='large' sx={{
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                        color:"black",
                                        display: "flex",
                                        alignItems: "center",
                                        width:"max-content",
                                    }}>
                                        <span className='mt-[3px]'>Not Friends</span>
                                        <ClearIcon color='error' fontSize='medium' className='mx-2' style={{border:"3px solid #d32f2f",borderRadius:"50%"}}/>
                                    </Button>
                                }
                            </div>

                        </div>
                    )
                })
            }


        </div>
    )
}