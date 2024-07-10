import ChatBox from "@/app/(pages)/public_chat/_components/ChatBox";
import PublicChatNav from "@/app/(pages)/public_chat/_components/publicChatNav";


export default function PublicChatPage() {
    return (
        <div className=" border-t-4 w-full flex justify-center flex-col w-full " style={{height:"calc(100vh - 50px)"}}>
            <PublicChatNav/>
            <ChatBox/>
        </div>
    )
}