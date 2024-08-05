
export default function Layout({children,ChatBox,SideBarBox}) {
    return (
        <div>
            <div className="w-full flex"  style={{height:"calc(100vh - 50px)"}}>

                {SideBarBox}
                {ChatBox}
            </div>
        </div>
    )

}