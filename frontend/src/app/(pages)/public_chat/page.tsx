import ChatBox from "@/app/(pages)/public_chat/_components/ChatBox";
import PublicChatNav from "@/app/(pages)/public_chat/_components/publicChatNav";


export default function PublicChatPage() {
    return (
        <div className=" w-full flex justify-center flex-col " style={{height:"80vh",marginTop:"20vh"}}>
            <PublicChatNav/>
            <ChatBox/>
        </div>
    )
}