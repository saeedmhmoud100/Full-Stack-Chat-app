"use client";

import Link from "next/link";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMutualFriends} from "@/lib/slices/usersStore/userActions";
import {useParams} from "next/navigation";


export default function MutualFriendsSection(){
    const dispatch = useDispatch();
    const {mutual_friends} = useSelector((state) => state.user);
    const {id} = useParams();
    useEffect(() => {
        dispatch(getMutualFriends({id}))
    }, [])


    return (
        <>
            <h2 className="text-4xl w-full text-start font-bold border-b-gray-500"> Mutual Friends ({mutual_friends.length || 0})</h2>
            <div className='friends-list bg-white p-4 flex flex-col md:flex-row flex-wrap h-[355px] overflow-y-auto'>

                {
                    mutual_friends?.length === 0 ? <h3>No mutual friends</h3> :

                    mutual_friends?.map((friend) => (

                        <div key={friend.id} className='flex w-full md:w-[49%] h-24 px-4 gap-3 items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md'>
                            <Link href={`/users/${friend.id}/`} className="w-full flex gap-3 my-3 items-center ">
                                <div  style={{height: "60px", width: "60px"}} className={`inline  ${friend.is_online ? 'img-online-on' : 'img-online-off'}`}>
                                    <img src={friend.profile_image} style={{height: "60px", width: "60px"}} className={'rounded-3xl'}/>
                                </div>
                                <h4>{friend.username}</h4>
                            </Link>
                        </div>
                        ))
                }


        </div>
        </>

        )
}