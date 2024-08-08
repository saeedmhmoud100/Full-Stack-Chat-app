"use client";
import {useDispatch, useSelector} from "react-redux";
import SidebarHook from "@/hooks/privateChat/Sidebar-Hook";


export default function PrivateChatSidebar(){
    const {all_chats} = useSelector(state => state.private_chats)
    const {handleClick,handleShowSidebar,ref} = SidebarHook();


    return(
        <div className="relative px-2">

            <div ref={ref} className={`sidebar overflow-x-hidden h-full m-auto flex bg-gray-300 flex-col pt-3 border-r-4 border-gray-950 show`}>

                <div className="form flex w-11/12 px-3" style={{height: "min-content"}}>
                    <input type="text" className="w-full  h-12 px-4 rounded-full" placeholder="Search..."/>
                </div>


                <div className="w-full overflow-y-auto px-3" style={{height: "100%"}} >
                    {all_chats.map(item =>
                        <div onClick={_=>handleClick(item.id)} key={item.id} className=" flex justify-start items-center w-full cursor-pointer my-4 hover:bg-gray-500 transition rounded-xl rounded-s-full p-2">
                            <img className="w-20 h-20 rounded-full" src={item.user.profile_image } />
                            <div className="pl-3">
                                <h1 className="text-lg font-bold">{item.user.username}</h1>
                            </div>
                        </div>
                    )}

                </div>

            </div>
            <div className="after" onClick={handleShowSidebar}> {''} </div>
        </div>
    )
}