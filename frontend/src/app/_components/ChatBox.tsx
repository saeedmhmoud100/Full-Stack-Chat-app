import SideBarBox from "@/app/_components/SideBarBox";
import ChatNav from "@/app/_components/ChatNav";

type ChatBoxProps = {
    width: string,
    text: string,
    type: 'group' | 'chat'| 'public'
}


export default function ChatBox({width,text,type}) {
    return (
        <div className={`h-full ${width || "w-full"} m-auto flex bg-gray-300 flex-col pt-3`}>
            <ChatNav text={type}/>
            <div className="messages overflow-auto" style={{height:"100%"}}>
                <div className="message flex justify-end  my-2">
                    <span className="px-12 py-4 bg-green-500 rounded-l-full border-e-2">
                        Hi
                    </span>
                </div>
                <div className="message flex justify-start my-2">

                    <span className="px-12 py-4 bg-white rounded-r-full border-s-2">
                        Hi
                    </span>
                </div>
            </div>



            <div className="form flex w-full" style={{height:"min-content"}}>
                <input type="text" className="w-full h-12 border border-l-2" placeholder="Type a message..."/>
                <button className="w-min h-12 bg-blue-500 px-16">Send</button>
            </div>



        </div>
    )
}