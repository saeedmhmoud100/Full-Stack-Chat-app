import ChatBox from "@/app/_components/public_chat/ChatBox";
import PublicChatNav from "@/app/_components/public_chat/publicChatNav";


export default function PublicChatPage() {
    return (
        <div className=" border-t-4 w-full flex justify-center flex-col w-full " style={{height:"calc(100vh - 50px)"}}>
            <PublicChatNav/>
            <ChatBox/>
        </div>
    )
}