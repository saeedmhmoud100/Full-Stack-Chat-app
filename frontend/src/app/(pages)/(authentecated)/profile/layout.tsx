
export default function Profile({children,userDataSection,changePasswordSection}){

    return (
        <div className="w-full h-full mt-4 flex flex-col justify-center">
            <h1 className="text-4xl text-center font-bold border border-b-gray-500 border-b-4 w-full text-start"> Profile </h1>
            <div className="user-data w-full bg-white p-4 my-4 rounded-xl shadow">
                {userDataSection}
            </div>
            <div className="change-password md:pe-4 pe-0 md:w-2/4 w-full">
                {changePasswordSection}
            </div>
        </div>

    )
}