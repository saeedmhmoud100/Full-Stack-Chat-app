

export default function ChatNav({type, text}) {
    return (
        <>{
            type == 'public' ?
            <div className="rounded-full w-full m-auto py-4 flex bg-gray-800 flex-col pt-3 text-white border-b border-gray-800 text-center">
                <span className="text-green-500">{text}</span>
            </div>
                : null
        }</>
    )
}