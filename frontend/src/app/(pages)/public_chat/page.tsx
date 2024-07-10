import ChatBox from "@/app/_components/ChatBox";
import ChatNav from "@/app/_components/ChatNav";


export default function PublicChatPage() {
    return (
        <div className=" border-t-4 w-full flex justify-center flex-col w-full " style={{height:"calc(100vh - 50px)"}}>
            <ChatBox text={"1 online"}/>
        </div>
    )
}