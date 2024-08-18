'use client'
import Link from "next/link";
import {Button} from "@mui/material";
import defImg from '../../../../../assets/images/group_image.png'
import Modal from "@/app/_components/modal";
import CreateGroup from "@/app/(pages)/(authentecated)/profile/@groupsSection/CreateGroup";
import {useEffect, useState} from "react";
import {getUserGroups} from "@/lib/slices/groupsStore/groupsActions";
import {useDispatch, useSelector} from "react-redux";

export default function GroupsSection() {
    const [createGroup,setCreateGroup] = useState(false)
    const dispatch = useDispatch()
    const {all_groups} = useSelector((state:any)=> state.groups)

    useEffect(()=>{
        dispatch(getUserGroups())
    },[])

    return <div className='bg-white p-4  h-[355px] overflow-y-auto'>
        <h2 className="text-4xl text-center font-bold border-b-gray-500"> Groups </h2>
        <div className='text-center py-4'>
            <Button variant='contained' color='success' className='w-full my-2' onClick={_=>setCreateGroup(true)}>Create New Group</Button>
        </div>



        {
            all_groups?.map((group:any, index:number)=>(
                <div key={group.id}
                     className='w-full  px-4 flex items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md'>
                    <Link href={`/groups/${group.id}/`}
                          className="w-full h-20 flex gap-3 my-3 items-center rounded-e-none px-3">
                        <div style={{height: "60px", width: "60px"}}>
                            <img src={group.image} style={{height: "60px", width: "60px"}} className={'rounded-3xl'}/>
                        </div>
                        <h4>{group.name}</h4>
                    </Link>
                </div>
            ))
        }

        <Modal open={createGroup} onClose={_=> setCreateGroup(false)} title={'Create new group'}>
            <CreateGroup performClose={_=> setCreateGroup(false)}/>
        </Modal>
    </div>
}