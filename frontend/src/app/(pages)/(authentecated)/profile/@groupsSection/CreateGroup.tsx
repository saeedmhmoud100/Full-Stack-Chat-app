




export default function CreateGroup(){


    return (
        <form className="mt-4">
            <input type="text" placeholder="Group Name" className="w-full p-2 border-2 border-gray-300 rounded-md"/>
            <textarea placeholder="Group Description" className="w-full p-2 border-2 border-gray-300 rounded-md my-2"/>
          <h3 className='my-3 w-max border-b-2 border-black'>Add to group:</h3>
            <div className="h-[300px] border border-gray-500 overflow-y-auto mb-3">
                <div className='items'>
                    <div className="item m-3 py-2 border-b border-black flex items-center">
                        <input className='mx-2' type="checkbox" name="user" id='user' />
                        <label htmlFor="user">User</label>
                    </div>
                    <div className="item m-3 py-2 border-b border-black flex items-center">
                        <input className='mx-2' type="checkbox" name="user" id='user' />
                        <label htmlFor="user">User</label>
                    </div>
                    <div className="item m-3 py-2 border-b border-black flex items-center">
                        <input className='mx-2' type="checkbox" name="user" id='user' />
                        <label htmlFor="user">User</label>
                    </div>
                    <div className="item m-3 py-2 border-b border-black flex items-center">
                        <input className='mx-2' type="checkbox" name="user" id='user' />
                        <label htmlFor="user">User</label>
                    </div>
                    <div className="item m-3 py-2 border-b border-black flex items-center">
                        <input className='mx-2' type="checkbox" name="user" id='user' />
                        <label htmlFor="user">User</label>
                    </div>
                    <div className="item m-3 py-2 border-b border-black flex items-center">
                        <input className='mx-2' type="checkbox" name="user" id='user' />
                        <label htmlFor="user">User</label>
                    </div>
                    <div className="item m-3 py-2 border-b border-black flex items-center">
                        <input className='mx-2' type="checkbox" name="user" id='user' />
                        <label htmlFor="user">User</label>
                    </div>
                    <div className="item m-3 py-2 border-b border-black flex items-center">
                        <input className='mx-2' type="checkbox" name="user" id='user' />
                        <label htmlFor="user">User</label>
                    </div>
                    <div className="item m-3 py-2 border-b border-black flex items-center">
                        <input className='mx-2' type="checkbox" name="user" id='user' />
                        <label htmlFor="user">User</label>
                    </div>
                    <div className="item m-3 py-2 border-b border-black flex items-center">
                        <input className='mx-2' type="checkbox" name="user" id='user' />
                        <label htmlFor="user">User</label>
                    </div>
                    <div className="item m-3 py-2 border-b border-black flex items-center">
                        <input className='mx-2' type="checkbox" name="user" id='user' />
                        <label htmlFor="user">User</label>
                    </div>
                    <div className="item m-3 py-2 border-b border-black flex items-center">
                        <input className='mx-2' type="checkbox" name="user" id='user' />
                        <label htmlFor="user">User</label>
                    </div>
                    <div className="item m-3 py-2 border-b border-black flex items-center">
                        <input className='mx-2' type="checkbox" name="user" id='user' />
                        <label htmlFor="user">User</label>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Create</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
            </div>
        </form>
    )
}