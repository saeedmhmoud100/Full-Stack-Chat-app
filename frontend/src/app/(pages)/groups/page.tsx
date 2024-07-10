import ChatBox from "@/app/_components/ChatBox";
import GroupsBox from "@/app/_components/GroupsBox";


export default function Groups() {

    return (
        <div>
            <div className="w-full flex"  style={{height:"calc(100vh - 50px)"}}>
                <GroupsBox width={"w-1/4"}/>
                <ChatBox width={"w-full"}  text={"Group Name"}/>
            </div>
        </div>
    )


}