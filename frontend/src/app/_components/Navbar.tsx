import Link from "next/link";


export default function Navbar() {
    return (
        <div className="w-full bg-gray-800 h-12 flex justify-between items-center text-white">
            <div className="text-2xl pl-4">Chat</div>
            <div className="flex justify-between">
                <Link href={'public_chat'}><div className="px-4">public Chat</div></Link>
                <div className="px-4">About</div>
                <div className="px-4">Contact</div>
            </div>
        </div>
    )
}