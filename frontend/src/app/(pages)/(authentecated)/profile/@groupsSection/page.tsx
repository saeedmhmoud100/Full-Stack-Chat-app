'use client'
import Link from "next/link";
import {Button} from "@mui/material";
import defImg from '../../../../../assets/images/group_image.png'
import Modal from "@/app/_components/modal";
import CreateGroup from "@/app/(pages)/(authentecated)/profile/@groupsSection/CreateGroup";
import {useState} from "react";

export default function GroupsSection() {
    const [createGroup,setCreateGroup] = useState(false)


    return <div className='bg-white p-4  h-[355px] overflow-y-auto'>
        <h2 className="text-4xl text-center font-bold border-b-gray-500"> Groups </h2>
        <div className='text-center py-4'>
            <Button variant='contained' color='success' className='w-full my-2' onClick={_=>setCreateGroup(true)}>Create New Group</Button>
        </div>
        <div key={"friend.id"}
             className='w-full  px-4 flex items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md'>
            <Link href={`/users/${"friend.id"}/`}
                  className="w-full h-20 flex gap-3 my-3 items-center rounded-e-none px-3">
                <div style={{height: "60px", width: "60px"}}>
                    <img src={defImg.src} style={{height: "60px", width: "60px"}} className={'rounded-3xl'}/>
                </div>
                <h4>{"Group Name"}</h4>
            </Link>
        </div>
        <div key={"friend.id"}
             className='w-full  px-4 flex items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md'>
            <Link href={`/users/${"friend.id"}/`}
                  className="w-full h-20 flex gap-3 my-3 items-center rounded-e-none px-3">
                <div style={{height: "60px", width: "60px"}}>
                    <img src={defImg.src} style={{height: "60px", width: "60px"}} className={'rounded-3xl'}/>
                </div>
                <h4>{"Group Name"}</h4>
            </Link>
        </div>
        <div key={"friend.id"}
             className='w-full  px-4 flex items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md'>
            <Link href={`/users/${"friend.id"}/`}
                  className="w-full h-20 flex gap-3 my-3 items-center rounded-e-none px-3">
                <div style={{height: "60px", width: "60px"}}>
                    <img src={defImg.src} style={{height: "60px", width: "60px"}} className={'rounded-3xl'}/>
                </div>
                <h4>{"Group Name"}</h4>
            </Link>
        </div>
        <div key={"friend.id"}
             className='w-full  px-4 flex items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md'>
            <Link href={`/users/${"friend.id"}/`}
                  className="w-full h-20 flex gap-3 my-3 items-center rounded-e-none px-3">
                <div style={{height: "60px", width: "60px"}}>
                    <img src={defImg.src} style={{height: "60px", width: "60px"}} className={'rounded-3xl'}/>
                </div>
                <h4>{"Group Name"}</h4>
            </Link>
        </div>
        <div key={"friend.id"}
             className='w-full  px-4 flex items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md'>
            <Link href={`/users/${"friend.id"}/`}
                  className="w-full h-20 flex gap-3 my-3 items-center rounded-e-none px-3">
                <div style={{height: "60px", width: "60px"}}>
                    <img src={defImg.src} style={{height: "60px", width: "60px"}} className={'rounded-3xl'}/>
                </div>
                <h4>{"Group Name"}</h4>
            </Link>
        </div>
        <div key={"friend.id"}
             className='w-full  px-4 flex items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md'>
            <Link href={`/users/${"friend.id"}/`}
                  className="w-full h-20 flex gap-3 my-3 items-center rounded-e-none px-3">
                <div style={{height: "60px", width: "60px"}}>
                    <img src={defImg.src} style={{height: "60px", width: "60px"}} className={'rounded-3xl'}/>
                </div>
                <h4>{"Group Name"}</h4>
            </Link>
        </div>
        <div key={"friend.id"}
             className='w-full  px-4 flex items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md'>
            <Link href={`/users/${"friend.id"}/`}
                  className="w-full h-20 flex gap-3 my-3 items-center rounded-e-none px-3">
                <div style={{height: "60px", width: "60px"}}>
                    <img src={defImg.src} style={{height: "60px", width: "60px"}} className={'rounded-3xl'}/>
                </div>
                <h4>{"Group Name"}</h4>
            </Link>
        </div>

        <Modal open={createGroup} onClose={_=> setCreateGroup(false)} title={'Create new group'}>
            <CreateGroup/>
        </Modal>
    </div>
}