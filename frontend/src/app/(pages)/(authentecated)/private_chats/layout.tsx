"use client"
import {useSelector} from "react-redux";

export default function Layout({children,ChatBox,SideBarBox}) {
    const {private_chat:{in_chat}} = useSelector(state => state.private_chats)

    return (
        <div>
            <div className="w-full flex"  style={{height:"calc(100vh - 50px)"}}>

                {SideBarBox}
                {
                    in_chat &&
                    ChatBox
                }
            </div>
        </div>
    )

}