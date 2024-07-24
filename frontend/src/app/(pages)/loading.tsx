



export default function Loading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl text-center">Loading...</h1>
                <div className="w-20 h-20 border-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
        </div>
    )
}