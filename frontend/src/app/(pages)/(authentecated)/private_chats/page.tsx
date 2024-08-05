import ChatBox from "@/app/_components/ChatBox";
import SideBarBox from "@/app/_components/SideBarBox";


export default function PrivateChats() {

    return (
        <div>
            <div className="w-full flex"  style={{height:"calc(100vh - 50px)"}}>
                <SideBarBox width={"w-1/4"} type={'chat'}/>
                <ChatBox width={"w-full"}  text={"chat Name"} type={'chat'}/>
            </div>
        </div>
    )


}