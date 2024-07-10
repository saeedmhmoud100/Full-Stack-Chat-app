

export default function ChatBox() {
    return (
        <div className="h-full w-full m-auto flex bg-gray-300 flex-col pt-3">
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
                <input type="text" className="w-8/12 h-12 border border-l-2" placeholder="Type a message..."/>
                <button className="w-4/12 h-12 bg-blue-500 ">Send</button>
            </div>



        </div>
    )
}