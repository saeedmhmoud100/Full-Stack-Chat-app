"use client";

import defaultGroupImage from "../../assets/images/group_image.png";
import {useEffect, useRef} from "react";


export default function GroupsBox({width}) {
    const ref = useRef(null);

    useEffect(() => {
        console.log((ref.current as HTMLDivElement)?.after()); // Logs the DOM element
    }, []); // Empty dependency array ensures this runs after the initial render


    const handleShowSidebar = () => {
        const inp = ((ref.current as HTMLDivElement).parentElement?.firstElementChild.firstElementChild.firstElementChild.classList)
        inp.toggle('px-4')
        inp.toggle('border')
        inp.toggle('border-l-2')
        ref.current?.classList.toggle("show");
    }

    return (
        <div ref={ref} className={`sidebar h-full m-auto flex bg-gray-300 flex-col pt-3 border-r-4 border-gray-950`}>

            <div className="form flex w-full" style={{height: "min-content"}}>
                <input type="text" className="w-full  h-12  rounded-full" placeholder="Search..."/>
            </div>


            <div className="w-full overflow-y-auto px-3" style={{height: "100%"}}>
                <div className=" flex justify-start items-center w-full cursor-pointer my-4">
                    <img className="w-20 h-20" src={defaultGroupImage.src } />
                    <div className="pl-3">
                        <h1 className="text-lg font-bold">Group Name</h1>
                        <p className="text-sm">Group Description</p>
                    </div>
                </div>
            </div>

            <div className="after" onClick={handleShowSidebar}> {'>>'} </div>
        </div>
    )
}