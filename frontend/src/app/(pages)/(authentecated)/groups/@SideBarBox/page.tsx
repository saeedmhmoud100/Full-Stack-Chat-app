"use client";
import {useDispatch, useSelector} from "react-redux";
import SidebarHook from "@/hooks/privateChat/Sidebar-Hook";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useRef} from "react";
import {websocketConnect} from "@/lib/websocketActions";


export default function GroupsSidebar() {
    const {all_groups} = useSelector((state: any) => state.groups)
    const dispatch = useDispatch()
    const {id} = useParams()
    const ref = useRef(null);
    const router = useRouter()
    useEffect(() => {
        dispatch(websocketConnect(`ws://localhost:8000/ws/groups`, {
            connectionId: 'all_groups',
            websocket: true,
            onOpen: 'groups/open',
            onMessage: 'groups/message',
            onClose: 'groups/close',
            onError: 'groups/error',
        }))
    }, [])

    const handleShowSidebar = () => {
        const inp = ((ref.current as HTMLDivElement).parentElement?.firstElementChild.firstElementChild.firstElementChild.classList)
        inp.toggle('px-4')
        inp.toggle('border')
        inp.toggle('border-l-2')
        ref.current?.classList.toggle("show");
    }

    const handleClick = (id: number) => {
        router.push(`/groups/${id}`)
    }

    return (
        <div className="relative px-2">

            <div ref={ref}
                 className={`sidebar overflow-x-auto h-full m-auto flex bg-gray-300 flex-col pt-3 border-r-4 border-gray-950 show`}>

                <div className="form flex w-11/12 px-3" style={{height: "min-content"}}>
                    <input type="text" className="w-full  h-12 px-4 rounded-full" placeholder="Search..."/>
                </div>

                <div className="w-full px-3" style={{height: "100%"}}>
                    {
                        all_groups?.map((item: any, index: number) => (
                            <div onClick={_=>handleClick(item.id)} key={item.id}
                                 className={` flex justify-start items-center w-full cursor-pointer my-4 hover:bg-gray-500 ${id == item.id && 'bg-gray-500'} transition rounded-xl rounded-s-full p-2`}>
                                <div className={`inline w-20 h-20`}>
                                    <img src={item.image} className={'w-20 h-20 rounded-full'}/>
                                </div>
                                <div className="pl-3">
                                    <h1 className="text-lg font-bold">{item.name}</h1>
                                </div>
                                {
                                    item.unread_messages_count ? <div
                                        className="unread-messages-count rounded-full bg-red-700 text-white p-2 ms-auto me-2">{item.unread_messages_count}</div> : null
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="after" onClick={handleShowSidebar}> {''} </div>
        </div>
    )
}