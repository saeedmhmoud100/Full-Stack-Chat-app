'use client'

import FriendRequestsYouSentSection from "@/app/(pages)/(authentecated)/profile/@friendRequestsYouSentSection/page";

export default function Profile({children,userDataSection,
                                    changePasswordSection,
                                    getAllFriendsSection,
                                    friendRequestsSection,
                                    friendRequestsYouSentSection}){

    return (
        <div className="w-full h-full mt-4 flex flex-wrap gap-3">
            <h1 className="text-4xl text-center font-bold border border-b-gray-500 border-b-4 w-full text-start"> Profile </h1>
            <div className="user-data w-full bg-white p-4 my-4 rounded-xl shadow">
                {userDataSection}
            </div>
            <div className="change-password md:w-[49%] w-full ">
                {changePasswordSection}
            </div>
            <div className="all-friends md:w-[49%] w-full my-3 md:my-0  rounded-xl overflow-y-hidden">
                {getAllFriendsSection}
            </div>
            <div className="change-password md:w-[49%] w-full  rounded-xl overflow-hidden">
            {friendRequestsSection}
            </div>
            <div className="change-password md:w-[49%] w-full rounded-xl overflow-hidden">
            {friendRequestsYouSentSection}
            </div>
        </div>

    )
}