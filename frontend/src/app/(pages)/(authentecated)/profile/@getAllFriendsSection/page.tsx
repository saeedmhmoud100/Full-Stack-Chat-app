import image from '../../../../../assets/images/default-profile-image.png'



export default function getAllFriendsSection(){


    return (
        <div className='friends-list bg-white p-4  h-[355px] overflow-y-auto'>
            <h2 className="text-4xl text-center font-bold border-b-gray-500"> Your Friends </h2>
            <div className="w-full h-24 px-4 flex gap-3 my-3 items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md">
                <img src={image.src} style={{height:"60px",width:"60px"}}  className='rounded-3xl'/>
                <h4>Mohamed</h4>
            </div>
            <div className="w-full h-24 px-4 flex gap-3 my-3 items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md">
                <img src={image.src} style={{height:"60px",width:"60px"}}  className='rounded-3xl'/>
                <h4>Mohamed</h4>
            </div>
            <div className="w-full h-24 px-4 flex gap-3 my-3 items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md">
                <img src={image.src} style={{height:"60px",width:"60px"}}  className='rounded-3xl'/>
                <h4>Mohamed</h4>
            </div>
            <div className="w-full h-24 px-4 flex gap-3 my-3 items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md">
                <img src={image.src} style={{height:"60px",width:"60px"}}  className='rounded-3xl'/>
                <h4>Mohamed</h4>
            </div>
            <div className="w-full h-24 px-4 flex gap-3 my-3 items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md">
                <img src={image.src} style={{height:"60px",width:"60px"}}  className='rounded-3xl'/>
                <h4>Mohamed</h4>
            </div>
            <div className="w-full h-24 px-4 flex gap-3 my-3 items-center hover:bg-gray-300 cursor-pointer transition delay-100 rounded-md">
                <img src={image.src} style={{height:"60px",width:"60px"}}  className='rounded-3xl'/>
                <h4>Mohamed</h4>
            </div>
        </div>
    )
}