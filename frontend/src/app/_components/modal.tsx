




export default function Modal({children, title, onClose, open,className}) {


    const handleClick = (e) => {
        if(e.target.classList.contains("modal-bg"))
           onClose()
    }

    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 ${open ? "" : "hidden"} modal-bg `} onClick={handleClick}>
            <div className={"md:w-1/2 bg-white rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 "} style={{height:'max-content'}}>
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <button onClick={onClose} className="text-2xl font-bold">X</button>
                </div>
                <div className="mt-4">
                    {children}
                </div>
            </div>
        </div>
    )
}