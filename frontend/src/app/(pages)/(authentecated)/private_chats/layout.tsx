"use client"

export default function Layout({ChatBox,SideBarBox}) {
    return (
        <div>
            <div className="w-full flex"  style={{height:"calc(100vh - 50px)"}}>

                {SideBarBox}
                {
                    // in_chat &&
                    ChatBox
                }
            </div>
        </div>
    )

}