import ChatBox from "@/app/_components/ChatBox";
import SideBarBox from "@/app/_components/SideBarBox";


export default function Groups() {

    return (
        <div>
            <div className="w-full flex"  style={{height:"calc(100vh - 50px)"}}>
                <SideBarBox width={"w-1/4"} type={'group'}/>
                <ChatBox width={"w-full"}  text={"Group Name"} type={'group'}/>
            </div>
        </div>
    )


}