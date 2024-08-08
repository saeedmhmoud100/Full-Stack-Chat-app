import {useDispatch} from "react-redux";
import {useEffect, useRef} from "react";
import {getAllPrivateChats} from "@/lib/slices/privateChatsStore/userActions";
import {useRouter} from "next/navigation";


export default function SidebarHook() {
    const router = useRouter()
    const ref = useRef(null);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllPrivateChats())
    },[])



    const handleShowSidebar = () => {
        const inp = ((ref.current as HTMLDivElement).parentElement?.firstElementChild.firstElementChild.firstElementChild.classList)
        inp.toggle('px-4')
        inp.toggle('border')
        inp.toggle('border-l-2')
        ref.current?.classList.toggle("show");
    }


    const handleClick = (room_id) => {
        router.push(`/private_chats/${room_id}/`)
    }

    return {handleClick,handleShowSidebar,ref}
}